import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { LocationsService } from 'app/pages/locations/locations.service';

@Injectable()
export class GetLocationResolver implements Resolve<any>{

    constructor(private locationsService: LocationsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.locationsService.getAllLocations();
    }
}
