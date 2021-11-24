import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

}
