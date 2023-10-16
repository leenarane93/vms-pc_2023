import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, of, take, tap } from 'rxjs';
import { SessionService } from '../services/common/session.service';
import { Login } from 'src/app/models/request/Login';
import { AuthenticationService } from '../services/user/authentication.service';
import { User } from 'src/app/models/response/User';
import { Router } from '@angular/router';
import { UserLoggedIn } from 'src/app/models/$bs/userLoggedIn';
import { DashboardService } from '../services/dashboard/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  public isLoggedinSubject=new BehaviorSubject<UserLoggedIn>({
    LoggedIn:false,
    LoggedInUser :"",
    LoggedTime : new Date()
  });
  public isLoggedin: Observable<UserLoggedIn>;
  public user!:User;
  private items = new BehaviorSubject<any>([]);
  public items$ = this.items.asObservable();
  
  private menus = new BehaviorSubject<any>([]);
  public menus$ = this.menus.asObservable();

  constructor(private _sessionService:SessionService,
              private _authenticationService: AuthenticationService,
              private _route:Router,
              private _dashboard : DashboardService ) {
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
        var user =new UserLoggedIn();
        user.LoggedIn=true;
        user.LoggedInUser = res.username;
        user.LoggedTime = new Date();
        this.isLoggedinSubject.next(user);
        this._sessionService._setSessionValue("access_token",res.token);
        this.user = res;
      }
      else {
        var user =new UserLoggedIn();
        user.LoggedIn=false;
        user.LoggedInUser = "";
        user.LoggedTime = new Date();
        this.isLoggedinSubject.next(user);
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
        this.menus.next(null);
        this.menus.next(res);
      }
    });
  }

  ClearUserObject(){
    var _user = new UserLoggedIn();
    _user.LoggedIn =false;
    _user.LoggedInUser="";
    _user.LoggedTime=new Date();
    this.isLoggedinSubject.next(_user);
    if(this.user != undefined){
      this.user.status = "0";
    }
    this._route.navigate(['login']);
  }

  GetDashboardCharts(){
    return this._dashboard.getDashboardChartData();
  }
}
