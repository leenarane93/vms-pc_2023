import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/facade/services/common/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
    isLoader:boolean=true
  ): Observable<HttpEvent<any>> {
    if(isLoader) {
      this.loaderService.showLoader();
      return next.handle(request).pipe(
        finalize(() => this.loaderService.hideLoader())
      );   
    }
    else{
      return next.handle(request).pipe();   
    }
  }
}
