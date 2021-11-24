import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { UserRoleListComponent } from 'app/pages/user-role-list/user-role-list.component';
import { RolesComponent } from 'app/pages/roles/roles.component';
import { RoleDataService } from 'app/pages/roles/services/role-data.service';
import { RoleDataResolverService } from 'app/pages/roles/services/role-data-resolver.service';
import { UserProfileComponent } from 'app/pages/user-profile/user-profile.component';
import { UseProfileResolver } from 'app/pages/user-profile/services/useProfileResolver';
import { TeamsComponent } from 'app/pages/teams/teams.component';
import { AssignTeamMembersComponent } from 'app/pages/assign-team-members/assign-team-members.component';
import { ClustersComponent } from 'app/pages/clusters/clusters.component';
import { LocationsComponent } from 'app/pages/locations/locations.component';
import { EmployeeSeatBookingComponent } from 'app/pages/employee-seat-booking/employee-seat-booking.component';
import { LeadSeatBookingComponent } from 'app/pages/lead-seat-booking/lead-seat-booking.component';
import { GetLocationResolver } from 'app/shared/resolvers/getLocationResolver';
import { GetTeamResolver } from 'app/shared/resolvers/getTeamResolver';
import { GetLocationListResolver } from 'app/shared/resolvers/GetLocationListResolver';
import { GetTeamMemberResolver } from 'app/shared/resolvers/getTeamMemberResolver';
import { TeamMatesComponent } from 'app/pages/team-mates/team-mates.component';
import { TeamMateResolver } from 'app/shared/resolvers/teamMateResolver';
import { WeeklySeatBookingComponent } from 'app/pages/weekly-seat-booking/weekly-seat-booking.component';
// import { HotspotLocationComponent } from 'app/pages/hotspot-location/hotspot-location.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'userRoleList',
    component: UserRoleListComponent
  },
  {
    path: 'roles',
    component: RolesComponent,
    resolve: {
      permissions: RoleDataResolverService
    }
  },
  {
    path: 'employeeSeatBooking',
    component: EmployeeSeatBookingComponent,
    resolve: {
      locationList: GetLocationListResolver,
    }
  },
  {
    path: 'clusters',
    component: ClustersComponent,
    resolve: {
    }
  },
  {
    path: 'users',
    component: UserProfileComponent,
    resolve: {
      userProfileList: UseProfileResolver,
    }
  },
  {
    path: 'locations',
    component: LocationsComponent,
    resolve: {
      locationList: GetLocationListResolver
    }
  },
  {
    path: 'assignMembers',
    component: AssignTeamMembersComponent,
    resolve: {
      teamList: GetTeamResolver,
      teamMemberList: GetTeamMemberResolver
    }
  },
  {
    path: 'teams',
    component: TeamsComponent,
    resolve: {
      locationList: GetLocationResolver,
      teamList: GetTeamResolver
    }
  },
  {
    path: 'leadSeatBooking',
    component: LeadSeatBookingComponent,
    resolve: {
      locationList: GetLocationListResolver,
      memberList: TeamMateResolver
    }
  },
  {
    path: 'teamMates',
    component: TeamMatesComponent,
    resolve: {
      memberList: TeamMateResolver
    }
  },
  {
    path: 'weeklySeatBooking',
    component: WeeklySeatBookingComponent,
    resolve: {
      locationList: GetLocationListResolver,
      memberList: TeamMateResolver
    }
  },
];
