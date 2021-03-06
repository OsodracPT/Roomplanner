import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ComputerService } from '../services/computer.service';
import { Computer } from '../_models/computer';
import { AlertifyService } from '../services/alertify.service';

@Injectable()

export class ComputersInRoomResolver implements Resolve<Computer[]> {
    constructor(private computerService: ComputerService,
        private router: Router,
        private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Computer[]> {

            // check if the route has a numeric value. If it has then it should be a room id.
            // If not it should be a room_number
            const isnum = /^\d+$/.test(route.params['id']);
            if (!isnum) {
                return this.computerService.getComputersInRoomNumber(route.params['id']).pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving data.' + error.message);
                        this.alertify.error('Sending you back to the main page.');
                        this.router.navigate(['/']);
                        console.log(error);
                        return of(null);
                    })
                );
            }
            return this.computerService.getComputersInRoom(route.params['id']).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving data.' + error.message);
                    this.router.navigate(['/']);
                    console.log(error);
                    return of(null);
                })
            );

        }
}
