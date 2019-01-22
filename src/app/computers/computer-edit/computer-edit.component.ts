import { Component, OnInit, HostListener } from '@angular/core';
import { Computer } from 'src/app/_models/computer';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalVariable } from 'src/app/global';
import { ComputerService } from 'src/app/services/computer.service';
import { Room } from 'src/app/_models/room';
import { AlertifyService } from 'src/app/services/alertify.service';


@Component({
  selector: 'app-computer-edit',
  templateUrl: './computer-edit.component.html',
  styleUrls: ['./computer-edit.component.css']
})
export class ComputerEditComponent implements OnInit {

  form: FormGroup;
  computer: Computer;

  rooms: Room[];
  public pavillionList = GlobalVariable.PAVILLIONS;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.returnValue = true;
    }
  }


  constructor(private route: ActivatedRoute,
    private computerService: ComputerService, private alertify: AlertifyService) {
  }

  ngOnInit() {

    this.CreateForm();

    // Get the computer data from the route resolver
    this.route.data.subscribe(data => {
      this.computer = data.computer[0];

      this.form.patchValue(this.computer);
      this.form.get('roomName').setValue(this.computer.roomId);
    });

    // Get the list of rooms
    this.computerService.getLocations()
    .subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      console.log(rooms);
    }, error => {
      this.alertify.error(error);
    });


}

private CreateForm() {
  this.form = new FormGroup({
    description: new FormControl(''),
    roomName: new FormControl('', Validators.required)
  });
}


updateComputer() {
console.log(this.computer.id);
this.computer.description = this.form.value.description;
this.computer.roomId = this.form.value.roomName;
const roomValues = this.rooms.find( i => i.id === this.form.value.roomName);
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
