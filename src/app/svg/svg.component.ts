import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComputerService } from '../services/computer.service';


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
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SvgComponent implements OnInit {
  alertify: any;
  room_numbers: string[];
  number_of_days: number;
  data: RoomAlloc[];
  occupant: Occupant;
  segment: Segment;

  constructor(private computerService: ComputerService) { }

  ngOnInit() {

    this.computerService.getDays()
    .subscribe((data: number) => {
      this.number_of_days = data;
      console.log(this.number_of_days);
    });

    this.computerService.getSegments()
    .subscribe((data: RoomAlloc[]) => {
      this.room_numbers = [];
      this.data = data;

      for (const entry of this.data) {
        console.log(entry.room_number); // 1, "string", false

        for (const segment of entry.segments) {
          console.log(segment); // 1, "string", false
      }
    }

    //   for (const key in this.data) {
    //     // do something with "key" and "value" variables
    //     if (this.data.hasOwnProperty(key)) {

    //       // key would be the room number ex:'E0.01'
    //       const segments = this.data[key];
    //       this.room_numbers.push(key);
    //       console.log(segments.room_name);
    //       console.log(key);
    //       // tslint:disable-next-line:forin
    //       for (const segment_key in segments) {
    //         this.segment = segments[segment_key];
    //         console.log(this.segment);
    //         // tslint:disable-next-line:forin
    //         for (let i = 0; i < this.segment.occupants.length; i++) {
    //           this.occupant = this.segment.occupants[i];
    //           console.log(this.occupant); // use i instead of 0
    //       }
    //   }

    // }
    //   }
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

