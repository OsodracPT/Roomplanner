import { Component, OnInit } from '@angular/core';
import { Computer } from 'src/app/_models/computer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-computer-edit',
  templateUrl: './computer-edit.component.html',
  styleUrls: ['./computer-edit.component.css']
})
export class ComputerEditComponent implements OnInit {

  computer: Computer;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.computer = data.computer[0];
    });
}

}
