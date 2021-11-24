import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserProfileService } from './userProfileService';


@Injectable()
export class UseProfileResolver implements Resolve<any>{
    constructor(private userProfileService:UserProfileService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.userProfileService.getAllUsers();
    }
}