import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserProfileService {

    URL = environment.BASE_URL;
    constructor(private http: HttpClient) { }

    public getAllUsers() {
        return this.http.get<any>(this.URL + "/user");
    }

    public changeUserStatus(id:string,status:string){
       let userObject ={
        adName:id,
        status:status
       }
        return this.http.patch<any>(this.URL+"/admin/user",userObject);
    }

    public addAdminDetail(userObject:any){
        return this.http.post<any>(this.URL+"/admin/user",userObject);
    }

    public searchLdapUserDetails(userName:string){
        let userSearch={
            username:userName
        }
        return this.http.post<any>(this.URL+"/admin/search",userSearch);
    }
}
