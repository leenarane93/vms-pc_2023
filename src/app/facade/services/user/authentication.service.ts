import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/request/Login';
import { UserFacadeService } from '../../facade_services/user-facade.service';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private http:HttpClient,
              private _httpService:HttpService) { }
  login(credentials: Login): Observable<any> {
    return this._httpService._postMethod( credentials,'User_API/api/User/LoginRequest');
  }

  getMenuByRoleId(role_id : number): Observable<any> {
    return this._httpService._getMethod('user_API/api/Role/GetMenuListById?id='+role_id);
  }

}
