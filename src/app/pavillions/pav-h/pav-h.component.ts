import { Component, OnInit } from '@angular/core';
import { Computer } from 'src/app/_models/computer';
import { Room } from 'src/app/_models/room';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-pav-h',
  templateUrl: './pav-h.component.html',
  styleUrls: ['./pav-h.component.css']
})
export class PavHComponent implements OnInit {

  computers: Computer[];
  rooms: Room[];

  constructor(private computerService: ComputerService) { }

  ngOnInit() {

    this.computerService.getPavH()
    .subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      console.log(rooms);
    });
  }
}
