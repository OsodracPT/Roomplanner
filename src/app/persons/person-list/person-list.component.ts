import { Component, OnInit } from '@angular/core';
import { ComputerService } from 'src/app/services/computer.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Person } from 'src/app/_models/person';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  persons: Person[];


  constructor(private computerService: ComputerService, private spinner: NgxSpinnerService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.spinner.show();

    this.computerService.getPersons()
    .subscribe((persons: Person[]) => {
      this.persons = persons;
      console.log(persons);
      this.spinner.hide();
    }, error => {
      this.alertify.error(error);
    });
  }

}
