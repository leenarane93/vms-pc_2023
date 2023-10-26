import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
    private _httpService: HttpService,
    private _http: HttpClient) { }
  jsonurl: string = '/assets/config/config.json';
  addConfigurationData(data: any) {
    return this._httpService._postMethod(data, 'administration_api/api/ConfigParam/AddConfigDetails');
  }

  getKeysDataForConfig(key: string) {
    return this._http.get(this.jsonurl);
  }

  getZoneMasterData(_data: any) {
    return this._httpService._postMethod(_data, 'Administration_API/api/ZoneMaster/GetZones');
  }

  getVmsMasterData(_data: any) {
    return this._httpService._postMethod(_data, 'Administration_api/api/VMSMaster/GetVmsMasterDetails');
  }

}
