import { Component, OnInit } from '@angular/core';
import { ComputerService } from 'src/app/services/computer.service';
import { Computer } from 'src/app/_models/computer';
import { Room } from 'src/app/_models/room';

@Component({
  selector: 'app-pavillion-detail',
  templateUrl: './pavillion-detail.component.html',
  styleUrls: ['./pavillion-detail.component.css']
})
export class PavillionDetailComponent implements OnInit {

  computers: Computer[];
  rooms: Room[];

  constructor(private computerService: ComputerService) { }

  ngOnInit() {

    this.computerService.getPavComputers('C')
    .subscribe((computers: Computer[]) => {
      this.computers = computers;
      console.log(computers);
    });

    this.computerService.getPavRooms('C')
    .subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      console.log(rooms);
    });
  }

}
