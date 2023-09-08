import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, of, take, tap } from 'rxjs';
import { SessionService } from '../services/common/session.service';
import { Login } from 'src/app/models/request/Login';
import { AuthenticationService } from '../services/user/authentication.service';
import { User } from 'src/app/models/response/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  public isLoggedinSubject: BehaviorSubject<boolean | false>;
  public isLoggedin: Observable<boolean | false>;
  public user!:User;
  private items = new BehaviorSubject<any>([]);
  public items$ = this.items.asObservable();
  
  private menus = new BehaviorSubject<any>([]);
  public menus$ = this.menus.asObservable();

  constructor(private _sessionService:SessionService,
              private _authenticationService: AuthenticationService,
              private _route:Router) {
                this.isLoggedinSubject = new BehaviorSubject(false);
                this.isLoggedinSubject.next(false);
                this.isLoggedin = this.isLoggedinSubject.asObservable();
               }
  
  getApiUrl() {
   return this._sessionService._getSessionValue("api_url");
  }

  loginAuthenticate(_login:Login) {
    //return this._httpService._postMethod(_login,'User_API/api/User/LoginRequest');
    return this._authenticationService.login(_login)
      .pipe(tap(items=>this.items.next(items)))
      .subscribe(res =>{
      if(res.status == 1){
        this.isLoggedinSubject.next(true);
        this._sessionService._setSessionValue("access_token",res.token);
        this.user = res;
      }
      else {
        this.isLoggedinSubject.next(false);
        this.user = res;
      }
    });
  }

  checkLoggedIn(){
    return of(this.isLoggedin).pipe(tap((v)=>console.log(v)));
  }

  removeSessionValue(_key:string){
    this._sessionService._removeSessionValue(_key);
  }

  getMenuDetailsByRole(id:number) {
    this._authenticationService.getMenuByRoleId(id).subscribe(res=>{
      if(res != null){
        this.menus.next(res);
      }
    });
  }
}
