import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = this.addAuthenticationToken(request);
        return next
          .handle(request)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if(error.status === 401){
                localStorage.removeItem('access_token');
                this.router.navigate(['']);
              }
              return throwError(error);
            })
          )
    }

    addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
      console.log(request.urlWithParams);
      if(request.url === 'http://localhost:8080/teams/name'){
        return request.clone({
          setHeaders: {

          }
        });
      }else{
        let access_token = this.authService.getAccessToken();
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${access_token}`
          }
        });
      }
  }
}
