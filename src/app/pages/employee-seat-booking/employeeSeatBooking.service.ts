import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';


import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpClient, HttpParams } from '@angular/common/http';
import { HSeatBookingRequestModel } from './models/hSeatBookingRequest.model';
import { GetAllSeatsRequestModel } from './models/getAllSeatsRequest.model';

@Injectable()
export class EmployeeSeatBookingService  {

    URL = environment.BASE_URL;
    constructor(private http: HttpClient ) { }

    public bookHotSeat(hSeatBookingRequest: HSeatBookingRequestModel): Observable<any>{

        return this.http.post<any>(this.URL + "/booking", hSeatBookingRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log('Booking Request1 {}',hSeatBookingRequest);
                return throwError(error);
              }))
    }

    public getAllSeats(getAllSeatsRequestModel : GetAllSeatsRequestModel): Observable<any>{

      return this.http.post<any>(this.URL + "/view/seats", getAllSeatsRequestModel).pipe(
          catchError((error: HttpErrorResponse) => {
              return throwError(error);
            }))
  }

  public getAllSeatsForLocation(value: string): any {
    // let httpParams = new HttpParams().set("location", value);
    // let urlas = this.URL + '/seat?location=' + value;
    // // urlas.replcae
    //     console.log(urlas.replace(' ',''))
        return this.http.post<any>(this.URL + '/seat/location', {'location': value});
  }
}
