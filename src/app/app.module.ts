import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BrowserModule } from '@angular/platform-browser';
import { AdminLayoutResolver } from './layouts/admin-layout/services/adminLayoutResolver';
import { UserProfileService } from './pages/user-profile/services/userProfileService';
import { NumberDirective } from './shared/directives/numbers-only.directive';
import { NgbdModalContentComponent } from './pages/ngbd-modal-content/ngbd-modal-content.component';
import { GetTeamNamesResolver } from './shared/resolvers/getTeamNamesResolver';
import { TeamsService } from './pages/teams/teams.service';
import { GetTeamResolver } from './shared/resolvers/getTeamResolver';
import { LoginTeamListService } from './shared/resolvers/loginTeamList.service';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    NgbdModalContentComponent,
     // DragDirective
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    BrowserModule,
  ],
  providers: [
    AdminLayoutResolver,
    UserProfileService,
    GetTeamNamesResolver,
    GetTeamResolver,
    TeamsService,
    LoginTeamListService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [NgbdModalContentComponent],
})
export class AppModule { }
