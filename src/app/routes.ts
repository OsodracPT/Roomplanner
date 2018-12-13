import {Routes} from '@angular/router';
import { ComputerListComponent } from './computers/computer-list/computer-list.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PavillionDetailComponent } from './pavillions/pavillion-detail/pavillion-detail.component';
import { ComputerEditComponent } from './computers/computer-edit/computer-edit.component';
import { ComputerDetailResolver } from './_resolvers/computer-detail.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';


// export const appRoutes: Routes = [

//     { path: '', component: AppComponent},
// {
// path: '',
// runGuardsAndResolvers: 'always',
// children: [
//     { path:   'computer-list', component: ComputerListComponent}
// ]
// },

//     { path: '**', redirectTo: '', pathMatch: 'full'},
// ];

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'computer-list', component: ComputerListComponent },
    { path: 'pavillions', component: PavillionDetailComponent },
    { path: 'computers/:id', component: ComputerEditComponent,
      resolve: {computer: ComputerDetailResolver},
    canDeactivate: [PreventUnsavedChanges] },
    { path: '**', redirectTo: '', pathMatch: 'full'},
  ];

