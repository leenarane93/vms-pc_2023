import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { PublishFacadeService } from 'src/app/facade/facade_services/publish-facade.service';
import { Globals } from 'src/app/utils/global';

@Component({
  selector: 'app-publish-status',
  templateUrl: './publish-status.component.html',
  styleUrls: ['./publish-status.component.css']
})
export class PublishStatusComponent implements OnInit {
  activetab = 1;
  selectedItems: any[];
  dtCreatedPublish: any[] = [];
  dtSendingPublish: any[] = [];
  dtRunningPublish: any[] = [];
  savedItems: any[];
  select_all = false;
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
  constructor(
    private httpClient: HttpClient,
    private global: Globals,
    private publish: PublishFacadeService
  ) {
    this.global.CurrentPage = "Publish Status";
  }

  ngOnInit(): void {
    this.GetPublishStatusData();
  }

  GetPublishStatusData() {
    this.publish.getPlaylistStatusData().subscribe(res => {
      if (res != null) {
        res.forEach((ele: any) => {
          let _dtFrom = new Date(ele.fromTime);
          let _dtTo = new Date(ele.toTime);
          let _fromDay =  _dtFrom.getDate().toLocaleString(); 
          let _fromMonth = (_dtFrom.getMonth() + 1).toLocaleString();
          let _fromYear = _dtFrom.getFullYear();
          let _fromHrs = _dtFrom.getHours().toLocaleString();
          let _fromMins = _dtFrom.getMinutes().toLocaleString();
          let _fromSecs = _dtFrom.getSeconds().toLocaleString();
          let _toDay =  _dtTo.getDate().toLocaleString(); 
          let _toMonth = (_dtTo.getMonth()+1).toLocaleString();
          let _toYear = _dtTo.getFullYear();
          let _toHrs = _dtTo.getHours().toLocaleString();
          let _toMins = _dtTo.getMinutes().toLocaleString();
          let _toSecs = _dtTo.getSeconds().toLocaleString(); 
          ele.fromTime = _fromDay.padStart(2, '0') + "-" + _fromMonth.padStart(2, '0') + "-" + _fromYear + " " + _fromHrs.padStart(2, '0') + ":" + _fromMins.padStart(2, '0') + ":" + _fromSecs.padStart(2, '0');
          ele.toTime = _toDay.padStart(2, '0') + "-" + _toMonth.padStart(2, '0') + "-" + _toYear + " " + _toHrs.padStart(2, '0') + ":" + _toMins.padStart(2, '0') + ":" + _toSecs.padStart(2, '0');
          if (ele.status == 0) {
            this.dtCreatedPublish.push(ele);
          } else if (ele.status == 1) {
            this.dtSendingPublish.push(ele);
          } else if (ele.status == 2) {
            this.dtRunningPublish.push(ele);
          }
        });
      }
    });
  }
}
