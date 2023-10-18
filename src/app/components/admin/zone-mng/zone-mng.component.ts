import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdminFacadeService } from 'src/app/facade/facade_services/admin-facade.service';
import { InputRequest } from 'src/app/models/request/inputReq';
import { Globals } from 'src/app/utils/global';

export type eventModel = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-zone-mng',
  templateUrl: './zone-mng.component.html',
  styleUrls: ['./zone-mng.component.css']
})
export class ZoneMngComponent {
  title = 'angular13';
  searchText = "";
  page: any;
  listOfZones: any;
  totalPages: number = 1;
  pager: number = 5;
  totalRecords!: number;
  startId!: number;
  _request: any = new InputRequest();
  constructor(private adminFacade: AdminFacadeService,
    private global: Globals) {
    this.global.CurrentPage = "Zone Management";
    this.pager = 5;
    this.totalRecords = 0;
    this.getZones(0, this.pager, 0);
  }

  headerArr = [
    { "Head": "ID", "FieldName": "id", "type": "number" },
    { "Head": "Zone Name", "FieldName": "zoneName", "type": "string" },
    { "Head": "Description", "FieldName": "description", "type": "string" },
    { "Head": "Status", "FieldName": "isActive", "type": "boolean" }
  ];
  getZones(current_page: any, page_size: any, start_id: any) {
    this._request.currentPage = current_page;
    this._request.pageSize = this.pager;
    this._request.startId = start_id;
    //get request from web api
    this.adminFacade.getZones(this._request).subscribe(data => {
      console.log(data);
      this.listOfZones = data.data;
      if (this.listOfZones != null && this.listOfZones != undefined) {
        this.totalRecords = data.totalRecords;
        this.totalPages = this.totalRecords / this.pager;
      }
    }, error => console.error(error));
  }

  onPager(pager: number) {
    this._request.pageSize = pager;
    this.pager = pager;
    this.getZones(0, this.pager, 0);
  }
}
