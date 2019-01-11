import { Component, OnInit } from '@angular/core';
import { Computer } from './_models/computer';

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
  constructor() {

  }

  ngOnInit() {

  }
}
