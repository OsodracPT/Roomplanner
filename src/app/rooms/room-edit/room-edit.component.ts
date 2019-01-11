import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/_models/room';
import { Computer } from 'src/app/_models/computer';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/services/computer.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  room: Room;

  computers: Computer[];

  constructor(private route: ActivatedRoute,
    private computerService: ComputerService, private alertify: AlertifyService) { }

  ngOnInit() {
        // Get the computer data from the route resolver
        this.route.data.subscribe(data => {
          this.room = data.room[0];
          console.log(this.room);
          console.log(this.route.snapshot.data['room']);
          console.log(this.route.snapshot.data['computer']);
          console.log(this.route.data);
        });
  }

}
