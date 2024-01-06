import { Injectable } from '@angular/core';
import { MediaUploadService } from '../services/media/media-upload.service';
import { PlaylistService } from '../services/media/playlist.service';
import { AdminFacadeService } from './admin-facade.service';

@Injectable({
  providedIn: 'root'
})
export class MediaFacadeService {

  constructor(private _mediaUploadService: MediaUploadService,
    private _playlistService: PlaylistService,
    private _adminFacade: AdminFacadeService) { }
  getMediaUploadDetails(data: any) {
    return this._mediaUploadService.getuploaddetails(data);
  }

  uploadMedia(data: any) {
    return this._mediaUploadService.UploadMediaDetails(data);
  }

  getMediaByUsID(data: any) {
    return this._mediaUploadService.getMediaByUploadSetId(data);
  }
  getTextByUsID(data: any) {
    return this._mediaUploadService.getTextUploadDetailsByUploadSetId(data);
  }

  getMediaString(data: any) {
    return this._mediaUploadService.getMediaString(data);
  }
  updateMediaUpload(data: any) {
    return this._mediaUploadService.updateMediaUpload(data);
  }

  getAvailableFont() {
    return this._mediaUploadService.getSystemFont();
  }
  addTextDetails(data: any) {
    return this._mediaUploadService.addTextDetails(data);
  }

  addPlaylistMaster(data: any) {
    return this._playlistService.addPlaylistMaster(data);
  }
  updatePlaylistMaster(data: any) {
    return this._playlistService.updatePlaylistMaster(data);
  }
  getAllMediaDetails() {
    return this._playlistService.getAllMediaDetails();
  }
  getAllTextDetails() {
    return this._playlistService.getAllTextDetails();
  }
  getVideoDuration(data: any) {
    return this._playlistService.GetVideoDurationFromAPI(data);
  }

  getPartyData(data: any) {
    return this._adminFacade.getParties(data);
  }
  getTarrifData(data: any) {
    return this._adminFacade.getTarrifs(data);
  }
  addPlaylistMedia(data: any,type :number) {
    return this._playlistService.addPlaylistMedia(data,type);
  }
  addBlockDetails(data: any) {
    return this._playlistService.AddBlockDetails(data);
  }
  getBlockDetailsByPlID(plid:number){
    return this._playlistService.GetBlockDetailsByPlid(plid);
  }
  getSelectedMedia(plid:number){
    return this._playlistService.GetSelectedMediaData(plid);
  }
  getSelectedText(plid:number){
    return this._playlistService.GetSelectedTextData(plid);
  }
  getPlBlData(plid:number){
    return this._playlistService.GetPlBlData(plid);
  }
}
