import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MediaFacadeService } from 'src/app/facade/facade_services/media-facade.service';

@Component({
  selector: 'app-cm-media-modal',
  templateUrl: './cm-media-modal.component.html',
  styleUrls: ['./cm-media-modal.component.css']
})
export class CmMediaModalComponent implements OnInit {

  @Input() data: any;
  type: string = "Media Upload";
  constructor(private _mediaFacade: MediaFacadeService,
    private _toast: ToastrService) {

  }
  ngOnInit() {
    if (this.data.modalType == "mediaupload") {
      let _uploadSetId = this.data.uploadSetId;
      this._mediaFacade.getMediaByUsID(_uploadSetId).subscribe(res => {
        if (res == undefined || res == null)
          this._toast.error("Something is wrong, Please contact sytem administration", "Error", { positionClass: "toast-right-bottom" });
        else if (res.length == 0)
          this._toast.error("No active media found against Upload Set ID : " + _uploadSetId, "Error", { positionClass: "toast-right-bottom" });
        else {

        }
      })
    }
  }


} 
