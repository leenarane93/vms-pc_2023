import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(
    private _httpService: HttpService) { }
  getPlaylistData(data: any) {
    return this._httpService._postMethod(data, 'media_api/api/PlaylistMaster/GetPlaylistMaster');
  }
  addPlaylistMaster(data: any) {
    return this._httpService._postMethod(data, 'media_api/api/PlaylistMaster/PostPlaylistMaster');
  }
  getAllMediaDetails(){
    return this._httpService._getMethod("Media_API/api/MediaMaster/GetAllMediaDetailsForBlocks");
  }
  getAllTextDetails(){
    return this._httpService._getMethod("Media_API/api/MediaMaster/GetAllTextDetails");
  }
  GetVideoDurationFromAPI(path:any) {
    return this._httpService._postMethod(path,"User_API/api/User/GetMediaDurationFromUser");
  }
  addPlaylistMedia(data: any,type : number) {
    return this._httpService._postMethod(data, 'Media_API/api/PlaylistMedia/PostPlaylistMedia?type='+type);
  }
}
