import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from '../global';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public pavUrl = GlobalVariable.PAVSHORT;
  public pavillionList = GlobalVariable.PAVILLIONS;
  public tempPavList = ['Pavillion B', 'Pavillion C', 'Pavillion D', 'Pavillion E', 'Pavillion H'];
  public tempPavShort = ['pavb', 'pavc','pavd','pave', 'pavh'];


  navbarOpen = false;

  constructor() { }

  ngOnInit() {
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
