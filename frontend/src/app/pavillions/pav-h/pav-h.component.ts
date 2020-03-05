import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Computer } from 'src/app/_models/computer';
import { Room } from 'src/app/_models/room';
import { ComputerService } from 'src/app/services/computer.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-pav-h',
  templateUrl: './pav-h.component.html',
  styleUrls: ['./pav-h.component.css']
})
export class PavHComponent implements OnInit {
  computers: Computer[];
  rooms: Room[];
  pav_letter: string;
  constructor(private computerService: ComputerService,  private router: Router) { }

  ngOnInit() {

    this.pav_letter = this.router.url.substr(4, 1).toUpperCase();
    console.log(this.pav_letter);
    this.computerService.getPavRooms('H')
    .subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      console.log(rooms);
    });
  }

  getNumberOfComputer(roomNumber: string){
    //Preventing the method from executing before ngOnInit
    if(this.rooms)
    {
      var numberOfComputers = this.rooms.find(x => x.room_number == roomNumber);
      // console.log(numberOfComputers.number_of_computers);
      return numberOfComputers.number_of_computers;
    }
  }
  }