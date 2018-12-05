import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CollapseModule, BsDropdownModule, TabsModule } from 'ngx-bootstrap';



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
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
   declarations: [
      AppComponent,
      NavBarComponent,
      ComputerDetailsComponent,
      ComputerListComponent,
      HomeComponent,
      PavillionDetailComponent,
      ComputerEditComponent
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
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      ComputerService,
      AlertifyService,
      ComputerDetailResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
