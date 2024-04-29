import { Component, Injector, Input, OnInit, ViewChild, inject } from '@angular/core';

import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { PublishFacadeService } from 'src/app/facade/facade_services/publish-facade.service';
import { CommonSelectList } from 'src/app/models/common/cmSelectList';
import { InputRequest } from 'src/app/models/request/inputReq';
import { Globals } from 'src/app/utils/global';
import { NgbTimeStruct, NgbDateStruct, NgbPopoverConfig, NgbPopover, NgbDatepicker, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { DateTimeModel } from 'src/app/models/DateTimeModel';
import { PublishMaster } from 'src/app/models/publish/publishmaster';
import { publishDetails, publishTime } from 'src/app/models/publish/PublishDetails';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-publish-operations',
  templateUrl: './publish-operations.component.html',
  styleUrls: ['./publish-operations.component.css']
})
export class PublishOperationsComponent implements OnInit {
  _currentIndex : number = 0;
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
  selectedTime: any;
  selectedZones: any[] = [];
  selectedVMS: any[] = [];
  playlistList: any[] = [];
  selectedPlaylist: any[] = [];
  filteredPlaylist: any[] = [];
  selectedDate: any;
  ngControl: any;
  publishMaster: any[] = [];
  form: any;
  items: any;
  globalFrom: any;
  globalTo: any;
  _publishMaster: any;
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
    private fb: FormBuilder,
    private router: Router
  ) {
    this.global.CurrentPage = "Publish Operations";
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'DeSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    this.dropdownSettingsVms = {
      singleSelection: false,
      idField: 'value',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'DeSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    config.autoClose = 'outside';
    config.placement = 'auto';

    this.form = this.fb.group({
      items: this.fb.array([])
    })
  }
  createItem(): FormGroup {
    return this.fb.group({
      playlistName: [{ value: '', disabled: true }],
      plid: '',
      fromDate: '',
      toDate: '',
      fromTime: '',
      toTime: ''
    });
  }
  getErrorMessage(_controlName: any, _controlLable: any, _isPattern: boolean = false, _msg: string) {
    //return getErrorMsg(this.form, _controlName, _controlLable, _isPattern, _msg);
  }
  addPlaylist(plid: number) {

  }
  resetStepper() {
    // this.playlistList = [];
    // this.filteredPlaylist= [];
    // this._currentIndex = 0;
    // // this.GetAllZoneDetails();
    // this.selectedPlaylist = [];
    this.stepper.to(1);
  }
  BackToList(type: number) {
    // if (type == 0) {
    //   this.router.navigate(['publish/media-status']);
    // } else if (type == 1) {
    //   this.resetStepper();
    // }
    let objToSend: NavigationExtras = {
      queryParams : {
        isReset : true
      }
    }
    this.router.navigate(['publish/media-status'],{state:{isReset : objToSend}});
  }
  BuildForm() {

  }
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
          _commonSelect.value = ele.id;
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
    this._currentIndex = step -1;
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
        this._currentIndex = step;
      }
    }
    else if (step == 2) {
      if (this.selectedPlaylist.length == 0)
        this._toast.error("Please select playlist.");
      else {
        this.items = this.form.get('items') as FormArray;
        var _itemLen = this.items.length;
        var len = this.selectedPlaylist.length;
        for (var i = 0; i < len; i++) {
          if (i > _itemLen - 1)
            this.items.push(this.createItem());
        }
        _itemLen = this.items.length;
        for (var j = 0; j < _itemLen; j++) {
          this.items.at(j).patchValue({
            plid: this.selectedPlaylist[j].id,
            playlistName: this.selectedPlaylist[j].playlistName
          });
        }
        this.stepper.next();
        this._currentIndex = step;
      }
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
    try {
      let hasError: boolean = false;
      var _pubTime = new publishDetails();
      _pubTime.zones = this.selectedZones;
      _pubTime.vms = this.selectedVMS;
      _pubTime.username = this.global.UserCode;
      if (this._publishMaster == undefined || this._publishMaster.length > 0) {
        hasError = true;
        this._toast.error("Invalid data found in Publish From Date/ Publish To Date", "Error");
      }
      else if (this._publishMaster.fromtime != undefined)
        _pubTime.pubFrom = this._publishMaster.fromtime;
      else {
        this._toast.error("Invalid data in Publish From Date", "Error");
        hasError = true;
      }
      if (this._publishMaster.totime != undefined)
        _pubTime.pubTo = this._publishMaster.totime;
      else {
        this._toast.error("Invalid data in Publish To Date", "Error");
        hasError = true;
      }
      if (!hasError) {
        var _currentTime = new Date();
        let _playTime: publishTime[] = [];
        if (this.form.value.items.length > 0) {
          var seq = 0;
          let valid: boolean = false;
          for (var i = 0; i < this.form.value.items.length; i++) {
            seq++;
            let _play = new publishTime();
            _play.sequence = seq;
            _play.plId = this.form.value.items[i].plid;
            _play.endDate = "" + this.form.value.items[i].toDate.year + "-" + ("0" + this.form.value.items[i].toDate.month).slice(-2) + "-" + ("0" + this.form.value.items[i].toDate.day).slice(-2) + " " + ("0" + this.form.value.items[i].toTime.hour).slice(-2) + ":" + ("0" + this.form.value.items[i].toTime.minute).slice(-2) + ":" + ("0" + this.form.value.items[i].toTime.second).slice(-2) + "";
            _play.startDate = "" + this.form.value.items[i].fromDate.year + "-" + ("0" + this.form.value.items[i].fromDate.month).slice(-2) + "-" + ("0" + this.form.value.items[i].fromDate.day).slice(-2) + " " + ("0" + this.form.value.items[i].fromTime.hour).slice(-2) + ":" + ("0" + this.form.value.items[i].fromTime.minute).slice(-2) + ":" + ("0" + this.form.value.items[i].fromTime.second).slice(-2) + "";
            _play.startTime = "" + this.form.value.items[i].fromDate.year + "-" + ("0" + this.form.value.items[i].fromDate.month).slice(-2) + "-" + ("0" + this.form.value.items[i].fromDate.day).slice(-2) + " " + ("0" + this.form.value.items[i].fromTime.hour).slice(-2) + ":" + ("0" + this.form.value.items[i].fromTime.minute).slice(-2) + ":" + ("0" + this.form.value.items[i].fromTime.second).slice(-2) + "";
            _play.endTime = "" + this.form.value.items[i].toDate.year + "-" + ("0" + this.form.value.items[i].toDate.month).slice(-2) + "-" + ("0" + this.form.value.items[i].toDate.day).slice(-2) + " " + ("0" + this.form.value.items[i].toTime.hour).slice(-2) + ":" + ("0" + this.form.value.items[i].toTime.minute).slice(-2) + ":" + ("0" + this.form.value.items[i].toTime.second).slice(-2) + "";
            if (_currentTime.getHours() == this.form.value.items[i].fromTime.hour && _currentTime.getMinutes() > this.form.value.items[i].fromTime.minute) {
              _playTime.push(_play);
              valid = true;
            } else if (_currentTime.getHours() > this.form.value.items[i].fromTime.hour) {
              valid = false;
              break;
            } else {
              _playTime.push(_play);
              valid = true;
            }
          }

          if (valid == true) {
            _pubTime.pubTime = _playTime;
            let globalFromDate = new Date(_pubTime.pubFrom);
            let globalToDate = new Date(_pubTime.pubTo);
            if (globalToDate < globalFromDate) {
              this._toast.error("Publish end date should not be greater than from date.");
            }
            var d = this.checkTimeOverlap(_pubTime);
            if (d) {
              this._publish.addPublishDetails(_pubTime).subscribe(res => {
                if (res != null && res != undefined) {
                  if (res != 0) {
                    this._toast.success("Publish saved successfully.");
                    this.router.navigate(['publish/media-status']);
                  } else {
                    this._toast.error("Something went wrong.");
                  }
                }
              },(error=>{
                this._toast.error("Invalid data entered in some field.");
                
              }))
            } else {
              this._toast.error("Time overlap between playlist from date and to date");
            }

          } else {
            this._toast.error("Time overlap between playlist from date and to date");
          }

        } else {
          this._toast.error("Playlist time not selected");
        }
      }
    }
    catch (err: any) {
      this._toast.error(err);
    }

  }
  GetTime(eve: any, type: number) {

    let _date = new Date();
    var _day = ("0" + eve.controls["selectedDayG"].value).slice(-2);
    var _month = ("0" + eve.controls["selectedMonthG"].value).slice(-2);
    var _year = eve.controls["selectedYearG"].value;
    var _time = eve.controls["selectedTimeG"].value;

    if (type == 0) {
      this._publishMaster = new PublishMaster();
      if (_date.getUTCDate() >= Number(_day) && (_date.getMonth() + 1) >= Number(_month) && _date.getFullYear() >= _year) {
        this._publishMaster.createdby = this.global.UserCode;
        this._publishMaster.id = 0;
        this._publishMaster.fromtime = _year + "-" + _month + "-" + _day + " " + _time;
        this.selectedTime = this._publishMaster.totime
        this._publishMaster.isactive = true;
        this._publishMaster.totime = _year + "-" + _month + "-" + _day + " " + _time;
      }
      else
        this._toast.error("Invalid date selected.");
    }
    else if (type == 1) {
      if (_date.getUTCDate() <= Number(_day) && (_date.getMonth() + 1) <= Number(_month) && _date.getFullYear() <= _year) {
        this._publishMaster.totime = _year + "-" + _month + "-" + _day + " " + _time;

        let _fromDate = new Date(this._publishMaster.fromtime);
        let _toDate = new Date(this._publishMaster.totime);
        if (_fromDate >= _toDate) {
          this._toast.error("Invalid date selected.");
        }
      } else
        this._toast.error("Invalid date selected.");
    }
  }
  RemovePlaylist(item: any) {
    var len = 0;
    this.selectedPlaylist.forEach(element => {
      if (element.id == item.id)
        this.selectedPlaylist.slice(len, 1);
      len = len + 1;
    });
  }
  checkTimeOverlap(data: any) {
    let _pubFromDate = new Date(data.pubFrom);
    let _pubToDate = new Date(data.pubTo);
    for (var i = 0; i < data.pubTime.length; i++) {
      let startdate = new Date(data.pubTime[i].startDate);
      let enddate = new Date(data.pubTime[i].endDate);
      if (_pubFromDate > startdate) {
        return false;
      }
      else if (_pubToDate < enddate) {
        return false;
      }
    }
    return true;
  }
}
