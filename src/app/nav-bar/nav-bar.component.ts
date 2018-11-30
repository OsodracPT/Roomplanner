import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../global';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public pavillionList = GlobalVariable.PAVILLIONS;

  navbarOpen = false;

  constructor() { }

  ngOnInit() {
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
