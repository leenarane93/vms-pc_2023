import { Component, ElementRef, EventEmitter, Injectable, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct, NgbTimeStruct, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Stepper from 'bs-stepper';
import * as $ from 'jquery';
import { Globals } from 'src/app/utils/global';
import { getErrorMsg } from 'src/app/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { MediaFacadeService } from 'src/app/facade/facade_services/media-facade.service';
import { MediaDetails, MediaDuration, PlBlMdDetails, PlaylistMaster } from 'src/app/models/media/PlaylistMaster';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';
  active = 1;
  activeNav: number = 1;
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}
@Component({
  selector: 'app-playlist-configure',
  templateUrl: './playlist-configure.component.html',
  styleUrls: ['./playlist-configure.component.css']
})
export class PlaylistConfigureComponent {
  tarrifDetails: any[] = [];
  partyDetails: any[] = [];
  @ViewChild("table", { static: false }) table: any;
  plid: number = 0;
  seqData: any[] = [];
  dataSource: MediaDetails[];
  plBlData: any[] = [];
  searchText: string = "";
  alignlist: any = [];
  nodeLeft: number;
  nodeTop: number;
  nodeHeight: number;
  nodeWidth: number;
  widthtxt: number = 500;
  currentBlock: any;
  heighttxt: number = 500;
  nodeDetails: any = [
    {
      id: 1,
      width: 50,
      height: 50,
      maxheight: 0,
      maxWidth: 0,
      left: 0,
      top: 0,
      selected: false,
    },
  ];
  isCollide: boolean = false;
  active = 1;
  submitted = false;
  isCompleted = false;
  model2!: string;
  model3!: string;
  blockNo: number = 1;
  time: NgbTimeStruct = { hour: 24, minute: 0, second: 0 };
  time2: NgbTimeStruct = { hour: 24, minute: 0, second: 0 };
  seconds = true;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  //   selectedItems:Array<any> = [];
  dropdownSettings: IDropdownSettings = {};
  zones: Array<any> = [];
  vms: Array<any> = [];
  url: any;
  clicked = false;
  undoClicked = false; isView: boolean = false; isCopy: boolean = false;
  // appendedHtml: string = '<div><b>this appended html</b></div>';
  @ViewChild('resizeDragDiv') div!: ElementRef<HTMLDivElement>;
  @ViewChild('resizeDragDiv2') div2!: ElementRef<HTMLDivElement>;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true,
  };
  stepper: Stepper;
  inBounds = true;
  mainTextDetails: any[] = [];
  mainMediaDetails: any[] = [];
  textDetails: any[] = [];
  mediaDetails: any[] = [];
  selectedMedia: any[] = [];
  constructor(public activeModal: NgbActiveModal,
    public router: Router,
    private ngbCalendar: NgbCalendar,
    private renderer: Renderer2,
    private dateAdapter: NgbDateAdapter<string>,
    private config: NgbTimepickerConfig,
    private fb: FormBuilder,
    private global: Globals,
    private toast: ToastrService,
    private _media: MediaFacadeService
  ) { config.seconds = true; config.spinners = false; this.global.CurrentPage = "Playlist Configuration" }

  name = 'Angular';

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }
  position: any;


  newPosition(event: any) {
    console.log(event);
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const element = event.currentTarget;

    // const x = event.pageX - boundingRect.left;
    const x = element.offsetLeft;
    const y = element.offsetTop;

    this.position = "(" + x + ", " + y + ")";
    console.log(boundingRect);
  }
  getErrorMessage(_controlName: any, _controlLable: any, _isPattern: boolean = false, _msg: string) {
    return getErrorMsg(this.form, _controlName, _controlLable, _isPattern, _msg);
  }
  get f() { return this.form.controls; }
  ngOnInit() {
    this.form = this.fb.group({
      playlistName: ['', Validators.required],
      height: ['', Validators.required],
      width: ['', Validators.required]
    });

    this.stepper = new Stepper(document.querySelector('#stepper1') as HTMLElement, {
      linear: false,
      animation: true
    });

    this.GetTarrifDetails();
    this.GetPartyDetails();
  }
  StepNext(step: number) {
    if (step == 0) {
      if (this.ValidationCheck(0)) {
        this.heighttxt = this.form.controls["height"].value;
        this.widthtxt = this.form.controls["width"].value;
        var _master = new PlaylistMaster();
        _master.id = 0;
        _master.isActive = true;
        _master.createdBy = this.global.UserCode;
        _master.height = this.form.controls["height"].value;
        _master.width = this.form.controls["width"].value;
        _master.playlistName = this.form.controls["playlistName"].value;
        _master.status = 0;
        this.nodeHeight = 50;
        this.nodeWidth = 50;
        this.nodeTop = 0;
        this.nodeLeft = 0;
        this.nodeDetails[0].maxheight = this.heighttxt;
        this.nodeDetails[0].maxWidth = this.widthtxt;
        this.nodeDetails[0].height = 50;
        this.nodeDetails[0].width = 50;
        // this._media.addPlaylistMaster(_master).subscribe(res=>{
        //   if(res != null && res != 0) {
        //     this.toast.success("Saved Successfully");
        //     this.form.reset();
        //     this.plid = res;
        //     //this.router.navigate(['medias/playlist-creation']);
        //   } else {
        //     this.toast.error("An error occured while processing your request.","Error",{positionClass:"toast-botton-right"});
        //   }
        // })
        this.stepper.next();
      }
    }
    else if (step == 1) {
      this.getMediaDetails();
      this.stepper.next();
    }
    else if (step == 2) {
      if (this.selectedMedia.length > 0) {
        this.stepper.next();
        this.dataSource = this.selectedMedia;
        console.log(this.dataSource);
      }
      else
        this.toast.error("Media not selected", "Error", { positionClass: "toast-bottom-right" });
    }
  }

  ValidationCheck(step: number) {
    if (step == 0) {
      let val = this.form.controls["playlistName"].value;
      let height = this.form.controls["height"].value;
      let width = this.form.controls["width"].value;
      if (val.trim() == "" || val == undefined) {
        this.toast.error("Invalid data in Playlist Name", "Error", { positionClass: "toast-bottom-right" });
        return false;
      }
      else if (height < 50 || width < 50) {
        this.toast.error("Height and Width values should be more than 50.", "Error", { positionClass: "toast-bottom-right" });
        return false;
      }
    }
    return true;
  }
  appendBlock() { }
  undoBlock() { }
  prev() {

  }
  BackToList() { }
  ResetForm(step: number) {

  }
  addNewBlock() {
    var maxId = Math.max.apply(
      Math,
      this.nodeDetails.map(function (o: any) {
        return o.id;
      })
    );
    var nextid = maxId + 1;
    if (nextid != 0) {
      var left = 0;
      var top = 0;
      if (this.nodeDetails[nextid - 2].width < this.widthtxt - 50)
        left = this.nodeDetails[nextid - 2].width;
      else left = 0;
      if (this.nodeDetails[nextid - 2].height < this.heighttxt - 50)
        top = this.nodeDetails[nextid - 2].height;
      else top = 0;
      let nd = {
        id: nextid,
        width: 50,
        height: 50,
        maxheight: this.heighttxt,
        maxWidth: this.widthtxt,
        left: 0,
        top: 0,
      };
      this.nodeDetails.push(nd);
    }

    this.currentBlock = this.currentBlock + 1;
    this.manageAllignment();
  }

  manageAllignment() {
    var collidal = 0;
    if (this.nodeDetails.length > 1) {
      for (var i = 0; i < this.nodeDetails.length; i++) {
        var _currDv = this.nodeDetails[i];
        var _currHt = _currDv.height;
        var _currWt = _currDv.width;
        var _currLeft = _currDv.left;
        var _currTop = _currDv.top;
        var _currDistFromTop = _currTop + _currHt;
        var _currDistFromLeft = _currLeft + _currWt;
        for (var j = 0; j < this.nodeDetails.length; j++) {
          var _destDistFromTop =
            this.nodeDetails[j].top + this.nodeDetails[j].height;
          var _destDistFromLeft =
            this.nodeDetails[j].left + this.nodeDetails[j].width;

          if (this.nodeDetails[i].id != this.nodeDetails[j].id) {
            if (
              _currDistFromTop < this.nodeDetails[j].top ||
              _currTop > _destDistFromTop ||
              _currDistFromLeft < this.nodeDetails[j].left ||
              _currLeft > _destDistFromLeft
            ) {
              collidal = 1;
            } else {
              collidal = 0;
              break;
            }
          }
        }
        console.log(collidal);
        if (collidal == 0) {
          this.isCollide = true;
          break;
        } else {
          this.isCollide = false;
        }
      }
    }
  }

  //Draggable Div
  onMoving(eve: any, id: number) {
    if (this.isView == true) {
      this.toast.warning("Cannot be edited while in View mode.");
      return false;
    } else {
      this.nodeLeft = eve.x;
      this.nodeTop = eve.y;
      this.nodeDetails.forEach((node: any) => {
        if (node.id == id) {
          if (eve.x < 0) {
            node.left = 0;
            this.nodeLeft = 0;
          } else {
            node.left = eve.x;
            node.top = eve.y;
          }
          if (eve.y < 0) {
            node.top = 0;
            this.nodeTop = 0;
          } else {
            node.left = eve.x;
            node.top = eve.y;
          }
        }
      });
      this.manageAllignment();
      return true;
    }
  }
  //
  //Resiable Div
  onResizing(eve: any, id: number) {
    if (this.isView == true) {
      this.toast.warning("Cannot be edited while in View mode.");
      this.nodeDetails.forEach((node: any) => {
        if (node.id == id) {
          node.height = node.height;
          node.width = node.width;
        }
      });
      return false;
    } else {
      this.nodeHeight = eve.size.height;
      this.nodeWidth = eve.size.width;
      this.nodeDetails.forEach((node: any) => {
        if (node.id == id) {
          node.height = eve.size.height;
          node.width = eve.size.width;
        }
      });
      this.manageAllignment();
      return true;
    }
  }
  //
  tabChange() { }

  getMediaDetails() {
    this._media.getAllMediaDetails().subscribe(res => {
      if (res != null && res.length > 0) {
        this.mainMediaDetails = res;
        this.mediaDetails = res;
        this.getTextDetails();
      }
      else
        this.toast.error("Failed to failed media details.", "Error", { positionClass: "toast-bottom-right" });
    }, (err) => { console.log(err) })
  }
  getTextDetails() {
    this._media.getAllTextDetails().subscribe(res => {
      if (res != null && res.length > 0) {
        this.mainTextDetails = res;
        this.textDetails = res;
      }
      else
        this.toast.error("Failed to failed text details.", "Error", { positionClass: "toast-bottom-right" });
    }, (err) => { console.log(err) })
  }

  Search() {
    let _d: any[] = [];
    this.mainMediaDetails.forEach(ele => {
      if (ele.fileName.includes(this.searchText))
        _d.push(ele);
    });
    this.mediaDetails = _d;

    _d = [];
    this.mainTextDetails.forEach(ele => {
      if (ele.textContent.includes(this.searchText))
        _d.push(ele);
    });
    this.textDetails = _d;
  }

  MediaCheck(_data: any, event: any, type: any) {
    if (type == 0) {
      if (_data.fileType.toLocaleLowerCase() == "video" && event.currentTarget.checked == true) {
        var _mPath = new MediaDuration();
        _mPath.path = _data.filePath;
        this._media.getVideoDuration(_mPath).subscribe(res => {
          _data.duration = Math.round(res);
          this.selectedMedia.push(_data);
        });
      }
      else if (event.currentTarget.checked == false) {
        for (var i = 0; i < this.selectedMedia.length; i++) {
          if (this.selectedMedia[i].id == _data.id)
            this.selectedMedia.splice(i, 1);
        }
      }
      else {
        this.selectedMedia.push(_data);
      }
    }
  }

  dropTable(event: CdkDragDrop<any[]>) {
    var r = 1;//this.FormValidation();
    if (r == 1) {
      const prevIndex = this.selectedMedia.findIndex((d) => d === event.item.data);
      moveItemInArray(this.selectedMedia, prevIndex, event.currentIndex);
      this.table.renderRows();
      var dCurr = this.selectedMedia[event.currentIndex];
      var dPrev = this.selectedMedia[prevIndex];
      var currSeq = this.seqData[event.currentIndex];
      this.changeSequence();
    }
  }
  changeSequence() {
    this.plBlData = [];
    for (var i = 0; i < this.dataSource.length; i++) {
      let _pl = new PlBlMdDetails();
      this.dataSource[i].seqNo = i + 1;
      _pl.blId = this.dataSource[i].block;
      _pl.duration = this.dataSource[i].duration;
      _pl.effectIn = this.dataSource[i].eIn;
      _pl.effectOut = this.dataSource[i].eOut;
      _pl.mdId = this.dataSource[i].id;
      _pl.partyId = this.dataSource[i].party;
      _pl.tarrifId = this.dataSource[i].tarrif;
      _pl.plId = this.plid;
      _pl.sequenceNo = this.dataSource[i].seqNo;
      _pl.mediaName = this.plid + "_" + this.dataSource[i].seqNo + ".avi";
      this.plBlData.push(_pl);
    }
  }

  GetTarrifDetails() {
    let _data = { "currentPage": "0", "pageSize": "0", "startId": "0", "searchItem": null };
    this._media.getTarrifData(_data).subscribe(res => {
      this.tarrifDetails = res.data;
    });
  }

  GetPartyDetails() {
    let _data = { "currentPage": "0", "pageSize": "0", "startId": "0", "searchItem": null };
    this._media.getPartyData(_data).subscribe(res => {
      this.partyDetails = res.data;
    });
  }
}

