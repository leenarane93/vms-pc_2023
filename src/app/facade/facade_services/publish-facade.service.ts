import { Injectable } from '@angular/core';
import { PublishOpsService } from '../services/publish/publish-ops.service';

@Injectable({
  providedIn: 'root'
})
export class PublishFacadeService {
  constructor(private _publishService:PublishOpsService) { }

  getZonesForPublish(data: any) {
    return this._publishService.getZoneForPublish(data);
  }
  getVmsDetailsByZone(data:any) {
    return this._publishService.getVmsDetailsByZone(data);
  }
  getPlaylistMasterData() {
    return this._publishService.getPlaylistMasterData();
  }
}
