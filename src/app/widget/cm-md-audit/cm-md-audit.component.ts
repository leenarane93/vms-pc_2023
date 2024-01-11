import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MediaFacadeService } from 'src/app/facade/facade_services/media-facade.service';
import { MediaDetails } from 'src/app/models/media/Media';
import { MediaUpload } from 'src/app/models/media/MediaUpload';
import { Globals } from 'src/app/utils/global';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { BlData, PlaylistAuditMedias } from 'src/app/models/media/PlAudit';

@Component({
  selector: 'app-cm-md-audit',
  templateUrl: './cm-md-audit.component.html',
  styleUrls: ['./cm-md-audit.component.css']
})
export class CmMdAuditComponent implements OnInit {
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() data: any;
  playlistData:any;
  @Input() playlistAudit: boolean = false;
  @Input() mediaAudit: boolean = false;
  screenHeight: number;
  screenWidth: number;
  type: string = "Media Audit";
  medias: any[] = [];
  imgSrc: string;
  isImg: boolean = false;
  isVdo: boolean = true;
  remarks: string;
  vdoUrl: string;
  api: VgApiService;
  videoItems: any[] = [];
  plName: string = "";
  blocks: any;
  activeIndex = 0;
  currentVideo = this.videoItems[this.activeIndex];

  constructor(private _mediaFacade: MediaFacadeService,
    private _toast: ToastrService,
    private modal: NgbModal,
    private global: Globals) {

  }
  ngOnInit(): void {
    if (this.mediaAudit)
      this.getMediaUploadBySetID();
    else if (this.playlistAudit) {
      this.getMediaListBlockWise(this.data.blocks);
      this.plName = this.data.plMaster.playlistName;
      this.playlistData = this.data;
    }
  }
  getMediaListBlockWise(blocks: any) {
    this.blocks = blocks;
    this.isVdo = true;
    this._mediaFacade.GetMediaBlockWise(this.data.plMaster.id).subscribe(res => {
      if (res != null) {
        console.log(res);
        for (var i = 0; i < blocks.length; i++) {
          if ((blocks[i].blId = res[i].blId)) {
            blocks[i].src = res[i].medias[0].mediaPath;
          }
        }
      }
    })
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
    if (this.playlistAudit) {
      this.UpdatePlaylistMaster(status);
    }
    else {
      this.UpdateUploadSet(status);
    }
  }
  passBack() {
    this.passEntry.emit("Success");
    this.modal.dismissAll();
  }
  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

  //Video Player 
  videoPlayerInit(data: any) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }
  nextVideo() {
    this.activeIndex++;
    if (this.activeIndex === this.videoItems.length) {
      this.activeIndex = 0;
    }
    this.currentVideo = this.videoItems[this.activeIndex];
  }
  initVdo() {
    this.data.play();
  }
  startPlaylistVdo(item: any, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }

  UpdatePlaylistMaster(status: number) {
    if (status == 1) {
      this.playlistData.plMaster.modifiedBy = this.global.UserCode;
      this.playlistData.plMaster.status = 3;
      this.playlistData.plMaster.remarks = this.remarks;
    } else if (status == 2) {
      this.playlistData.plMaster.modifiedBy = this.global.UserCode;
      this.playlistData.plMaster.status = 4;
      this.playlistData.plMaster.remarks = this.remarks;
    }
    this._mediaFacade.updatePlaylistMaster(this.playlistData.plMaster).subscribe(
      (res:any) => {
        if (res != null) {
          this._toast.success("Playlist updated successfully");
          this.passBack();
        } else {
          this._toast.error("Something went wrong");
        }
      },
      (err) => {
        console.log(err);
        this._toast.error(
          "An error occured while processong your request, please contact system administrator."
        );
      }
    );
  }

  UpdateUploadSet(status: number) {
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
}
