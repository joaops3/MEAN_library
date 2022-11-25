import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = localStorage.getItem("user")
    if(!user) return next.handle(request);
      let userJson = JSON.parse(user)
      let token = userJson?.access_token
      const newRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

    
    return next.handle(newRequest);
  }
}
