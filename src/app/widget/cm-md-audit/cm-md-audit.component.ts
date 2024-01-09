import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MediaFacadeService } from 'src/app/facade/facade_services/media-facade.service';
import { MediaDetails } from 'src/app/models/media/Media';
import { MediaUpload } from 'src/app/models/media/MediaUpload';
import { Globals } from 'src/app/utils/global';

@Component({
  selector: 'app-cm-md-audit',
  templateUrl: './cm-md-audit.component.html',
  styleUrls: ['./cm-md-audit.component.css']
})
export class CmMdAuditComponent implements OnInit {
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() data: any;
  @Input() playlistAudit: boolean = false;
  @Input() mediaAudit: boolean = false;
  type: string = "Media Audit";
  medias: any[] = [];
  imgSrc: string;
  isImg: boolean = false;
  isVdo: boolean = false;
  remarks: string;
  vdoUrl: string;
  constructor(private _mediaFacade: MediaFacadeService,
    private _toast: ToastrService,
    private modal: NgbModal,
    private global: Globals) {

  }
  ngOnInit(): void {
    console.log(this.data);
    this.getMediaUploadBySetID();
  }

  getMediaUploadBySetID() {
    this._mediaFacade.getMediaBySetID(this.data.uploadSetId).subscribe(res => {
      if (res != null && res != undefined) {
        this.medias = res;
      }
      else {
        this._toast.error("Something went wrong, Please contact administrator.", "Error", { positionClass: "toast-botton-right" });
      }
    })
  }
  ViewMedia(row: any) {
    var _data = {
      mediaPath: row.filePath,
      mediaType: row.fileType
    }
    this._mediaFacade.getMediaString(_data).subscribe(res => {
      if (res != null && res != undefined) {
        if (row.fileType == "Image") {
          this.isImg = true;
          this.imgSrc = res;
        }
        else {
          this.isVdo = true;
          this.vdoUrl = res;
        }
      }
    })
  }
  Operation(type: number) {
    if (type == 0)//Rejected
    {
      if (this.remarks == undefined || this.remarks == null || this.remarks == "") {
        this._toast.error("Remark is mandatory for this operation.", "Error");
      }
      else {
        this.updateData(2);
      }
    }
    else {
      this.updateData(1);
    }
  }

  updateData(status: number) {
    var data = this.medias.filter(
      (x: any) => x.uploadSetId == this.data.uploadSetId
    );
    let _uploadDetails = new MediaUpload();
    _uploadDetails.createdBy = this.data.uploadedBy;
    _uploadDetails.createdDate = this.data.createdDate;
    _uploadDetails.id = this.data.id;
    _uploadDetails.isDeleted =
      this.data.isDeleted == undefined ||
        this.data.isDeleted == null
        ? false
        : this.data.isDeleted;
    _uploadDetails.modifiedBy = this.global.UserCode;
    _uploadDetails.modifiedDate = new Date();
    _uploadDetails.remarks = this.remarks;
    _uploadDetails.status = status;
    _uploadDetails.uploadSetId = this.data.uploadSetId;
    this._mediaFacade.updateMediaSetDetails(_uploadDetails).subscribe(res => {
      if (res != null && res == 1) {
        this._toast.success("Successfully Updated.", "Success");
        this.passEntry.emit("Success");
        this.modal.dismissAll();
      }
    })
  }
  passBack() {
    this.passEntry.emit("Success");
    this.modal.dismissAll();
  }
  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

}
