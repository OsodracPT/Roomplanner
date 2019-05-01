import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Computer } from 'src/app/_models/computer';
import { Room } from 'src/app/_models/room';
import { ComputerService } from 'src/app/services/computer.service';
import {Router} from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';



@Component({
  selector: 'app-pav-c',
  templateUrl: './pav-c.component.html',
  styleUrls: ['./pav-c.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PavCComponent implements OnInit {

  computers: Computer[];
  rooms: Room[];
  pav_letter: string;
  constructor(private computerService: ComputerService,  private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {

    this.pav_letter = this.router.url.substr(4, 1).toUpperCase();

    this.computerService.getPavRooms(this.pav_letter)
    .subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      console.log(rooms);
    }, error => {
      this.alertify.error("Error retrieving data from the API: " + error.message );
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

