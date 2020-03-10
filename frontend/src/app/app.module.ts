import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  CollapseModule,
  BsDropdownModule,
  TabsModule,
  TooltipModule,
  BsDatepickerModule
} from "ngx-bootstrap";
import { TableModule } from "primeng/table";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ComputerService } from "./services/computer.service";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { ComputerDetailsComponent } from "./computers/computer-details/computer-details.component";
import { ComputerListComponent } from "./computers/computer-list/computer-list.component";
import { appRoutes } from "./routes";
import { HomeComponent } from "./home/home.component";
import { PavillionDetailComponent } from "./pavillions/pavillion-detail/pavillion-detail.component";
import { ComputerEditComponent } from "./computers/computer-edit/computer-edit.component";
import { AlertifyService } from "./services/alertify.service";
import { ComputerDetailResolver } from "./_resolvers/computer-detail.resolver";
import { NgForm, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { PavCComponent } from "./pavillions/pav-c/pav-c.component";
import { GroundfloorComponent } from "./pavillions/pav-c/groundfloor/groundfloor.component";
import { FirstfloorComponent } from "./pavillions/pav-c/firstfloor/firstfloor.component";
import { SecondfloorComponent } from "./pavillions/pav-c/secondfloor/secondfloor.component";

import { RoomDetailsComponent } from "./rooms/room-details/room-details.component";
import { RoomEditComponent } from "./rooms/room-edit/room-edit.component";
import { RoomDetailResolver } from "./_resolvers/room-detail.resolver";
import { ComputersInRoomResolver } from "./_resolvers/computersInRoom.resolver";
import { PersonsInRoomResolver } from "./_resolvers/personsInRoom.resolver";
import { PersonDetailsComponent } from "./persons/person-details/person-details.component";
import { PersonEditComponent } from "./persons/person-edit/person-edit.component";
import { PersonDetailResolver } from "./_resolvers/person-detail.resolver";
import { PersonListComponent } from "./persons/person-list/person-list.component";
<<<<<<< HEAD
=======
import { PavHComponent } from "./pavillions/pav-h/pav-h.component";
import { SvgComponent } from "./svg/svg.component";
>>>>>>> final-project
import { AllocationsComponent } from "./allocations/allocations.component";
import { PavGeneralComponent } from "./pavillions/pav-general/pav-general.component";
import { PavDGroundfloorComponent } from "./pavillions/pav-d-groundfloor/pav-d-groundfloor.component";
import { PavDFirstfloorComponent } from "./pavillions/pav-d-firstfloor/pav-d-firstfloor.component";
import { NotFoundComponentComponent } from "./not-found-component/not-found-component.component";
import { PersonsTableComponent } from "./persons/persons-table/persons-table.component";
import { PavBGroundfloorComponent } from "./pavillions/pav-b-groundfloor/pav-b-groundfloor.component";
import { PavBFirstfloorComponent } from "./pavillions/pav-b-firstfloor/pav-b-firstfloor.component";
import { PavBSecondfloorComponent } from "./pavillions/pav-b-secondfloor/pav-b-secondfloor.component";
import { PavBLowerComponent } from "./pavillions/pav-b-lower/pav-b-lower.component";
import { LoadingSpinnerComponent } from "./ui/loading-spinner/loading-spinner.component";
import { PavDLowerComponent } from "./pavillions/pav-d-lower/pav-d-lower.component";
import { PavELowerComponent } from "./pavillions/pav-e-lower/pav-e-lower.component";
import { PavFLowerComponent } from "./pavillions/pav-f-lower/pav-f-lower.component";
import { PavGLowerComponent } from "./pavillions/pav-g-lower/pav-g-lower.component";
import { PavHLowerComponent } from "./pavillions/pav-h-lower/pav-h-lower.component";

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
<<<<<<< HEAD
=======
    PavHComponent,
    SvgComponent,
>>>>>>> final-project
    AllocationsComponent,
    PavGeneralComponent,
    PavDGroundfloorComponent,
    PavDFirstfloorComponent,
    NotFoundComponentComponent,
    PersonsTableComponent,
    PavBGroundfloorComponent,
    PavBFirstfloorComponent,
    PavBSecondfloorComponent,
    PavBLowerComponent,
    LoadingSpinnerComponent,
    PavDLowerComponent,
    PavELowerComponent,
    PavFLowerComponent,
    PavGLowerComponent,
    PavHLowerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TableModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {}
