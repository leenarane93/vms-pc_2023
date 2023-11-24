import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';

@Injectable({
  providedIn: 'root'
})
export class MediaUploadService {
  constructor(private http: HttpClient,
    private _httpService: HttpService,
    private _http: HttpClient) { }

  getuploaddetails(data: any) {
    return this._httpService._postMethod(data, 'media_API/api/MediaMaster/GetMediaUploadDetails');
  }
}