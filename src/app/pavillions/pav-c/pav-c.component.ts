import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Computer } from 'src/app/_models/computer';
import { Room } from 'src/app/_models/room';
import { ComputerService } from 'src/app/services/computer.service';
import {Router, ActivatedRoute} from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import {TabsetComponent} from 'ngx-bootstrap';
import { TabDirective } from 'ngx-bootstrap/tabs';


@Component({
  selector: 'app-pav-c',
  templateUrl: './pav-c.component.html',
  styleUrls: ['./pav-c.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class PavCComponent implements OnInit {

  @ViewChild('pavillionTabs') pavillionTabs: TabsetComponent;
  computers: Computer[];
  rooms: Room[];
  pav_letter: string;
  constructor(private computerService: ComputerService,  private router: Router, 
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {

    // Get fragment from the url and select the tab accordingly
    this.route.fragment.subscribe(
      (fragment) => { 
        if(+fragment < 4 && +fragment > 0){
          this.pavillionTabs.tabs[fragment].active = true;
        }
      }
    );

    // Get the pavillion letter from the URL
    this.pav_letter = this.router.url.substr(4, 1).toUpperCase();

    this.computerService.getPavRooms(this.pav_letter)
    .subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      console.log(rooms);
    }, error => {
      this.alertify.error("Error retrieving data from the API: " + error.message );
    });
  }

  getNumberOfComputer(roomNumber: string){
    //Preventing the method from executing before ngOnInit
    if(this.rooms)
    {
      var numberOfComputers = this.rooms.find(x => x.room_number == roomNumber);
      // console.log(numberOfComputers.number_of_computers);
      return numberOfComputers.number_of_computers;
    }
  }

  // Addding a fragment to the URL when the user changes tabs
  onSelect(data: TabDirective): void {
  this.router.navigate( ['.'], { relativeTo: this.route, fragment: data.id});
  }
  }

