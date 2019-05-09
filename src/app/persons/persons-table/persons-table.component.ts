import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ComputerService } from 'src/app/services/computer.service';
import { Person } from 'src/app/_models/person';



@Component({
  selector: 'app-persons-table',
  templateUrl: './persons-table.component.html',
  styleUrls: ['./persons-table.component.css']
})
export class PersonsTableComponent implements OnInit, OnChanges {

  @Input() floor_id: string;
  @Input() pav_letter: string;

  rows: any[];
  cols: any[];

  persons: any[];
  
  constructor(private computerService: ComputerService) { }

  // This method gets called whenever the parent component changes the values on the input properties
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    this.loadTable();
    
  }

  ngOnInit() {

    this.loadTable();

    this.cols = [
      { field: 'forenames', header: 'Forenames' },
      { field: 'surname', header: 'Surname' },
      { field: 'crsid', header: 'CRSid' },
      { field: 'room_number', header: 'Room number' },
      { field: 'start_date', header: 'Start date' },
      { field: 'end_date', header: 'End date' }  ];

  }

customSort(event) {
  // console.log('SortEvent=', event);
  event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) {
              result = -1;
      } else if (value1 != null && value2 == null) {
                  result = 1;
              } else if (value1 == null && value2 == null) {
                          result = 0;
                      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
                              if ((event.field === 'start_date') || (event.field === 'end_date') ) {
                                  const x = value1.split('/');
                                  const y = value2.split('/');
                                  value1 = x[2] + x[1] + x[0];
                                  value2 = y[2] + y[1] + y[0];
                              }
                              result = value1.localeCompare(value2);
                      }  else { result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0; }
      return (event.order * result);
  });
}

// This method is responsible for converting the fragments number that comes from the tabs into the specific floor.
processFloorId(floor_id: string) {
if(floor_id == "0" || floor_id =="L")
{
  this.floor_id = "L";
}
else
{
  let num = Number(floor_id) - 1;
  this.floor_id = num.toString();
}
}

loadTable(){

  this.processFloorId(this.floor_id);

  this.computerService.getPavPersons(this.pav_letter)
  .subscribe((persons: any[]) => {
    for (const person of persons) {
      //check if start date is null
    if(!person.start_date)
    {
      person.start_date = 'unknown date';
    }
    if(!person.end_date)
    {
      person.end_date = 'indefinite end';
    }
    }
    var temp_prefix = this.pav_letter + this.floor_id + ".";
    //console.log(temp_prefix);
    //console.log(persons);
    this.persons = persons.filter(person =>

      person.room_prefix === this.pav_letter + this.floor_id + ".");
    // this.persons = persons;
    this.rows = this.persons;
  });

}

}
