import { Component, OnInit } from '@angular/core';
import { Computer } from 'src/app/_models/computer';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.css']
})
export class ComputerListComponent implements OnInit {

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
