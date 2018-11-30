import { Component, OnInit } from '@angular/core';
import { Computer } from './_models/computer';
import { ComputerService } from './services/computer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';

computers: Computer[];


  /**
   *
   */
  constructor(private computerService: ComputerService) {

  }

  ngOnInit() {

    this.computerService.getComputers()
    .subscribe((computers: Computer[]) => {
      this.computers = computers;
      console.log(computers);
    });

  }
}
