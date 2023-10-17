import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdminFacadeService } from 'src/app/facade/facade_services/admin-facade.service';
import { Globals } from 'src/app/utils/global';

export type eventModel = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-zone-mng',
  templateUrl: './zone-mng.component.html',
  styleUrls: ['./zone-mng.component.css']
})
export class ZoneMngComponent {
  title = 'angular13';
  searchText = "";
  page:any;
  listOfZones:any ;
  constructor(private adminFacade: AdminFacadeService,
              private global : Globals){
    this.global.CurrentPage = "Zone Management";
    this.getZones();
  }

  headerArr =[
    {"Head":"ID","FieldName":"id"},
    {"Head":"Zone Name","FieldName":"zoneName"},
    {"Head":"Description","FieldName":"description"}
  ];
  getZones(){
    //get request from web api
    this.adminFacade.getZones().subscribe(data => {
      console.log(data);
        this.listOfZones = data;
     
            }, error => console.error(error));
  }
}
