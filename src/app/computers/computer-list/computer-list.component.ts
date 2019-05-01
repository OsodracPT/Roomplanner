import { Component, OnInit } from '@angular/core';
import { Computer } from 'src/app/_models/computer';
import { ComputerService } from 'src/app/services/computer.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.css']
})
export class ComputerListComponent implements OnInit {

  computers: Computer[];

  constructor(private computerService: ComputerService,
    private alertify: AlertifyService, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.spinner.show();

    this.computerService.getComputers()
    .subscribe((computers: Computer[]) => {

      this.computers = computers;

      this.spinner.hide();

      console.log(computers);
    }, error => {
      this.spinner.hide();
      this.alertify.error("Error retrieving data from the API: " + error.message );
    });

}
}
