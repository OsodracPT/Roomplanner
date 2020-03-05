import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/_models/room';
import { Computer } from 'src/app/_models/computer';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/services/computer.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Person } from 'src/app/_models/person';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router} from '@angular/router';


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
    private computerService: ComputerService, private alertify: AlertifyService,
    private router: Router
    ) { }

  ngOnInit() {
    this.CreateForm();
        // Get the computer data from the route resolver
        this.route.data.subscribe(data => {

          if (data['room'][0]) {
            this.room = data['room'][0];
            console.log(data);
            console.log(data['room']);
            // console.log(data['computers']);
            this.computers = data['computers'];
            this.persons = data['persons'];
            this.form.patchValue(this.room);
          } else {
            this.alertify.error('Problem retrieving data. Room was not found');
            this.router.navigate(['/']);
          }
        },
        error => {
console.log(error);
this.alertify.error('Problem retrieving data. Room was not found');
        });
  }

  private CreateForm() {
    this.form = new FormGroup({
      notes: new FormControl(''),
      max_capacity: new FormControl('')
    });
  }

  updateRoom() {
    console.log(this.room);
    this.room.notes = this.form.value.notes;
    this.room.max_capacity = this.form.value.max_capacity;

    console.log(this.room);


    this.computerService.updateRoom(this.room.id, this.room)
        .subscribe(next => {
          this.alertify.success('Room updated successfully.');
          this.form.reset(this.room);
        }, error => {
          this.alertify.error(error);
          });

    }

}
