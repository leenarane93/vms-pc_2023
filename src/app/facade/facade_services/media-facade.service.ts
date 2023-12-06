import { Injectable } from '@angular/core';
import { MediaUploadService } from '../services/media/media-upload.service';
import { PlaylistService } from '../services/media/playlist.service';

@Injectable({
  providedIn: 'root'
})
export class MediaFacadeService {

  constructor(private _mediaUploadService: MediaUploadService,
              private _playlistService:PlaylistService) { }
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

  addPlaylistMaster(data:any) { 
    return this._playlistService.addPlaylistMaster(data);
  }

}
