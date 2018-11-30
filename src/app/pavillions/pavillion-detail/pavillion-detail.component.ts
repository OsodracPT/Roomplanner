import { Component, OnInit } from '@angular/core';
import { ComputerService } from 'src/app/services/computer.service';
import { Computer } from 'src/app/_models/computer';

@Component({
  selector: 'app-pavillion-detail',
  templateUrl: './pavillion-detail.component.html',
  styleUrls: ['./pavillion-detail.component.css']
})
export class PavillionDetailComponent implements OnInit {

  computers: Computer[];

  constructor(private computerService: ComputerService) { }

  ngOnInit() {

    this.computerService.getComputers()
    .subscribe((computers: Computer[]) => {
      this.computers = computers;
      console.log(computers);
    });
  }

}
