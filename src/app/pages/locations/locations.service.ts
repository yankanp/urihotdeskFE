import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';


import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { LocationRequestModel } from './models/locationRequest.model';

@Injectable()
export class LocationsService  {

    URL = environment.BASE_URL;
    constructor(private http: HttpClient) { }

    public saveLocation(locationRequestModel: LocationRequestModel): Observable<any>{

        return this.http.post<any>(this.URL + "/seat", locationRequestModel).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
              }))
    }

    public getAllLocations(): any{
      return this.http.get<any>(this.URL + "/locations");
  }

}
