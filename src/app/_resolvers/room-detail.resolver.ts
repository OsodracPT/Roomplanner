import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ComputerService } from '../services/computer.service';
import { Computer } from '../_models/computer';
import { AlertifyService } from '../services/alertify.service';
import { Room } from '../_models/room';

@Injectable()

export class RoomDetailResolver implements Resolve<Room> {
    constructor(private computerService: ComputerService,
        private router: Router,
        private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Room> {
            return this.computerService.getRoom(route.params['id']).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving data.' + error.message);
                    this.router.navigate(['/']);
                    console.log(error);
                    return of(null);
                })
            );
        }
}
