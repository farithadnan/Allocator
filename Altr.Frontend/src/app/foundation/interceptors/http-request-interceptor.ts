import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators'
import {LoadingSpinnerService} from '../services/loading-spinner.service';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private _loadingSpinner: LoadingSpinnerService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._loadingSpinner.setLoading(true, request.url);
        return next.handle(request)
          .pipe(catchError((err) => {
            this._loadingSpinner.setLoading(false, request.url);
            return err;
          }))
          .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
            if (evt instanceof HttpResponse) {
             setTimeout(() =>  this._loadingSpinner.setLoading(false, request.url), 2000);
            }
            return evt;
          }));
    }
}