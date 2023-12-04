import { Injectable } from '@angular/core';
import { MediaUploadService } from '../services/media/media-upload.service';

@Injectable({
  providedIn: 'root'
})
export class MediaFacadeService {

  constructor(private _mediaUploadService: MediaUploadService) { }
  getMediaUploadDetails(data: any) {
    return this._mediaUploadService.getuploaddetails(data);
  }

  uploadMedia(data: any) {
    return this._mediaUploadService.UploadMediaDetails(data);
  }

  getMediaByUsID(data: any) {
    return this._mediaUploadService.getMediaByUploadSetId(data);
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
}
