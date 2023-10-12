import { Injectable } from '@angular/core';
import { EncdecService } from '../services/common/encdec.service';
import { HttpService } from '../services/common/http.service';
import { LoaderService } from '../services/common/loader.service';
import { SessionService } from '../services/common/session.service';

@Injectable({
  providedIn: 'root'
})
export class CommonFacadeService {

  constructor(private _sessionService:SessionService,
    private _encdecService: EncdecService){}

   EncryptData(data:string){
    return this._encdecService.encryptUsingAES256(data);
   } 
   DecryptData(data:string){
    return this._encdecService.decryptUsingAES256(data);
   } 
}
