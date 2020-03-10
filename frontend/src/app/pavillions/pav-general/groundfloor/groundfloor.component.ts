import { Component, OnInit, Input } from "@angular/core";
import { Room } from "src/app/_models/room";

@Component({
  selector: "app-groundfloor",
  templateUrl: "./groundfloor.component.html",
  styleUrls: ["./groundfloor.component.css"]
})
export class GroundfloorComponent implements OnInit {
  @Input() rooms: Room[];
  @Input() pav_letter: string;

  constructor() {}

  ngOnInit() {}

  getNumberOfComputer(roomNumber: string) {
    //Preventing the method from executing before ngOnInit
    if (this.rooms) {
      roomNumber = this.pav_letter + roomNumber;
      var room = this.rooms.find(x => x.room_number == roomNumber);
      // console.log(numberOfComputers.number_of_computers);
      return typeof room !== "undefined" ? room.number_of_computers : 0;
    }
  }

  getNumberOfPeople(roomNumber: string) {
    //Preventing the method from executing before ngOnInit
    if (this.rooms) {
      roomNumber = this.pav_letter + roomNumber;
      var room = this.rooms.find(x => x.room_number == roomNumber);
      // console.log(numberOfComputers.number_of_computers);
      return typeof room !== "undefined" ? room.number_of_people : 0;
    }
  }
}
