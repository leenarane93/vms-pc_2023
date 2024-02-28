import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/facade/services/common/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: SessionService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService._getSessionValue("access_token");
    if (authToken != undefined) {
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + authToken
        }
      });
      return next.handle(req);
    }
    else {
      return next.handle(req);
    }
  }
}
