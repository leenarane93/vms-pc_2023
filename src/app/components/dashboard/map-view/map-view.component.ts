import { Component, HostListener } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
//import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import {icon, latLng, LeafletMouseEvent, Map, MapOptions, marker, tileLayer} from 'leaflet';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent {
  public map !: Map;
  listView:boolean =true;
  buttonName:any = 'fa fa-list';
  viewName:any = 'View List';
  hide: any;
  options = {
    layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 8,
    center: latLng(22.29985,73.19555)
};
  constructor(
    public modalService: NgbModal,
  ) { }
 
 
  ngOnInit(): void {
  //   this.map = new Map({
  //   layers: [
  //     new TileLayer({
  //       source: new OSM(),
  //     }),
  //   ],
  //   target: 'map',
  //   view: new View({ 
  //     center: [0, 0],
  //     zoom: 2,maxZoom: 18, 
  //   }),
  // });
 }

 openModal() {
  // const modalRef = this.modalService.open(PublishModalComponent,  { windowClass: 'rounded-7', size: 'xl' });
  
  // modalRef.result.then((result) => {
  //   if (result) {
  //     console.log(result);
  //   }
  // });
  // modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
  //   console.log(receivedEntry);
  // })
}


toggle() {
  this.listView = !this.listView
  
  if(this.listView) {
  this.buttonName = 'fa fa-list';
  this.viewName = 'View List';
  $('#filterArea').addClass('filterArea');
  $('.content-wrapper').removeClass('p-4');
  $('.content-wrapper').addClass('p-0');
  
  }
  else {
  this.buttonName = 'fa fa-map';
  this.viewName = 'View Map';
  $('#filterArea').removeClass('filterArea');
  $('.content-wrapper').addClass('p-4');
  $('.content-wrapper').removeClass('p-0');
  
  }
  }

showListview() {
  this.listView = !this.listView;
  $('#filterArea').removeClass('filterArea');
  $('.content-wrapper').addClass('p-4');
  $('.content-wrapper').removeClass('p-0');

  // Change the name of the button.
  // if(this.addZone = true)  
  //   this.zoneList = false;
  // else
  //   this.zoneList = true;
}
@HostListener('unloaded')
ngOnDestroy() {
    console.log('Cleared');
  $('.content-wrapper').removeClass('p-4');
  $('.content-wrapper').addClass('p-0');
  //this.modalService.dismissAll(PublishModalComponent);

}

}
