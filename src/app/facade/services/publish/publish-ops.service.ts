import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class PublishOpsService {

  constructor(private http: HttpClient,
    private _httpService: HttpService,
    private _http: HttpClient) { }

  getZoneForPublish(_data: any) {
    return this._httpService._postMethod(_data, 'administration_api/api/ZoneMaster/GetZonesForPublish');
  }

  getVmsDetailsByZone(_data: any) {
    return this._httpService._postMethod(_data, 'publish_api/api/PublishDetails/GetVmsDetailsByZone');
  }

  getPlaylistMasterData() {
    return this._httpService._getMethod("media_api/api/PlaylistMaster/GetPlaylistMasterForPublish");
  }

  AddPublishDetails(_data: any) {
    return this._httpService._postMethod(_data, 'Publish_API/api/PublishDetails/AddPublishDetails');
  }

  getPlaylistStatusData() {
    return this._httpService._getMethod("publish_api/api/PublishDetails/GetPlaylstStatusData");
  }

  removePublishDetails(data: any) {
    return this._httpService._postMethod(data, "publish_api/api/PublishDetails/DeletePlaylist");
  }
  getPublishStatusData(vmsid?: number) {
    if (vmsid != undefined && vmsid != null)
      return this._httpService._getMethod("publish_api/api/PublishDetails/GetPublishStatusData?vmsid=" + vmsid);
    else
      return this._httpService._getMethod("publish_api/api/PublishDetails/GetPublishStatusData");
  }
}
