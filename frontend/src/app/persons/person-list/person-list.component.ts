import { Component, OnInit } from "@angular/core";
import { ComputerService } from "src/app/services/computer.service";
import { AlertifyService } from "src/app/services/alertify.service";
import { Person } from "src/app/_models/person";

@Component({
  selector: "app-person-list",
  templateUrl: "./person-list.component.html",
  styleUrls: ["./person-list.component.css"]
})
export class PersonListComponent implements OnInit {
  persons: Person[];
  showSpinner: boolean = true;

  constructor(
    private computerService: ComputerService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.computerService.getPersons().subscribe(
      (persons: Person[]) => {
        this.persons = persons;
        console.log(persons);
        this.showSpinner = false;
      },
      error => {
        this.showSpinner = false;
        this.alertify.error(
          "Error retrieving data from the API: " + error.message
        );
      }
    );
  }
}
