import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';


import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { AssignTeamMemberRequestModel } from './models/assignTeamMemberRequest.model';

@Injectable()
export class AssignTeamMemberService  {

    URL = environment.BASE_URL;
    constructor(private http: HttpClient) { }

    public saveTeamMember(assignTeamMemberRequestl: AssignTeamMemberRequestModel): Observable<any>{

        return this.http.post<any>(this.URL + "/assign", assignTeamMemberRequestl).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(error);
              }))
    }

    public getAllTeamMembers():any{
      return this.http.get<any>(this.URL + "/teams/employees");
    }



}
