import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {

  BASE_DATA_URL = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  getPermissions(){
    return this.http.get(this.BASE_DATA_URL + '/admin/roles', {headers: {'Authorization' : 'Bearer ' + localStorage.getItem('access_token') }})
  }
}
