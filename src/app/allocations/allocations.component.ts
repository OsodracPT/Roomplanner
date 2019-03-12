import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComputerService } from '../services/computer.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import {Router} from '@angular/router';



export interface Occupant {
  crsid: string;
  end_date: string;
  end_days: number;
  forenames: string;
  room_number: string;
  start_date: string;
  start_days: number;
  surname: string;
  title: string;
}

export interface Segment {
  end: number;
  start: number;
  occupants: Occupant[];
}

export interface RoomAlloc {
room_number: string;
segments: Segment[];
}

@Component({
  selector: 'app-allocations',
  templateUrl: './allocations.component.html',
  styleUrls: ['./allocations.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllocationsComponent implements OnInit {
  alertify: any;
  public bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  room_numbers: string[];
  pav_letter: string;
  number_of_days: number;
  data: RoomAlloc[];
  occupant: Occupant;
  segment: Segment;
  time_interval: Date[];
  interval_start: string;
  interval_end: string;
  tooltip_content: string[];
  number_of_computers: { [key: string]: number; } = {};


  constructor(private computerService: ComputerService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit() {

  this.pav_letter = this.router.url.substr(4, 1).toUpperCase();
}

  onValueChange(value: Date[]): void {
    this.interval_start = this.datePipe.transform(value[0], 'yyyy-MM-dd');
    this.interval_end = this.datePipe.transform(value[1], 'yyyy-MM-dd');

    // console.log(this.interval_start);
    // console.log(this.interval_end);

    this.getAlloc(this.pav_letter, this.interval_start, this.interval_end);
  }

  getTooltipData(segment: Segment) {
    let output: string;
    let start_date: string;
    let end_date: string;

    segment.occupants.forEach((occupant, index) => {
            // console.log(occupant);
            start_date = this.transformDate(occupant.start_date);
            end_date = this.transformDate(occupant.end_date);

            if (index === 0) {
              output = occupant.title + ' ' + occupant.forenames + ' ' + occupant.surname
                + ' from' + ' ' + start_date + ' to' + ' ' + end_date;
            } else {
              output = output + '\n' + occupant.title + ' ' + occupant.forenames + ' ' + occupant.surname
              + ' from' + ' ' + start_date + ' to' + ' ' + end_date;
            }
    });

    if (output == null) {
    return 'Room Empty.';
    }
    return output;
  }

  transformDate(date: string) {
    let return_value: string;
    try {
      return_value = this.datePipe.transform(date, 'dd-MM-yyyy');
      return(return_value);
    } catch (error) {
      return date;
    }
  }

  getAlloc(pav: string, start_date: string, end_date: string) {
    this.computerService.getDays(pav, start_date, end_date)
    .subscribe((data: number) => {
      this.number_of_days = data;
    });

    this.computerService.getSegments(pav, start_date, end_date)
    .subscribe((data: RoomAlloc[]) => {
      this.room_numbers = [];
      this.data = data;

      for (const entry of this.data) {
        // console.log(entry.room_number);
        this.computerService.getNumberOfComputers(entry.room_number)
        .subscribe((response: any) => {
          this.number_of_computers[entry.room_number] = response[0].number_of_computers;
        });

        for (const segment of entry.segments) {
          // console.log(segment); // 1, "string", false
          for (const occupant of segment.occupants) {
            // console.log(occupant);
          }
      }
    }
    }, error => {
      this.alertify.error(error);
    });

  }

  getClass(value: Segment) {
    switch (value.occupants.length) {
      case 0: return '';
      case 1: return 'progress-bar';
      case 2: return 'progress-bar bg-success';
      case 3: return 'progress-bar bg-warning';
      case 4: return 'progress-bar bg-danger';
      case 5: return 'class-b';
    }
  }

}

