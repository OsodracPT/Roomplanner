import { Component, OnInit } from '@angular/core';
import { Computer } from './_models/computer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Room Planner';

computers: Computer[];

  /**
   *
   */
  constructor() {

  }

  ngOnInit() {

  }
}
