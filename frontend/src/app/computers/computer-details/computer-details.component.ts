import { Component, OnInit, Input } from '@angular/core';
import { Computer } from 'src/app/_models/computer';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-computer-details',
  templateUrl: './computer-details.component.html',
  styleUrls: ['./computer-details.component.css']
})
export class ComputerDetailsComponent implements OnInit {
  @Input() computer: Computer;

  constructor(private computerService: ComputerService) { }

  ngOnInit() {
  }

}
