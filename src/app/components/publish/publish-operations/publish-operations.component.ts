import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';

import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { PublishFacadeService } from 'src/app/facade/facade_services/publish-facade.service';
import { CommonSelectList } from 'src/app/models/common/cmSelectList';
import { InputRequest } from 'src/app/models/request/inputReq';
import { Globals } from 'src/app/utils/global';
import { NgbTimeStruct, NgbDateStruct, NgbPopoverConfig, NgbPopover, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { noop } from 'rxjs';
import { NgControl } from '@angular/forms';
import { DateTimeModel } from 'src/app/models/DateTimeModel';

@Component({
  selector: 'app-publish-operations',
  templateUrl: './publish-operations.component.html',
  styleUrls: ['./publish-operations.component.css']
})
export class PublishOperationsComponent implements OnInit {
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
  selectedDate:any;
  ngControl:any;
  headerArr = [
    { "Head": "ID", "FieldName": "id", "type": "number" },
    { "Head": "Playlist Name", "FieldName": "playlistName", "type": "string" },
    { "Head": "Selection", "FieldName": "checkbox", "type": "checkbox" }
  ];
  fromTimeArr = {
    "inputDatetimeFormat" : "dd-MM-yyyy HH:mm:ss",
  }
  constructor(private global: Globals,
    private _publish: PublishFacadeService,
    private _toast: ToastrService,
    private config: NgbPopoverConfig, private inj: Injector) {
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
  }
  BackToList() { }
  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector('#stepper1') as HTMLElement, {
      linear: false,
      animation: true
    });
    this.GetAllZoneDetails();
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


  //Changes for datetime picker
  @Input()
  dateString: string;

  @Input()
  inputDatetimeFormat = 'M/d/yyyy H:mm:ss';
  @Input()
  hourStep = 1;
  @Input()
  minuteStep = 15;
  @Input()
  secondStep = 30;
  @Input()
  seconds = true;

  @Input()
  disabled = false;

  showTimePickerToggle = false;

   datetime: DateTimeModel = new DateTimeModel();
   firstTimeAssign = true;

  @ViewChild(NgbDatepicker)
  dp: NgbDatepicker;

  @ViewChild(NgbPopover)
  popover: NgbPopover;
  timePickerContent:any;
  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;


  ngAfterViewInit(): void {
      this.popover.hidden.subscribe($event => {
          this.showTimePickerToggle = false;
      });
  }

  writeValue(newModel: string) {
      if (newModel) {
          this.datetime = Object.assign(this.datetime, DateTimeModel.fromLocalString(newModel));
          this.dateString = newModel;
          this.setDateStringModel();
      } else {
          this.datetime = new DateTimeModel();
      }
  }

  registerOnChange(fn: any): void {
      this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
      this.onTouched = fn;
  }

  toggleDateTimeState($event:any) {
      this.showTimePickerToggle = !this.showTimePickerToggle;
      $event.stopPropagation();
  }

  setDisabledState?(isDisabled: boolean): void {
      this.disabled = isDisabled;
  }

  onInputChange($event: any) {
      const value = $event.target.value;
      const dt = DateTimeModel.fromLocalString(value);

      if (dt) {
          this.datetime = dt;
          this.setDateStringModel();
      } else if (value.trim() === '') {
          this.datetime = new DateTimeModel();
          this.dateString = '';
          this.onChange(this.dateString);
      } else {
            this.onChange(value);
      }
  }

  onDateChange($event: any) {        
      if ($event.year){
        $event = `${$event.year}-${$event.month}-${$event.day}`
      }

      const date = DateTimeModel.fromLocalString($event);
 
      if (!date) {
          this.dateString = this.dateString;
          return;
      }

      if (!this.datetime) {
          this.datetime = date;
      }

      this.datetime.year = date.year;
      this.datetime.month = date.month;
      this.datetime.day = date.day;

      this.dp.navigateTo({ year: this.datetime.year, month: this.datetime.month });
      console.log('test');
      this.setDateStringModel();
  }

  onTimeChange(event: NgbTimeStruct) {
      this.datetime.hour = event.hour;
      this.datetime.minute = event.minute;
      this.datetime.second = event.second;

      this.setDateStringModel();
  }

  setDateStringModel() {
      this.dateString = this.datetime.toString();

      if (!this.firstTimeAssign) {
          this.onChange(this.dateString);
      } else {
          // Skip very first assignment to null done by Angular
          if (this.dateString !== null) {
              this.firstTimeAssign = false;
          }
      }
  }

  inputBlur($event:any) {
      this.onTouched();
  }

}
