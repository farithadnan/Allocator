import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BackEndErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // auto subscribe every request that happen
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
            switch (error.status) {
              case 400:
                if (error.error.errors) {
                  const modalStateErrors = [];
                  for (const key in error.error.errors) {

                    if (error.error.errors[key]) {
                      // This is to flatten array of error we got back from validation error responses
                      modalStateErrors.push(error.error.errors[key]);
                    }
                  }
                  throw modalStateErrors.flat();
                } else {
                  this.toastr.error(error.error , `${error.status} - ${error.statusText}`);
                }
                break;

              case 401:
                this.toastr.error(error.error, error.status);
                break;

              case 404:
                // this.router.navigateByUrl('/not-found');
                break;

              case 500:
                const navigationExtras: NavigationExtras = {state: {error: error.error}};
                // this.router.navigateByUrl('/server-error', navigationExtras);
                break;

              default:
                this.toastr.error("Something unexpected when wrong!");
                console.log(error);
                break;

            }
        } // if error end
        return throwError(error);


      })  // catch error end

    );
  }
}