import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  login(username: string, password: string, teamName: string){
    // ,teamName
    let loginRequest: LoginRequest = new LoginRequest(username, password,teamName);
    return this.http.post(this.BASE_URL + '/oauth/token', loginRequest);
  }

  logout(){
    return this.http.get(this.BASE_URL + '/oauth/token');
  }

  // getAdminDetails(){
  //   return this.http.get<any>(this.BASE_URL + '/admin/me');
  // }

  getUserDetails(){
    return this.http.get<any>(this.BASE_URL + '/user');
  }

}
