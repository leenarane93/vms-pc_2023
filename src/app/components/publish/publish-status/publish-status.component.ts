import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Globals } from 'src/app/utils/global';

@Component({
  selector: 'app-publish-status',
  templateUrl: './publish-status.component.html',
  styleUrls: ['./publish-status.component.css']
})
export class PublishStatusComponent implements OnInit {
  activetab = 1;
  selectedItems: any[];
  savedItems: any[];
  select_all = false;
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
  constructor(
    private httpClient: HttpClient,
    private global:Globals
  ) { 
    this.global.CurrentPage = "Publish Status";
  }

  ngOnInit(): void {
    this.GetPublishStatusData();
  } 

  GetPublishStatusData() {
    
  }
}
