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
}
