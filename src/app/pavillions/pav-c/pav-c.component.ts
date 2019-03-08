import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Computer } from 'src/app/_models/computer';
import { Room } from 'src/app/_models/room';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-pav-c',
  templateUrl: './pav-c.component.html',
  styleUrls: ['./pav-c.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PavCComponent implements OnInit {

  computers: Computer[];
  rooms: Room[];

  constructor(private computerService: ComputerService) { }

  ngOnInit() {

    this.computerService.getPavRooms('C')
    .subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      console.log(rooms);
    });
  }
  }

