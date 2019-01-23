import {Routes} from '@angular/router';
import { ComputerListComponent } from './computers/computer-list/computer-list.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PavillionDetailComponent } from './pavillions/pavillion-detail/pavillion-detail.component';
import { ComputerEditComponent } from './computers/computer-edit/computer-edit.component';
import { ComputerDetailResolver } from './_resolvers/computer-detail.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PavCComponent } from './pavillions/pav-c/pav-c.component';
import { RoomEditComponent } from './rooms/room-edit/room-edit.component';
import { RoomDetailResolver } from './_resolvers/room-detail.resolver';
import { ComputersInRoomResolver } from './_resolvers/computersInRoom.resolver';
import { PersonsInRoomResolver } from './_resolvers/personsInRoom.resolver';
import { PersonEditComponent } from './persons/person-edit/person-edit.component';
import { PersonDetailResolver } from './_resolvers/person-detail.resolver';
import { PersonListComponent } from './persons/person-list/person-list.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'computer-list', component: ComputerListComponent },
    { path: 'person-list', component: PersonListComponent },
    { path: 'pavc-computers', component: PavillionDetailComponent },
    { path: 'pavc', component: PavCComponent },
    { path: 'computers/:id', component: ComputerEditComponent,
      resolve: {computer: ComputerDetailResolver},
    canDeactivate: [PreventUnsavedChanges] },
    { path: 'persons/:id', component: PersonEditComponent,
    resolve: {person: PersonDetailResolver}},
    { path: 'rooms/:id', component: RoomEditComponent,
    resolve: {
      room: RoomDetailResolver,
    computers: ComputersInRoomResolver,
    persons: PersonsInRoomResolver}},
    { path: '**', redirectTo: '', pathMatch: 'full'},
  ];

