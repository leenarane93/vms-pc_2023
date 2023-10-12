import { Injectable } from '@angular/core';
import { UserFacadeService } from '../facade/facade_services/user-facade.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, createUrlTreeFromSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuradService implements CanActivate {
  constructor(private _userfacade : UserFacadeService,
              private _jwtHelper : JwtHelperService,
              private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this._userfacade.checkLoggedIn().pipe(map((isLoggedIn)=>
      isLoggedIn ? this.CheckTokenExpireation() : createUrlTreeFromSnapshot(route,['/','login'])
      )
  )
  }

  CheckTokenExpireation(){
    debugger;
    const token = sessionStorage.getItem("access_token");

    //Check if the token is expired or not and if token is expired then redirect to login page and return false
    if (token && !this._jwtHelper.isTokenExpired(token)){
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
