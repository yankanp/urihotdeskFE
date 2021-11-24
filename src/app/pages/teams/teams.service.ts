import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';


import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { TeamRequestModel } from './models/teamRequest.model';

@Injectable()
export class TeamsService {

  URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  public saveTeams(teamRequest: TeamRequestModel): Observable<any> {

    return this.http.post<any>(this.URL + "/team", teamRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }))
  }

  public getAllTeams(): any {
    return this.http.get<any>(this.URL + "/teams");
  }

  public getAllTeamNames(): any {
    return this.http.get<any>(this.URL + "/teams/name");
  }

  public getSeats(request: any): any {
    return this.http.post<any>(this.URL + "/seats/available", request);
  }

  public saveSeatsForTeam(request: any): any {
    return this.http.post<any>(this.URL + "/team/seats", request);
  }

  public getAllTeamMembers():any{
    return this.http.get<any>(this.URL + "/teams/employees");
  }
}
