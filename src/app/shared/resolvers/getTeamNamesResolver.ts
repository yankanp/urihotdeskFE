import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { TeamsService } from 'app/pages/teams/teams.service';

@Injectable()
export class GetTeamNamesResolver implements Resolve<any> {

    constructor(private teamsService: TeamsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.teamsService.getAllTeamNames();
    }
}
