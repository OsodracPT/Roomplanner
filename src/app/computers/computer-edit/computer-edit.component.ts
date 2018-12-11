import { Component, OnInit, ViewChild } from '@angular/core';
import { Computer } from 'src/app/_models/computer';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, FormsModule, FormControl } from '@angular/forms';
import { GlobalVariable } from 'src/app/global';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComputerService } from 'src/app/services/computer.service';
import { Room } from 'src/app/_models/room';
import { AlertifyService } from 'src/app/services/alertify.service';


@Component({
  selector: 'app-computer-edit',
  templateUrl: './computer-edit.component.html',
  styleUrls: ['./computer-edit.component.css']
})
export class ComputerEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;

  form: FormGroup;
  computer: Computer;

  rooms: Room[];
  public pavillionList = GlobalVariable.PAVILLIONS;


  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private computerService: ComputerService, private alertify: AlertifyService) {
    this.form = fb.group({
      description: new FormControl(),
      location: new FormControl()
    });
  }

  ngOnInit() {
    // Get the computer data from the route resolver
    this.route.data.subscribe(data => {
      this.computer = data.computer[0];

      this.form.patchValue(this.computer);
    });

    // Get the list of rooms
    this.computerService.getRooms()
    .subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      console.log(rooms);
    }, error => {
      this.alertify.error(error);
    });
}



updateComputer() {
console.log(this.computer.id);
this.computer.description = this.form.value.description;
this.computer.roomId = this.form.value.location;
const roomValues = this.rooms.find( i => i.id === this.form.value.location);
this.computer.roomName = roomValues.name;

console.log(this.computer);


this.computerService.updateComputer(this.computer.id, this.computer)
    .subscribe(next => {
      this.alertify.success('Computer updated successfully.');
      this.form.reset(this.computer);
    }, error => {
      this.alertify.error(error);
      });
}

}
