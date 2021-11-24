import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { TeamsService } from 'app/pages/teams/teams.service';

@Injectable()
export class GetTeamMemberResolver implements Resolve<any>{

    constructor(private teamsService: TeamsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.teamsService.getAllTeamMembers();
    }
}
