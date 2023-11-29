import { Component, ElementRef, HostListener, OnInit, ViewChild, numberAttribute } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonFacadeService } from 'src/app/facade/facade_services/common-facade.service';
import { MediaFacadeService } from 'src/app/facade/facade_services/media-facade.service';
import { InputRequest } from 'src/app/models/request/inputReq';
import { Globals } from 'src/app/utils/global';
import { TooltipPosition } from "../../../utils/tooltip.enums";

@Component({
  selector: 'app-media-upload',
  templateUrl: './media-upload.component.html',
  styleUrls: ['./media-upload.component.css']
})
export class MediaUploadComponent implements OnInit {
  active = 1;
  result: string = '';
  myForm!: FormGroup;
  uploadSetId!: any;
  selectedFiles: any;
  searchText!: string;
  page: any;
  listOfMediaSet: any;
  totalPages: number = 1;
  pager: number = 1;
  totalRecords!: number;
  recordPerPage: number = 10;
  startId!: number;
  closeResult!: string;
  _request: any = new InputRequest();
  @ViewChild('InputVar') InputVar: any;
  //@ViewChild("InputVar", { static: true }) InputVar;
  files: File[] = [];
  TooltipPosition: typeof TooltipPosition = TooltipPosition;
  x = 0;
  y = 0;
  coordinates = "";
  //this is your original recipe name which you had passed from previous page
  headerArr = [
    { "Head": "ID", "FieldName": "id", "type": "number" },
    { "Head": "File Type", "FieldName": "mediaType", "type": "string" },
    { "Head": "Upload Set ID", "FieldName": "uploadSetId", "type": "string" },
    { "Head": "Created Date", "FieldName": "createdDate", "type": "string" },
    { "Head": "Created By", "FieldName": "uploadedBy", "type": "string" },
    { "Head": "File Count", "FieldName": "fileCounts", "type": "number" },
    { "Head": "Status", "FieldName": "status", "type": "number" },
    { "Head": "Remarks", "FieldName": "remarks", "type": "string" },
    { "Head": "Action", "FieldName": "actions", "type": "button" }
  ];
  btnArray: any[] = [{ "name": "View", "icon": "icon-eye", "tip": "Click to View" }, { "name": "Remove", "icon": "icon-trash", "tip": "Click to Remove" }];
  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    private _commonFacade: CommonFacadeService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private _mediaFacade: MediaFacadeService,
    private global: Globals) {
    this.global.CurrentPage = "Media/Text Upload";
  }


  ngOnInit() {
    this.generateUploadSetId();
  }
  tabChange() {
    this.generateUploadSetId();
  }
  generateUploadSetId() {
    var _date = new Date();
    var _dd = _date.getDate().toString();
    var _mm = (_date.getMonth() + 1).toString();
    var _yyyy = _date.getFullYear().toString();
    var _hh = _date.getHours().toString();
    var _min = _date.getMinutes().toString();
    var _ss = _date.getSeconds().toString();
    this.uploadSetId = _dd + _mm + _yyyy + _hh + _min + _ss;
    this.getMediaUploadData();
  }

  save(event: any): void {
    this.selectedFiles = event.target.files;
    this.files = [];
    let files = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;
    console.log("event::::::", event);
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      //if(!this.isFileSelected(file)){
      if (this.Validations()) {
        //      if(this.isImage(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(files[i])
        );
        //      }
        this.files.push(files[i]);
        //  }
      }
      //}
    }
  }
  Validations() {
    let res = true;
    if (this.active == 1) {
      if (this.selectedFiles.length > 0) {
        for (var i = 0; i < this.selectedFiles.length; i++) {
          if (this.selectedFiles[i].type.includes('image') || this.selectedFiles[i].type.includes('video')) {

          }
          else {
            res = false;
            break;
          }
        }
        if (res == false) {
          this.toast.error("Only image/video files are allowed.", "Error", { positionClass: "toast-bottom-right" });
          return res;
        }

      }
      else {
        this.toast.error("Files not selected", "Error", { positionClass: "toast-bottom-right" });
      }

    }
    return res;
  }
  AddMediaUpload() {
    var formData = new FormData();
    formData.append("uploadsetid", this.uploadSetId.toString());
    formData.append("userCode", this.global.UserCode);
    let fileList = this.files;
    for (var i = 0; i < fileList.length; i++) {
      formData.append("files.files", fileList[i]);
    }
    this._mediaFacade.uploadMedia(formData).subscribe(res => {
      if (res != 0 || res != undefined) {
        this.toast.success("Saved Successfully");
        this.Reset(1);
      }
      else {
        this.toast.error("Something went wrong", "Error", { positionClass: "toast-bottom-right" });
      }
    })
  }
  RemoveFile(idx: number) {
    this.selectedFiles.slice(idx, 1);
  }
  RequestSubmit() {
    if (this.Validations()) {
      this.AddMediaUpload();
    }
  }
  onPager(pager: number) {
    this._request.pageSize = this.recordPerPage;
    this.pager = pager;
    this.startId = (this.pager - 1) * this.recordPerPage;
    this.getMediaUploadData();
  }

  onRecordPageChange(recordPerPage: number) {
    this._request.pageSize = recordPerPage;
    this.pager = recordPerPage;
    this.recordPerPage = recordPerPage;
    this.startId = 0;
    this.pager = 1;
    console.log(this.recordPerPage);
    this.getMediaUploadData();
  }

  onPageSearch(search: string) {
    this.searchText = search;
    this.getMediaUploadData();
  }

  OpenModal(content: any) {
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    // });
    this._commonFacade.setSession("ModelShow", null);
    //this.router.navigate(['masters/add-party']);
  }

  SearchWithId(_searchItem: any) {
    this._commonFacade.setSession("ModelShow", JSON.stringify(_searchItem));
    //this.router.navigate(['masters/add-party']);
  }

  getMediaUploadData() {
    this._request.currentPage = this.pager;
    this._request.pageSize = this.recordPerPage;
    this._request.startId = this.startId;
    this._request.searchItem = this.searchText;

    this._mediaFacade.getMediaUploadDetails(this._request).subscribe(res => {
      if (res != null && res != undefined) {
        this.listOfMediaSet = res.data;
      }
    })
  }
  Reset(type: number) {
    this.selectedFiles = [];
    this.InputVar.nativeElement.value = "";
    this.generateUploadSetId();
    if (type == 0) {
    }
    else {
      this.getMediaUploadData();
    }
  }

  // @HostListener('mousemove', ['$event'])
  // onMouseMove($event: MouseEvent): void {
  //   this.x = $event.clientX;
  //   this.y = $event.clientY;
  //   this.coordinates = `${this.x},${this.y}`;
  // }
}
