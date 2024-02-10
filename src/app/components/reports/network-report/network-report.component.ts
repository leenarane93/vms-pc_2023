import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AdminFacadeService } from 'src/app/facade/facade_services/admin-facade.service';
import { CommonSelectList } from 'src/app/models/common/cmSelectList';
import { InputRequest } from 'src/app/models/request/inputReq';
import { Globals } from 'src/app/utils/global';

@Component({
  selector: 'app-network-report',
  templateUrl: './network-report.component.html',
  styleUrls: ['./network-report.component.css']
})
export class NetworkReportComponent implements OnInit {
  _request: any = new InputRequest();
  imgData: any;
  minDate:any;
  selectedStatus:number;
  model: NgbDateStruct;
  unitType: string = "second";
  unitValue: any;
  pager: number = 0;
  recordPerPage: number = 10000;
  startId: number = 0;
  searchText:string= "";
  _inputVmsData:any;
  dropdownSettingsVms:any;
  label1:string = "Select Controller";
  listOfData:any;
  totalPages: number = 1;
  totalRecords!: number;
  headerArr = [
    { "Head": "Device ID", "FieldName": "vmsid", "type": "string" },
    { "Head": "Device Name", "FieldName": "description", "type": "string" },
    { "Head": "Status", "FieldName": "networkStatus", "type": "boolean" },
    { "Head": "Date/Time", "FieldName": "networkTime", "type": "string" },
  ];
  constructor(
    private global:Globals,
    private adminFacade:AdminFacadeService,
  ){
    this.global.CurrentPage = "Network Report";
    this.dropdownSettingsVms = {
      singleSelection: false,
      idField: 'value',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
  }
  ngOnInit(): void {
    this.GetVmsDetails();
    let _date = new Date();
    let _day = _date.getUTCDate();
    let _mon = _date.getMonth() + 1;
    let _year = _date.getFullYear() - 2;
    this.minDate = {
      year: _year,
      month: _mon,
      day: _day
    }
  }


  GetVmsDetails() {
    this._request.currentPage = this.pager;
    this._request.pageSize = this.recordPerPage;
    this._request.startId = this.startId;
    this._request.searchItem = this.searchText;

    this.adminFacade.getVmss(this._request).subscribe(data => {
      if (data != null) {
        let commonList: CommonSelectList[] = [];
        data.data.forEach((ele: any) => {
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
    });
  }

  getSelectedVms(eve:any,type:any) {

  }

  onPager(pager: number) {
    this._request.pageSize = this.recordPerPage;
    this.pager = pager;
    this.startId = (this.pager - 1) * this.recordPerPage;
    //this.getParties();
  }

  onRecordPageChange(recordPerPage: number) {
    this._request.pageSize = recordPerPage;
    this.pager = recordPerPage;
    this.recordPerPage = recordPerPage;
    this.startId = 0;
    this.pager = 1;
    console.log(this.recordPerPage);
    //this.getParties();
  }

  onPageSearch(search: string) {
    this.searchText = search;
    //this.getParties();
  }
  
  ActionSubmit(){
    
  }
}
