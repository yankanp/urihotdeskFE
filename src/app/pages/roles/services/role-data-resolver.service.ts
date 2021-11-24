import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RoleDataService } from './role-data.service';

@Injectable({
  providedIn: 'root'
})
export class RoleDataResolverService implements Resolve<any>{

  constructor(private roleDataService: RoleDataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.roleDataService.getPermissions();
  }

}
