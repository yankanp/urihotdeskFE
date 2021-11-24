import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';


import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { GetweeklySeatsRequestModel } from '../employee-seat-booking/models/getweeklySeatsRequest.model';
import { HSeatBookingRequestModel } from '../employee-seat-booking/models/hSeatBookingRequest.model';

@Injectable()
export class WeeklySeatBookingService  {

    URL = environment.BASE_URL;
    constructor(private http: HttpClient) { }

public getAllSeatsForLocation(value: string): any{
  return this.http.post<any>(this.URL + '/seat/location', {'location': value});
}

public getAllSeats(getweeklySeatsRequestModel : GetweeklySeatsRequestModel): Observable<any>{

  return this.http.post<any>(this.URL + "/seats/available/bulk", getweeklySeatsRequestModel).pipe(
      catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }))
}
public bookHotSeat(hSeatBookingRequest: HSeatBookingRequestModel): Observable<any>{

  return this.http.post<any>(this.URL + "/booking", hSeatBookingRequest).pipe(
      catchError((error: HttpErrorResponse) => {
          return throwError(error);
        }))
}

}
