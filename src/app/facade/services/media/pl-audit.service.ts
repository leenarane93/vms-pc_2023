import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';
@Injectable({
  providedIn: 'root'
})
export class PlAuditService {
  
  constructor(private http: HttpClient,
    private _httpService: HttpService,
    private _http: HttpClient) { }
    
    updatePlaylistData(body:any){
      return this._httpService._postMethod(body,"Media_API/api/PlaylistMaster/UpdatePlaylistMaster");
    }
}
