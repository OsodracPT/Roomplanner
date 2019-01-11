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

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'computer-list', component: ComputerListComponent },
    { path: 'pavillions', component: PavillionDetailComponent },
    { path: 'pavc', component: PavCComponent },
    { path: 'computers/:id', component: ComputerEditComponent,
      resolve: {computer: ComputerDetailResolver},
    canDeactivate: [PreventUnsavedChanges] },
    { path: 'rooms/:id', component: RoomEditComponent,
    resolve: {
      room: RoomDetailResolver,
    computer: ComputerDetailResolver},
  canDeactivate: [PreventUnsavedChanges] },
    { path: '**', redirectTo: '', pathMatch: 'full'},
  ];

