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
