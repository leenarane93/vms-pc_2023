import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonFacadeService } from 'src/app/facade/facade_services/common-facade.service';
import { MediaFacadeService } from 'src/app/facade/facade_services/media-facade.service';
import { InputRequest } from 'src/app/models/request/inputReq';
import { Globals } from 'src/app/utils/global';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CmMdAuditComponent } from 'src/app/widget/cm-md-audit/cm-md-audit.component';
@Component({
  selector: 'app-media-audit',
  templateUrl: './media-audit.component.html',
  styleUrls: ['./media-audit.component.css']
})
export class MediaAuditComponent implements OnInit {
  searchText!: string;
  page: any;
  tabno:number;
  listOfMediaUpload: any;
  listOfMediaUploadPending: any;
  listOfMediaUploadApproved: any;
  listOfMediaUploadRejected: any;
  totalPages: number = 1;
  pager: number = 1;
  totalRecords!: number;
  recordPerPage: number = 10;
  startId!: number;
  closeResult!: string;
  _request: any = new InputRequest();
  headerArr = [
    { "Head": "ID", "FieldName": "id", "type": "number" },
    { "Head": "Upload Set ID", "FieldName": "uploadSetId", "type": "string" },
    { "Head": "Created Date", "FieldName": "createdDate", "type": "string" },
    { "Head": "Uploaded By", "FieldName": "uploadedBy", "type": "string" },
    { "Head": "Audited By", "FieldName": "modifiedBy", "type": "string" },
    { "Head": "Actions", "FieldName": "actions", "type": "button" }
  ];

  btnArray: any[] = [{ "name": "View", "icon": "icon-eye", "tip": "Click to View", "action": "view" }, { "name": "Remove", "icon": "icon-trash", "tip": "Click to Remove", "action": "remove" }];


  constructor(private _commonFacade: CommonFacadeService,
    private global: Globals,
    private _router: Router,
    private mediaFacade: MediaFacadeService,
    public datepipe: DatePipe,
    public modalService: NgbModal) {
    this.global.CurrentPage = "Media Audit";
  }
  ngOnInit(): void {
    this.getMediaDetails();
  }
  getMediaDetails() {
    this._request.currentPage = this.pager;
    this._request.pageSize = this.recordPerPage;
    this._request.startId = this.startId;
    this._request.searchItem = this.searchText;
    this.mediaFacade.getMediaUpload(this._request).subscribe(data => {
      if (data != null) {
        this.listOfMediaUpload = data.data;
        this.listOfMediaUpload.forEach((element: any) => {
          if (element.createdDate != null) {
            var _d = new Date(element.createdDate);
            var _dateStr = this.datepipe.transform(_d, "dd-MM-yyyy HH:mm:ss");
            element.createdDate = _dateStr;
          }
        });
        var _length = data.totalRecords / this.recordPerPage;
        if (_length > Math.floor(_length) && Math.floor(_length) != 0)
          this.totalRecords = this.recordPerPage * (_length);
        else if (Math.floor(_length) == 0)
          this.totalRecords = 10;
        else
          this.totalRecords = data.totalRecords;
        this.totalPages = this.totalRecords / this.pager;
        this.getMediaByStatus(0);
      }
    })
  }

  getMediaByStatus(status: number) {
    if (status == 0) {
      this.listOfMediaUploadPending = this.listOfMediaUpload.filter((x: any) => x.status == 0);
    } else if (status == 1) {
      this.listOfMediaUploadApproved = this.listOfMediaUpload.filter((x: any) => x.status == 1);
    } else if (status == 2) {
      this.listOfMediaUploadRejected = this.listOfMediaUpload.filter((x: any) => x.status == 2);
    }
  }

  OnTabChange(status: number) {
      this.tabno = status
      this.getMediaDetails();
  }

  //Common Functionalities
  onPager(pager: number) {
    this._request.pageSize = this.recordPerPage;
    this.pager = pager;
    this.startId = (this.pager - 1) * this.recordPerPage;
    //this.getPlaylistData();
  }

  onRecordPageChange(recordPerPage: number) {
    this._request.pageSize = recordPerPage;
    this.pager = recordPerPage;
    this.recordPerPage = recordPerPage;
    this.startId = 0;
    this.pager = 1;
    //this.getPlaylistData();
  }

  onPageSearch(search: string) {
    this.searchText = search;
    //this.getPlaylistData();
  }

  SearchWithId(_searchItem: any) {
    this._commonFacade.setSession("ModelShow", JSON.stringify(_searchItem));
    this._router.navigate(['users/add-user']);
  }
  ButtonAction(actiondata: any) {
    if (actiondata.action == "view") {
      const modalRef = this.modalService.open(CmMdAuditComponent, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
      modalRef.componentInstance.data = actiondata.data;
      modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
        this.getMediaDetails();
      })
    }
    else if (actiondata.action == 'remove') {
      this.DeletePlaylist(actiondata.data);
    }
  }

  DeletePlaylist(playlistData: any) {
    // this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to remove this Playlist... ?')
    //   .then((confirmed) => { if (confirmed == true) this.RemovePlaylist(playlistData) })
    //   .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  RemovePlaylist(playlistData: any) {

  }
}
