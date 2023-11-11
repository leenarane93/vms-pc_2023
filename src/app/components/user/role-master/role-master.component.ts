import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonFacadeService } from 'src/app/facade/facade_services/common-facade.service';
import { InputRequest } from 'src/app/models/request/inputReq';
import { Globals } from 'src/app/utils/global';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.css']
})
export class RoleMasterComponent implements OnInit {
  title = 'angular13';
  searchText!: string;
  page: any;
  listOfParties: any;
  totalPages: number = 1;
  pager: number = 1;
  totalRecords!: number;
  recordPerPage: number = 10;
  startId!: number;
  closeResult!: string;
  _request: any = new InputRequest();
  headerArr = [
    { "Head": "ID", "FieldName": "id", "type": "number" },
    { "Head": "Party Code", "FieldName": "partyCode", "type": "string" },
    { "Head": "Party Name", "FieldName": "partyName", "type": "string" },
    { "Head": "Description", "FieldName": "description", "type": "string" },
    { "Head": "Status", "FieldName": "isActive", "type": "boolean" }
  ];
    constructor(private global:Globals,
                private _commonFacade:CommonFacadeService,
                private router:Router){
      this.global.CurrentPage = "Role Management";
    }
    ngOnInit(): void {
      
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
      
    }
  
    OpenModal(content: any) {
      this._commonFacade.setSession("ModelShow",null);
      this.router.navigate(['masters/add-party']);
    }
  
    SearchWithId(_searchItem:any){
      this._commonFacade.setSession("ModelShow",JSON.stringify(_searchItem));
      this.router.navigate(['masters/add-party']);
    }
    
}
