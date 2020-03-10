import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { Computer } from "src/app/_models/computer";
import { Room } from "src/app/_models/room";
import { ComputerService } from "src/app/services/computer.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertifyService } from "src/app/services/alertify.service";
import { TabsetComponent } from "ngx-bootstrap";
import { TabDirective } from "ngx-bootstrap/tabs";

@Component({
  selector: "app-pav-general",
  templateUrl: "./pav-general.component.html",
  styleUrls: ["./pav-general.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class PavGeneralComponent implements OnInit {
  @ViewChild("pavillionTabs") pavillionTabs: TabsetComponent;
  computers: Computer[];
  rooms: Room[];
  pav_letter: string;
  floor_id: number;

  constructor(
    private computerService: ComputerService,
    private router: Router,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //Get fragment from the url and select the tab accordingly
    this.route.fragment.subscribe(fragment => {
      var tempFragment = Number(fragment);
      this.floor_id = tempFragment;
      if (tempFragment < 4 && tempFragment > 0 && this.pavillionTabs.tabs) {
        this.pavillionTabs.tabs[tempFragment].active = true;
      }
    });

    // Get the pavillion letter from the URL
    this.pav_letter = this.router.url.substr(4, 1).toUpperCase();

    this.computerService.getPavRooms(this.pav_letter).subscribe(
      (rooms: Room[]) => {
        this.rooms = rooms;
        console.log(rooms);
      },
      error => {
        this.alertify.error(
          "Error retrieving data from the API: " + error.message
        );
      }
    );
  }

  // Addding a fragment to the URL when the user changes tabs
  onSelect(data: TabDirective): void {
    //prevents the method from running if the tab are still loading
    if (data.id) {
      this.router.navigate(["."], {
        relativeTo: this.route,
        fragment: data.id
      });
    }
  }
}
