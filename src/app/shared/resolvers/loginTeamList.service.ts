import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';


import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable()
export class LoginTeamListService {

  URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  public getAllTeamNames(): any {
    return this.http.get<any>(this.URL + "/teams/name");
  }


}
