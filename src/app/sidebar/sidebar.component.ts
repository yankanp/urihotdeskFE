import { Component, OnInit } from '@angular/core';
import { UserPermissionService } from 'app/services/user-permission.service';
import { AuthService } from 'app/login/services/auth.service';
import { ActivatedRoute } from '@angular/router';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    permissions: any;
}

export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'DASHBOARD', icon: 'nc-tile-56', class: '' },
    { path: '/teams', title: 'Teams', icon: 'team.png', class: '', permissions: 'ROLE_SUPER_ADMIN' },
    { path: '/assignMembers', title: 'Assign Team', icon: 'seminar.png', class: '', permissions: 'ROLE_SUPER_ADMIN' },
    { path: '/locations', title: 'Seats', icon: 'chair.png', class: '', permissions: 'ROLE_SUPER_ADMIN' },
    // { path: '/clusters', title: 'Clusters', icon: 'user.png', class: '', permissions: 'Add Users' },
    { path: '/employeeSeatBooking', title: 'Seat Booking', icon: 'choose.png', class: '', permissions: 'ROLE_EMPLOYEE' },
    { path: '/weeklySeatBooking', title: 'Weekly Seat Booking', icon: 'booking.png', class: '', permissions: 'ROLE_LEAD' },
    { path: '/leadSeatBooking', title: 'Seat Booking', icon: 'choose.png', class: '', permissions: 'ROLE_LEAD' },
    { path: '/teamMates', title: 'View Team Mates', icon: 'seminar.png', class: '', permissions: 'ROLE_LEAD' },
    // { path: '/roles', title: 'User Roles', icon: 'userRole.png', class: '', permissions: 'View User Role' },
    { path: '/users', title: 'User Profile', icon: 'user.png', class: '', permissions: 'ROLE_SUPER_ADMIN' },

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    userPermissionList: any;
    constructor(private userPermissionService: UserPermissionService, private authService: AuthService, private route: ActivatedRoute) { }
    ngOnInit() {
        this.route.data.subscribe(data => {
            this.userPermissionList = data['userPermissionList'].authorities;
            console.log(this.userPermissionList);
            // console.log(data['userPermissionList'].DATA.username)
            // this.userPermissionService.setUserName(data['userPermissionList'].DATA.username);
            // this.userPermissionService.setDisplayName(data['userPermissionList'].DATA.displayName);
          })
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
