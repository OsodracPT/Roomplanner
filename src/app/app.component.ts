import { Component, OnInit } from '@angular/core';
import { Computer } from './_models/computer';
import { Title }     from '@angular/platform-browser';

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
  constructor(private titleService: Title) {

  }

  ngOnInit() {
    this.titleService.setTitle( this.title );
  }
}
