import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent }  from '../../pages/user/user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRoleListComponent } from 'app/pages/user-role-list/user-role-list.component';
import { RolesComponent } from 'app/pages/roles/roles.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { UserProfileComponent } from 'app/pages/user-profile/user-profile.component';
import {
	IgxButtonModule,
	IgxDialogModule,
	IgxRippleModule
 } from "igniteui-angular";
import { UserProfileService } from 'app/pages/user-profile/services/userProfileService';
import { UseProfileResolver } from 'app/pages/user-profile/services/useProfileResolver';
// import { HotspotLocationComponent } from 'app/pages/hotspot-location/hotspot-location.component';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NumberDirective } from 'app/shared/directives/numbers-only.directive';
import { PriceDirective } from 'app/shared/directives/prices.directive';
import { TeamsComponent } from 'app/pages/teams/teams.component';
import { AssignTeamMembersComponent } from 'app/pages/assign-team-members/assign-team-members.component';
import { ClustersComponent } from 'app/pages/clusters/clusters.component'
import { from } from 'rxjs';
import { LocationsComponent } from 'app/pages/locations/locations.component';
import { TagInputModule } from 'ngx-chips';
import { EmployeeSeatBookingComponent } from 'app/pages/employee-seat-booking/employee-seat-booking.component';
import { LeadSeatBookingComponent } from 'app/pages/lead-seat-booking/lead-seat-booking.component';
import { TeamsService } from 'app/pages/teams/teams.service';
import { AssignTeamMemberService } from 'app/pages/assign-team-members/assignTeamMember.service';
import { LocationsService } from 'app/pages/locations/locations.service';
import { LeadSeatBookingService } from 'app/pages/lead-seat-booking/leadSeatBooking.service';
import { GetLocationResolver } from 'app/shared/resolvers/getLocationResolver';
import { GetTeamResolver } from 'app/shared/resolvers/getTeamResolver';
import { EmployeeSeatBookingService } from 'app/pages/employee-seat-booking/employeeSeatBooking.service';
import { GetLocationListResolver } from 'app/shared/resolvers/GetLocationListResolver';
import { GetTeamMemberResolver } from 'app/shared/resolvers/getTeamMemberResolver';
import { TeamMatesComponent } from 'app/pages/team-mates/team-mates.component';
import { TeamMateResolver } from 'app/shared/resolvers/teamMateResolver';
import { TeamMatesService } from 'app/pages/team-mates/teamMates.service';
import { WeeklySeatBookingComponent } from 'app/pages/weekly-seat-booking/weekly-seat-booking.component';
import { WeeklySeatBookingService } from 'app/pages/weekly-seat-booking/weeklySeatBooking.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    NgxFileDropModule,
    ReactiveFormsModule,
    IgxDialogModule,
    IgxRippleModule,
    GooglePlaceModule,
    TagInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCcJC2HTmwCU7iglBwG0cpo8P8wShut0Kk',
      libraries: ["places"]
    })
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    UserRoleListComponent,
    RolesComponent,
    UserProfileComponent,
    NumberDirective,
    PriceDirective,
    // HotspotLocationComponent,
    TeamsComponent,
    AssignTeamMembersComponent,
    ClustersComponent,
    LocationsComponent,
    EmployeeSeatBookingComponent,
    LeadSeatBookingComponent,
    TeamMatesComponent,
    WeeklySeatBookingComponent
  ],
  providers:[
    UseProfileResolver,
    DatePipe,
    // TeamsService,
    AssignTeamMemberService,
    LocationsService,
    LeadSeatBookingService,
    GetLocationResolver,
    EmployeeSeatBookingService,
    GetLocationListResolver,
    GetTeamMemberResolver,
    TeamMateResolver,
    TeamMatesService,
    WeeklySeatBookingService

  ],
  entryComponents: [],
})

export class AdminLayoutModule {}
