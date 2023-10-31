import { Injectable } from '@angular/core';
import { AdminService } from '../services/admin/admin.service';
import { SessionService } from '../services/common/session.service';

@Injectable({
  providedIn: 'root'
})
export class AdminFacadeService {

  constructor(private _adminService: AdminService,
    private _sessionService: SessionService) { }

  AddConfigData(data: any) {
    return this._adminService.addConfigurationData(data);
  }

  getKeysDataForConfig(key: string) {
    return this._adminService.getKeysDataForConfig(key);
  }

  getZones(_data: any) {
    return this._adminService.getZoneMasterData(_data);
  }
  getVmss(_data: any) {
    return this._adminService.getVmsMasterData(_data);
  }
  getParties(_data: any) {
    return this._adminService.getPartiesData(_data);
  }
  addParty(_data: any) {
    return this._adminService.addPartyData(_data);
  }
  updateParty(_data: any) {
    return this._adminService.updatePartyData(_data);
  }
}
