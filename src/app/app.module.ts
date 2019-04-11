import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CollapseModule, BsDropdownModule, TabsModule, TooltipModule, BsDatepickerModule } from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';


import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComputerService } from './services/computer.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ComputerDetailsComponent } from './computers/computer-details/computer-details.component';
import { ComputerListComponent } from './computers/computer-list/computer-list.component';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { PavillionDetailComponent } from './pavillions/pavillion-detail/pavillion-detail.component';
import { ComputerEditComponent } from './computers/computer-edit/computer-edit.component';
import { AlertifyService } from './services/alertify.service';
import { ComputerDetailResolver } from './_resolvers/computer-detail.resolver';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PavCComponent } from './pavillions/pav-c/pav-c.component';
import { GroundfloorComponent } from './pavillions/pav-c/groundfloor/groundfloor.component';
import { FirstfloorComponent } from './pavillions/pav-c/firstfloor/firstfloor.component';
import { SecondfloorComponent } from './pavillions/pav-c/secondfloor/secondfloor.component';

import { RoomDetailsComponent } from './rooms/room-details/room-details.component';
import { RoomEditComponent } from './rooms/room-edit/room-edit.component';
import { RoomDetailResolver } from './_resolvers/room-detail.resolver';
import { ComputersInRoomResolver } from './_resolvers/computersInRoom.resolver';
import { PersonsInRoomResolver } from './_resolvers/personsInRoom.resolver';
import { PersonDetailsComponent } from './persons/person-details/person-details.component';
import { PersonEditComponent } from './persons/person-edit/person-edit.component';
import { PersonDetailResolver } from './_resolvers/person-detail.resolver';
import { PersonListComponent } from './persons/person-list/person-list.component';
import { PavHComponent } from './pavillions/pav-h/pav-h.component';
import { SvgComponent } from './svg/svg.component';
import { AllocationsComponent } from './allocations/allocations.component';

@NgModule({
   declarations: [
      AppComponent,
      NavBarComponent,
      ComputerDetailsComponent,
      ComputerListComponent,
      HomeComponent,
      PavillionDetailComponent,
      ComputerEditComponent,
      PavCComponent,
      FirstfloorComponent,
      SecondfloorComponent,
      GroundfloorComponent,
      RoomDetailsComponent,
      RoomEditComponent,
      PersonDetailsComponent,
      PersonEditComponent,
      PersonListComponent,
      PavHComponent,
      SvgComponent,
      AllocationsComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgSelectModule,
      NgxSpinnerModule,
      CollapseModule.forRoot(),
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TooltipModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      Title,
      ComputerService,
      AlertifyService,
      ComputerDetailResolver,
      RoomDetailResolver,
      ComputersInRoomResolver,
      PersonsInRoomResolver,
      PersonDetailResolver,
      PreventUnsavedChanges,
      DatePipe
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
