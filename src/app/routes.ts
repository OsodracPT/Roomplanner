import {Routes} from '@angular/router';
import { ComputerListComponent } from './computers/computer-list/computer-list.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';


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
    { path: 'computer-list', component: ComputerListComponent }
  ];

