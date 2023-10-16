import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _httpService:HttpService,
    private _http:HttpClient) { }
    jsonurl: string = '/assets/config/config.json';

    getDashboardChartData(){
      return this._httpService._getMethod('dashboard_api/api/Dashboard/GetDashboardCharts');
    }
}
