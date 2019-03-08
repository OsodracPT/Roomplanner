import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/_models/room';
import { Computer } from 'src/app/_models/computer';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/services/computer.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Person } from 'src/app/_models/person';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  room: Room;
  form: FormGroup;

  computers: Computer[];
  persons: Person[];


  constructor(private route: ActivatedRoute,
    private computerService: ComputerService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.CreateForm();

        // Get the computer data from the route resolver
        this.route.data.subscribe(data => {
          this.room = this.route.snapshot.data['room'][0];
          console.log(this.room);
          console.log(this.route.snapshot.data['room']);
          console.log(this.route.snapshot.data['computers']);
          this.computers = this.route.snapshot.data['computers'];
          this.persons = this.route.snapshot.data['persons'];

          this.form.patchValue(this.room);
        });
  }

  private CreateForm() {
    this.form = new FormGroup({
      notes: new FormControl(''),
      maxCapacity: new FormControl('', Validators.required)
    });
  }

  updateRoom() {
    console.log(this.room.room_id);
    this.room.notes = this.form.value.notes;
    this.room.max_capacity = this.form.value.maxCapacity;

    console.log(this.room);


    this.computerService.updateRoom(this.room.room_id, this.room)
        .subscribe(next => {
          this.alertify.success('Room updated successfully.');
          this.form.reset(this.room);
        }, error => {
          this.alertify.error(error);
          });

    }

}
