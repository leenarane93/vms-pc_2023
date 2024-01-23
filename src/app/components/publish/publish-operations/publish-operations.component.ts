import { Component, Injector, Input, OnInit, ViewChild, inject } from '@angular/core';

import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { PublishFacadeService } from 'src/app/facade/facade_services/publish-facade.service';
import { CommonSelectList } from 'src/app/models/common/cmSelectList';
import { InputRequest } from 'src/app/models/request/inputReq';
import { Globals } from 'src/app/utils/global';
import { NgbTimeStruct, NgbDateStruct, NgbPopoverConfig, NgbPopover, NgbDatepicker, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'rxjs';
import { FormBuilder, NgControl, Validators } from '@angular/forms';
import { DateTimeModel } from 'src/app/models/DateTimeModel';
import { PublishMaster } from 'src/app/models/publish/publishmaster';

@Component({
  selector: 'app-publish-operations',
  templateUrl: './publish-operations.component.html',
  styleUrls: ['./publish-operations.component.css']
})
export class PublishOperationsComponent implements OnInit {
  today = inject(NgbCalendar).getToday();
  minDate: any;
  maxDate: any;
  model: NgbDateStruct;
  date: { year: number; month: number };
  stepper: Stepper;
  searchText: string;
  _request: any = new InputRequest();
  _inputVmsData: any;
  _inputZoneData: any;
  $zones: any;
  totalPages: number = 1;
  pager: number = 1;
  totalRecords!: number;
  recordPerPage: number = 10;
  startId!: number;
  label1: string;
  label2: string = "Select Controller";
  dropdownSettings: any;
  dropdownSettingsVms: any;
  _common: CommonSelectList;
  selectedZones: any[] = [];
  selectedVMS: any[] = [];
  playlistList: any[] = [];
  selectedPlaylist: any[] = [];
  filteredPlaylist: any[] = [];
  selectedDate: any;
  ngControl: any;
  publishMaster: any[] = [];
  form: any;
  headerArr = [
    { "Head": "ID", "FieldName": "id", "type": "number" },
    { "Head": "Playlist Name", "FieldName": "playlistName", "type": "string" },
    { "Head": "Selection", "FieldName": "checkbox", "type": "checkbox" }
  ];
  fromTimeArr = {
    "inputDatetimeFormat": "dd-MM-yyyy HH:mm:ss",
    "yearDisabled": false,
    "monthDisabled": true,
    "dayDisabled": true,
    "timeDisabled": true
  }

  constructor(private global: Globals,
    private _publish: PublishFacadeService,
    private _toast: ToastrService,
    private config: NgbPopoverConfig,
    private inj: Injector,
    private fb: FormBuilder
  ) {
    this.global.CurrentPage = "Publish Operations";
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    this.dropdownSettingsVms = {
      singleSelection: false,
      idField: 'value',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    config.autoClose = 'outside';
    config.placement = 'auto';

    this.form = this.fb.group({
      playlist: this.fb.array([])
    })
  }
  getErrorMessage(_controlName: any, _controlLable: any, _isPattern: boolean = false, _msg: string) {
    //return getErrorMsg(this.form, _controlName, _controlLable, _isPattern, _msg);
  }
  addPlaylist(plid:number) {
    
  }
  BackToList() { }
  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#stepper1') as HTMLElement, {
      linear: false,
      animation: true
    });
    this.GetAllZoneDetails();
    let _date = new Date();
    let _day = _date.getUTCDate();
    let _mon = _date.getMonth() + 1;
    let _year = _date.getFullYear();
    this.minDate = {
      year: _year,
      month: _mon,
      day: _day
    }
  }

  GetAllZoneDetails() {
    this.label1 = "Select Zone";
    this._request.currentPage = this.pager;
    this._request.pageSize = this.recordPerPage;
    this._request.startId = this.startId;
    this._request.searchItem = "";
    this._publish.getZonesForPublish(this._request).subscribe(res => {
      if (res != null && res.data.length > 0) {
        this.$zones = res.data;
        let commonList: CommonSelectList[] = [];
        this.$zones.forEach((ele: any) => {
          var _commonSelect = new CommonSelectList();
          _commonSelect.displayName = ele.zoneName;
          _commonSelect.value = ele.id;
          commonList.push(_commonSelect);
        });
        let _data = {
          data: commonList,
          disabled: false
        }
        this._inputZoneData = _data;
      } else {
        this._toast.error("An error occured while receiving data, please contact system administrator.")
      }
    })
  }

  getSelectedZone(eve: any, type: number) {
    if (type == 1) {
      if (eve.length > 0) {
        eve.forEach((ele: any) => {
          this.selectedZones.push(ele.value);
        });
      }
      else {
        this.selectedZones.push(eve.value);
      }
    }
    else {
      if (this.selectedZones.length > 0) {
        var _idx = 0;
        this.selectedZones.forEach(element => {
          _idx++;
          if (element == eve.value)
            this.selectedZones.splice(_idx - 1, 1);
        });
      }
      this._inputVmsData = [];
    }
    this._publish.getVmsDetailsByZone(this.selectedZones).subscribe(res => {
      if (res != null && res.length > 0) {
        let commonList: CommonSelectList[] = [];
        res.forEach((ele: any) => {
          var _commonSelect = new CommonSelectList();
          _commonSelect.displayName = ele.description;
          _commonSelect.value = ele.vmsId;
          commonList.push(_commonSelect);
        });
        let _data = {
          data: commonList,
          disabled: false
        }
        this._inputVmsData = _data;
      }
    })
  }

  getSelectedVms(eve: any, type: number) {
    if (type == 1) {
      if (eve.length > 0) {
        eve.forEach((ele: any) => {

          this.selectedVMS.push(ele.value);
        });
      }
      else
        this.selectedVMS.push(eve.value);
    }
    else {
      if (this.selectedVMS.length > 0) {
        var _idx = 0;
        this.selectedVMS.forEach(element => {
          _idx++;
          if (element == eve.value)
            this.selectedVMS.splice(_idx - 1, 1);
        });
      }
    }
  }
  StepPrev(step: number) {
    if (step == 2) {
      this._publish.getPlaylistMasterData().subscribe(res => {
        if (res != null && res.length > 0) {
          this.playlistList = res;
          this.filteredPlaylist = res;
        }
        else {
          this._toast.error("Something went wrong");
        }
      })
    }
    this.stepper.to(step);
  }
  StepNext(step: number) {
    if (step == 1) {
      if (this.stepperValidation(step)) {
        this._publish.getPlaylistMasterData().subscribe(res => {
          if (res != null && res.length > 0) {
            this.playlistList = res;
            this.filteredPlaylist = res;
          }
          else {
            this._toast.error("Something went wrong");
          }
        })
        this.selectedPlaylist = [];
        this.stepper.next();
      }
    }
    else if (step == 2) {
      if (this.selectedPlaylist.length == 0)
        this._toast.error("Please select playlist.");
      else
        this.stepper.next();
    }
  }
  stepperValidation(step: number) {
    if (step == 1) {
      if (this.selectedZones.length == 0) {
        this._toast.error("Please select zone");
        return false;
      }
      else if (this.selectedVMS.length == 0) {
        this._toast.error("Please select controller(VMS)");
        return false;
      }
      else
        return true;
    }
    else
      return false;
  }

  //Table 
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
    this.filteredPlaylist = [];
    this.playlistList.forEach(element => {
      if (element.playlistName.includes(search)) {
        this.filteredPlaylist.push(element);
      }
    });
  }

  checked(_data: any, type: number) {
    if (type == 1) {
      this.selectedPlaylist.push(_data);
    }
    else {
      var idx = this.selectedPlaylist.find(x => x.id == _data.id);
      this.selectedPlaylist.splice(idx, 1);
    }
  }

  ValidateAndSubmit() {

  }
  GetTime(eve: any, type: number) {
    let _publish = new PublishMaster;
    let _date = new Date();
    var _day = eve.controls["selectedDayG"].value;
    var _month = eve.controls["selectedMonthG"].value;
    var _year = eve.controls["selectedYearG"].value;
    var _time = eve.controls["selectedTimeG"].value;
    if (_date.getUTCDate() >= _day && (_date.getMonth() + 1) >= _month && _date.getFullYear() >= _year) {
      if (type == 0) {
        _publish.createdby = this.global.UserCode;
        _publish.id = 0;
        _publish.fromtime = _year + "-" + _month + "-" + _day + " " + _time;
        _publish.isactive = true;
      }
      else if (type == 1) {
        _publish.totime = _year + "-" + _month + "-" + _day + " " + _time;
        let _fromDate = new Date(_publish.fromtime);
        let _toDate = new Date(_publish.fromtime);
        if (_fromDate >= _toDate) {
          this._toast.error("Invalid date selected.");
        }
      }
    }
  }
}
