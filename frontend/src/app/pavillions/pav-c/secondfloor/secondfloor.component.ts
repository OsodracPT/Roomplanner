import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/_models/room';

@Component({
  selector: 'app-secondfloor',
  templateUrl: './secondfloor.component.html',
  styleUrls: ['./secondfloor.component.css']
})
export class SecondfloorComponent implements OnInit {
  @Input() rooms: Room[];
  @Input() pav_letter: string;

  constructor() { }

  ngOnInit() {

  }

  getNumberOfComputer(roomNumber: string){
    //Preventing the method from executing before ngOnInit
    if(this.rooms)
    {
      roomNumber = this.pav_letter + roomNumber;
      var room = this.rooms.find(x => x.room_number == roomNumber);
      // console.log(numberOfComputers.number_of_computers);
      return room.number_of_computers;
    }
  }

  getNumberOfPeople(roomNumber: string){
    //Preventing the method from executing before ngOnInit
    if(this.rooms)
    {
      roomNumber = this.pav_letter + roomNumber;
      var room = this.rooms.find(x => x.room_number == roomNumber);
      // console.log(numberOfComputers.number_of_computers);
      return room.number_of_people;
    }
  }
}
