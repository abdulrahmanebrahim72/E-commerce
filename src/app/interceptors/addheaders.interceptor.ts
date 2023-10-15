import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddheadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token:any = sessionStorage.getItem('userToken');

    if(token !== null){
      let modifidRequest = request.clone({
        headers:request.headers.set("token" , token)
      });
      return next.handle(modifidRequest);
    }


    return next.handle(request);
  }
}
