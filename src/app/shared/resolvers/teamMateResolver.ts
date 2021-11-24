import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { TeamMatesService } from 'app/pages/team-mates/teamMates.service';

@Injectable()
export class TeamMateResolver implements Resolve<any>{

    constructor(private teamMatesService: TeamMatesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.teamMatesService.getAllTeamMembers();
    }
}
