import { Routes } from "@angular/router";
import { ComputerListComponent } from "./computers/computer-list/computer-list.component";
import { HomeComponent } from "./home/home.component";
import { PavillionDetailComponent } from "./pavillions/pavillion-detail/pavillion-detail.component";
import { ComputerEditComponent } from "./computers/computer-edit/computer-edit.component";
import { ComputerDetailResolver } from "./_resolvers/computer-detail.resolver";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { PavGeneralComponent } from "./pavillions/pav-general/pav-general.component";
import { RoomEditComponent } from "./rooms/room-edit/room-edit.component";
import { RoomDetailResolver } from "./_resolvers/room-detail.resolver";
import { ComputersInRoomResolver } from "./_resolvers/computersInRoom.resolver";
import { PersonsInRoomResolver } from "./_resolvers/personsInRoom.resolver";
import { PersonEditComponent } from "./persons/person-edit/person-edit.component";
import { PersonDetailResolver } from "./_resolvers/person-detail.resolver";
import { PersonListComponent } from "./persons/person-list/person-list.component";
import { AllocationsComponent } from "./allocations/allocations.component";
import { NotFoundComponentComponent } from "./not-found-component/not-found-component.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "computer-list", component: ComputerListComponent },
  { path: "person-list", component: PersonListComponent },
  { path: "pavc-computers", component: PavillionDetailComponent },
  { path: "pavh", component: PavGeneralComponent },
  { path: "pavb", component: PavGeneralComponent },
  { path: "pavd", component: PavGeneralComponent },
  { path: "pave", component: PavGeneralComponent },
  { path: "pavf", component: PavGeneralComponent },
  { path: "pavg", component: PavGeneralComponent },
  { path: "pavc", component: PavGeneralComponent },
  { path: "pavc/alloc", component: AllocationsComponent },
  { path: "pavb/alloc", component: AllocationsComponent },
  { path: "pavd/alloc", component: AllocationsComponent },
  { path: "pave/alloc", component: AllocationsComponent },
  { path: "pavf/alloc", component: AllocationsComponent },
  { path: "pavg/alloc", component: AllocationsComponent },
  { path: "pavh/alloc", component: AllocationsComponent },
  {
    path: "computers/:id",
    component: ComputerEditComponent,
    resolve: { computer: ComputerDetailResolver },
    canDeactivate: [PreventUnsavedChanges]
  },
  {
    path: "persons/:id",
    component: PersonEditComponent,
    resolve: { person: PersonDetailResolver }
  },
  {
    path: "rooms/:id",
    component: RoomEditComponent,
    resolve: {
      room: RoomDetailResolver,
      computers: ComputersInRoomResolver,
      persons: PersonsInRoomResolver
    }
  },
  { path: "404", component: NotFoundComponentComponent },
  { path: "**", component: NotFoundComponentComponent, pathMatch: "full" }
];
