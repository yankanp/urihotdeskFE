import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AdminLayoutResolver } from './layouts/admin-layout/services/adminLayoutResolver';
import { GetTeamNamesResolver } from './shared/resolvers/getTeamNamesResolver';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      teamNameList: GetTeamNamesResolver
      }
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children:
     [{
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }],
      resolve: {
        userPermissionList: AdminLayoutResolver
      }
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]


