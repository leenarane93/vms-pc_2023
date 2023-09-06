import { Injectable } from '@angular/core';
import { UserFacadeService } from '../facade/facade_services/user-facade.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, createUrlTreeFromSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuradService implements CanActivate {
  constructor(private _userfacade : UserFacadeService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this._userfacade.checkLoggedIn().pipe(map((isLoggedIn)=>
      isLoggedIn ? true : createUrlTreeFromSnapshot(route,['/','login'])
      )
  )
  }
}
