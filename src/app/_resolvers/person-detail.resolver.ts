import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ComputerService } from '../services/computer.service';
import { AlertifyService } from '../services/alertify.service';
import { Person } from '../_models/person';

@Injectable()

export class PersonDetailResolver implements Resolve<Person> {
    constructor(private computerService: ComputerService,
        private router: Router,
        private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Person> {
            return this.computerService.getPerson(route.params['id']).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving data.' + error.error.api);
                    this.router.navigate(['/']);
                    console.log(error);
                    return of(null);
                })
            );
        }
}