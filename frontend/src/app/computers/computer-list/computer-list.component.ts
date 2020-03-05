import { Component, OnInit } from "@angular/core";
import { Computer } from "src/app/_models/computer";
import { ComputerService } from "src/app/services/computer.service";
import { AlertifyService } from "src/app/services/alertify.service";

@Component({
  selector: "app-computer-list",
  templateUrl: "./computer-list.component.html",
  styleUrls: ["./computer-list.component.css"]
})
export class ComputerListComponent implements OnInit {
  computers: Computer[];
  showSpinner: boolean = true;

  constructor(
    private computerService: ComputerService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.computerService.getComputers().subscribe(
      (computers: Computer[]) => {
        this.computers = computers;
        this.showSpinner = false;

        console.log(computers);
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
