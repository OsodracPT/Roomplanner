import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/_models/room';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  @Input() room: Room;

  constructor() { }

  ngOnInit() {
  }

}
