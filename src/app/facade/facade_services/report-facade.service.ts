import { Injectable } from '@angular/core';
import { NetworkReportService } from '../services/reports/network-report.service';

@Injectable({
  providedIn: 'root'
})
export class ReportFacadeService {

  constructor(private _network:NetworkReportService) { }

  GetNetworkDetailsRpt(_data:any){
    return this._network.getNetworkDetailsRpt(_data);
  }
}
