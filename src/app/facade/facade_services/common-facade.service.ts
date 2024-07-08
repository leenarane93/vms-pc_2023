import { Injectable } from '@angular/core';
import { EncdecService } from '../services/common/encdec.service';
import { HttpService } from '../services/common/http.service';
import { LoaderService } from '../services/common/loader.service';
import { SessionService } from '../services/common/session.service';

@Injectable({
  providedIn: 'root'
})
export class CommonFacadeService {
  loader:boolean= false;
  constructor(private _sessionService:SessionService,
    private _encdecService: EncdecService,
    private _httpService:HttpService){}

   EncryptData(data:string){
    return this._encdecService.encryptUsingAES256(data);
   } 
   DecryptData(data:string){
    return this._encdecService.decryptUsingAES256(data);
   } 

   setSession(key:string,val:any){
    this._sessionService._setSessionValue(key,val);
   }
   getSession(key:string){
    return this._sessionService._getSessionValue(key);
   }
  removeSessionValue(_key:string){
    this._sessionService._removeSessionValue(_key);
  }

  getSwaggerUrl() {
    return this._httpService._getSwaggerUrl();
  }
  setSwaggerUrl(){
    return this._httpService._setSwaggerUrl();
  }
}
