import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/_models/room';

@Component({
  selector: 'app-firstfloor',
  templateUrl: './firstfloor.component.html',
  styleUrls: ['./firstfloor.component.css']
})
export class FirstfloorComponent implements OnInit {
  @Input() rooms: Room[];

  constructor() { }

  ngOnInit() {

  }

  getNumberOfComputer(roomNumber: string){
    //Preventing the method from executing before ngOnInit
    if(this.rooms)
    {
      var room = this.rooms.find(x => x.room_number == roomNumber);
      // console.log(numberOfComputers.number_of_computers);
      return room.number_of_computers;
    }
  }

  getNumberOfPeople(roomNumber: string){
    //Preventing the method from executing before ngOnInit
    if(this.rooms)
    {
      var room = this.rooms.find(x => x.room_number == roomNumber);
      // console.log(numberOfComputers.number_of_computers);
      return room.number_of_people;
    }
  }
}
