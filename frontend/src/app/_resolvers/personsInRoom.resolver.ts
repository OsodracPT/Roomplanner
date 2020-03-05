import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ComputerService } from '../services/computer.service';
import { AlertifyService } from '../services/alertify.service';
import { Person } from '../_models/person';

@Injectable()

export class PersonsInRoomResolver implements Resolve<Person[]> {
    constructor(private computerService: ComputerService,
        private router: Router,
        private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Person[]> {
            // check if the route has a numeric value. If it has then it should be a room id.
            // If not it should be a room_number
            const isnum = /^\d+$/.test(route.params['id']);

            if (!isnum) {
                return this.computerService.getPersonsInRoomNumber(route.params['id']).pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving data from the API. ' + error.message);
                        this.alertify.error('Sending you back to the main page.');
                        this.router.navigate(['/']);
                        console.log(error);
                        return of(null);
                    })
                );
            }
            return this.computerService.getPersonsInRoom(route.params['id']).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving data from the API. ' + error.message);
                    this.alertify.error('Sending you back to the main page.');
                    this.router.navigate(['/']);
                    console.log(error);
                    return of(null);
                })
            );
        }
}
