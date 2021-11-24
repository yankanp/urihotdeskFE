import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';


import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { TeamRequestModel } from '../teams/models/teamRequest.model';
import { GetAllSeatsRequestModel } from '../employee-seat-booking/models/getAllSeatsRequest.model';
import { HSeatBookingRequestModel } from '../employee-seat-booking/models/hSeatBookingRequest.model';

@Injectable()
export class LeadSeatBookingService  {

    URL = environment.BASE_URL;
    constructor(private http: HttpClient) { }

    public getAllSeats(getAllSeatsRequestModel : GetAllSeatsRequestModel): Observable<any>{

      return this.http.post<any>(this.URL + "/view/seats", getAllSeatsRequestModel).pipe(
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

public getAllSeatsForLocation(value: string): any{
  // let urlas = this.URL + '/seat?location=' + value;
  // // urlas.replcae
  //     console.log(urlas.replace(' ',''))
  return this.http.post<any>(this.URL + '/seat/location', {'location': value});
}

}
