import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkReportService {

  constructor(private _httpService :HttpService) { }
  
  getNetworkDetailsRpt(_data:any){
    return this._httpService._postMethod(_data,"Media_API/api/report/getnetworkReport");
  }
}
