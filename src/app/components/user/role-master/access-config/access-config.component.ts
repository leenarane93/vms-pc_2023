import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-access-config',
  templateUrl: './access-config.component.html',
  styleUrls: ['./access-config.component.css']
})
export class AccessConfigComponent implements OnInit {

  selectedItems!: any[];
  savedItems!: any[];
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
    {
      "vmsId": "VMS021",
      "serialNo": "21",
      "description": "Khanderao",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.29738,
      "longitude": 73.20169,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.81",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 127,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T14:09:03.405",
      "modifiedBy": "admin",
      "modifiedDate": "2022-05-10T15:50:47.032",
      "id": 21
    },
    {
      "vmsId": "VMS014",
      "serialNo": "14",
      "description": "Sangam",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.31952,
      "longitude": 73.2119,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.144",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 25,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T12:51:07.492",
      "modifiedBy": "admin",
      "modifiedDate": "2022-05-10T15:51:05.801",
      "id": 15
    },
    {
      "vmsId": "VMS020",
      "serialNo": "20",
      "description": "Padmavati",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.3012,
      "longitude": 73.20549,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.41",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 68,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T14:06:57.775",
      "modifiedBy": "admin",
      "modifiedDate": "2022-05-10T15:51:26.705",
      "id": 20
    },
    {
      "vmsId": "VMS006",
      "serialNo": "006",
      "description": "Natubhai Circle",
      "zoneId": 5,
      "installDate": "2018-04-01T00:00:00",
      "latitude": 22.30987,
      "longitude": 73.15895,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.112",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 132,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T12:25:17.481",
      "modifiedBy": "admin",
      "modifiedDate": "2022-11-22T12:06:08.795",
      "id": 7
    },
    {
      "vmsId": "VMS007",
      "serialNo": "7",
      "description": "Yash Complex",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.31565,
      "longitude": 73.13751,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.16.92",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 66,
      "vmsOn": true,
      "createdBy": null,
      "createdDate": "2022-04-15T12:26:59.877",
      "modifiedBy": "admin",
      "modifiedDate": "2022-11-22T12:06:54.961",
      "id": 8
    },
    {
      "vmsId": "VMS009",
      "serialNo": "9",
      "description": "Channi",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.34512,
      "longitude": 73.17594,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.29",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 50,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T12:29:45.324",
      "modifiedBy": "admin",
      "modifiedDate": "2023-01-09T19:03:38.903",
      "id": 10
    },
    {
      "vmsId": "VMS011",
      "serialNo": "11",
      "description": "Amit Nagar ",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.32777,
      "longitude": 73.20737,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.20",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 53,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T12:40:11.847",
      "modifiedBy": "admin",
      "modifiedDate": "2023-01-09T19:04:03.22",
      "id": 12
    },
    {
      "vmsId": "VMS012",
      "serialNo": "12",
      "description": "Airport",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.32715,
      "longitude": 73.21356,
      "height": 160,
      "width": 288,
      "ipAddress": "10.20.12.97",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 75,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T12:42:45.232",
      "modifiedBy": "admin",
      "modifiedDate": "2023-01-09T19:15:15.756",
      "id": 13
    },
    {
      "vmsId": "VMS001",
      "serialNo": "1",
      "description": "Nursing Home",
      "zoneId": 4,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.29995,
      "longitude": 73.19473,
      "height": 160,
      "width": 288,
      "ipAddress": "172.19.10.79",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 61,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T11:39:17.735",
      "modifiedBy": "admin",
      "modifiedDate": "2023-03-08T10:16:22.853",
      "id": 2
    },
    {
      "vmsId": "VMS002",
      "serialNo": "2",
      "description": "SaiyajiGunj",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.30989,
      "longitude": 73.18277,
      "height": 160,
      "width": 288,
      "ipAddress": "172.19.10.78",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 38,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T12:11:26.516",
      "modifiedBy": "admin",
      "modifiedDate": "2023-08-07T13:59:07.807243",
      "id": 3
    },
    {
      "vmsId": "VMS003",
      "serialNo": "3",
      "description": "Mujumhuda",
      "zoneId": 5,
      "installDate": "2018-04-01T00:00:00",
      "latitude": 22.28589,
      "longitude": 73.16858,
      "height": 160,
      "width": 288,
      "ipAddress": "172.19.10.87",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 61,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T12:18:05.187",
      "modifiedBy": "admin",
      "modifiedDate": "2023-08-07T13:59:18.914381",
      "id": 4
    },
    {
      "vmsId": "VMS005",
      "serialNo": "5",
      "description": "Ambedkar",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.31052,
      "longitude": 73.16559,
      "height": 160,
      "width": 288,
      "ipAddress": "172.19.10.89",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 62,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T12:23:12.762",
      "modifiedBy": "admin",
      "modifiedDate": "2023-08-07T16:50:52.718052",
      "id": 6
    },
    {
      "vmsId": "VMS004",
      "serialNo": "4",
      "description": "Akshar Chowek",
      "zoneId": 5,
      "installDate": "2018-05-01T00:00:00",
      "latitude": 22.282,
      "longitude": 73.165,
      "height": 160,
      "width": 288,
      "ipAddress": "172.19.10.88",
      "isActive": true,
      "isDeleted": null,
      "brightnessCtrl": 64,
      "vmsOn": false,
      "createdBy": null,
      "createdDate": "2022-04-15T12:19:37.284",
      "modifiedBy": "admin",
      "modifiedDate": "2023-08-16T14:56:41.334709",
      "id": 5
    }
  ]
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(DataTableDirective)
  datatableElement!: DataTableDirective;
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
          text: '<i class="icon-cross"></i> Clear Media',
          className: 'btn btn-danger btn-rounded text-dark mr-3',
          attr: {
            title: 'Clear Media',
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
