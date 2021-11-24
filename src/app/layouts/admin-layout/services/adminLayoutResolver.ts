import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserPermissionService } from 'app/services/user-permission.service';
import { AuthService } from 'app/login/services/auth.service';


@Injectable()
export class AdminLayoutResolver implements Resolve<any>{
    constructor(private userPermissionService: UserPermissionService, private authService: AuthService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.getUserDetails();
    }
}
