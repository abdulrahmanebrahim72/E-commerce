import { LoaderService } from './../services/loader.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private _LoaderService:LoaderService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


     this._LoaderService.show();

     return next.handle(request).pipe(finalize(() => {return this._LoaderService.hide()}));
  }
}
