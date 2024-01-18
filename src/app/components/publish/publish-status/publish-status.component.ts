import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-publish-status',
  templateUrl: './publish-status.component.html',
  styleUrls: ['./publish-status.component.css']
})
export class PublishStatusComponent {
  activetab = 1;
  selectedItems: any[];
  savedItems: any[];
  select_all = false;
  data: any[] = [
    {
      "vmsId": "VMS015",
      "serialNo": "15",
      "description": "Virandhavan",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.30028,
      "longitude": 73.23834,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.172",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 87,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T12:55:46.285",
      "modifiedBy": "admin",
      "modifiedDate": "2022-04-15T12:56:06.113",
      "id": 16
    },
    {
      "vmsId": "VMS016",
      "serialNo": "16",
      "description": "Panigate",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.30092,
      "longitude": 73.22377,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.178",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 43,
      "vmsOn": false,
      "createdBy": "admin",
      "createdDate": "2022-04-15T12:58:08.719",
      "modifiedBy": null,
      "modifiedDate": null,
      "id": 17
    },
    {
      "vmsId": "VMS016",
      "serialNo": "16",
      "description": "Panigate",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.30092,
      "longitude": 73.22377,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.178",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 43,
      "vmsOn": false,
      "createdBy": "admin",
      "createdDate": "2022-04-15T12:58:08.719",
      "modifiedBy": null,
      "modifiedDate": null,
      "id": 17
    },
    {
      "vmsId": "VMS016",
      "serialNo": "16",
      "description": "Panigate",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.30092,
      "longitude": 73.22377,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.178",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 43,
      "vmsOn": false,
      "createdBy": "admin",
      "createdDate": "2022-04-15T12:58:08.719",
      "modifiedBy": null,
      "modifiedDate": null,
      "id": 17
    },
    {
      "vmsId": "VMS016",
      "serialNo": "16",
      "description": "Panigate",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.30092,
      "longitude": 73.22377,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.178",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 43,
      "vmsOn": false,
      "createdBy": "admin",
      "createdDate": "2022-04-15T12:58:08.719",
      "modifiedBy": null,
      "modifiedDate": null,
      "id": 17
    },
    {
      "vmsId": "VMS017",
      "serialNo": "17",
      "description": "Soma Talav",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.27933,
      "longitude": 73.22998,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.156",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 98,
      "vmsOn": false,
      "createdBy": "admin",
      "createdDate": "2022-04-15T13:01:12.205",
      "modifiedBy": null,
      "modifiedDate": null,
      "id": 18
    },
    {
      "vmsId": "VMS019",
      "serialNo": "19",
      "description": "Susen",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.25633,
      "longitude": 73.19861,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.160",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 69,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T14:05:25.409",
      "modifiedBy": "admin",
      "modifiedDate": "2022-04-28T15:08:16.865",
      "id": 19
    },
    {
      "vmsId": "VMS010",
      "serialNo": "10",
      "description": "Dumad Chowk",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.36191,
      "longitude": 73.1947,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.40",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 44,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T12:36:51.476",
      "modifiedBy": "admin",
      "modifiedDate": "2022-04-28T15:42:43.512",
      "id": 11
    },
  ]
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtOptions: any = {};
  constructor(
    private httpClient: HttpClient
  ) { }




  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      processing: true,
      dom: 'flBtip',
      buttons: [
        {
          text: '<i class="icon-cross"></i> Delete Media',
          className: 'btn btn-danger btn-rounded text-dark mr-3',
          attr: {
            title: 'Delete All',
            id: 'clearMedia',
          },
          action: function (e: any, dt: any, node: any, config: any) {
            // render: (display: boolean, type: any, full: any) => {
            //   this.display = false;
            //    // this.openModal();
            //    this.display = !this.display;


            // }
            // this.display = true;
          }
        }
      ],
      drawCallback: () => {
        $('#clearMedia').on('click', () => {
          this.saveSelectedItem();
        });
      }

    }
  }

  onSelectAll(e: any): void {
    for (let i = 0; i < this.data.length; i++) {
      const item = this.data[i];
      item.is_selected = e;
    }
  }
  removeSelectedRows() {
    this.data.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index, 1);

    });
    this.selection = new SelectionModel<Element>(true, []);
  }

  public saveSelectedItem() {
    // this.data = this.data.filter(item => this.selectedItems.
    //   findIndex(value => item.data === value.data) === -1);
    // this.savedItems = [...this.selectedItems.map(item => ({ value: item.data }))];


    this.selectedItems = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].is_selected) {
        this.selectedItems.push(this.data[i]);
      }
    }

    this.data = this.data.filter((el) => !this.selectedItems.includes(el));
    console.log(this.selectedItems);
    console.log(this.data);
  }
}
