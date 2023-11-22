import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { CommonFacadeService } from 'src/app/facade/facade_services/common-facade.service';
import { InputRequest } from 'src/app/models/request/inputReq';
import { Globals } from 'src/app/utils/global';

@Component({
  selector: 'app-playlist-creation',
  templateUrl: './playlist-creation.component.html',
  styleUrls: ['./playlist-creation.component.css']
})
export class PlaylistCreationComponent {
  headerArr = [
    { "Head": "ID", "FieldName": "id", "type": "number" },
    { "Head": "Playlist Name", "FieldName": "playlistName", "type": "string" },
    { "Head": "Height", "FieldName": "userLName", "type": "string" },
    { "Head": "Width", "FieldName": "username", "type": "string" },
    { "Head": "Uploaded By", "FieldName": "roleId", "type": "string" },
    { "Head": "Audited By", "FieldName": "roleId", "type": "string" },
    { "Head": "Status", "FieldName": "isActive", "type": "boolean" },
    { "Head": "Actions", "FieldName": "", "type": "button", "content": [{ "name": "View", "icon": "icon-eye" }, { "name": "Remove", "icon": "icon-trash" }, { "name": "Copy", "icon": "fa fa-copy" },] },
  ];
  
  searchText!: string;
  page: any;
  listOfPlaylist: any;
  totalPages: number = 1;
  pager: number = 1;
  totalRecords!: number;
  recordPerPage: number = 10;
  startId!: number;
  closeResult!: string;
  _request: any = new InputRequest();


  constructor(private global: Globals,
    public modalService: NgbModal,
    public _commonFacade:CommonFacadeService,
    public _router:Router) {
    this.global.CurrentPage = "Playlist Creation";
    this.pager = 1;
    this.totalRecords = 0;
    this.getPlaylistData();
  }
  ngOnInit(): void {

  }
  getPlaylistData() {

  }
  onPager(pager: number) {
    this._request.pageSize = this.recordPerPage;
    this.pager = pager;
    this.startId = (this.pager - 1) * this.recordPerPage;
    this.getPlaylistData();
  }

  onRecordPageChange(recordPerPage: number) {
    this._request.pageSize = recordPerPage;
    this.pager = recordPerPage;
    this.recordPerPage = recordPerPage;
    this.startId = 0;
    this.pager = 1;
    this.getPlaylistData();
  }

  onPageSearch(search: string) {
    this.searchText = search;
    this.getPlaylistData();
  }

  OpenModal(content: any) {
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    // });
    this._commonFacade.setSession("ModelShow", null);
    this._router.navigate(['users/add-user']);
  }

  SearchWithId(_searchItem: any) {
    this._commonFacade.setSession("ModelShow", JSON.stringify(_searchItem));
    this._router.navigate(['users/add-user']);
  }
}
