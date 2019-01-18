import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/_models/person';
import { Room } from 'src/app/_models/room';
import { GlobalVariable } from 'src/app/global';
import { Computer } from 'src/app/_models/computer';
import { ActivatedRoute } from '@angular/router';
import { ComputerService } from 'src/app/services/computer.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  form: FormGroup;
  person: Person;


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
          this.person = this.route.snapshot.data['person'][0];
          console.log(this.person);

          this.form.patchValue(this.person);
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
    location: new FormControl('', Validators.required)
  });
}

}
