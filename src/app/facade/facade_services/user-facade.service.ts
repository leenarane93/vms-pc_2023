import { Injectable } from '@angular/core';
import { HttpService } from '../services/common/http.service';
import { BehaviorSubject, forkJoin, of, take, tap } from 'rxjs';
import { SessionService } from '../services/common/session.service';
import { Login } from 'src/app/models/request/Login';
import { AuthenticationService } from '../services/user/authentication.service';
import { User } from 'src/app/models/response/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  public isLoggedin=false;
  public user!:User;
  
  constructor(private _sessionService:SessionService,
              private _authenticationService: AuthenticationService,
              private _route:Router) { }
  
  getApiUrl() {
   return this._sessionService._getSessionValue("api_url");
  }

  loginAuthenticate(_login:Login){
    return this._authenticationService.login(_login).subscribe(res =>{
      if(res.status == 1){
        this.isLoggedin = true;
        this._sessionService._setSessionValue("access_token",res.token);
        this.user = res;
        this._route.navigate(['config']);
      }
      else 
        this.user = res;
    });
  }

  checkLoggedIn(){
    return of(this.isLoggedin).pipe(tap((v)=>console.log(v)));
  }

}
