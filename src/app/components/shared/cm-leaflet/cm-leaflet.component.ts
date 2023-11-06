
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { event } from 'jquery';

// when the docs use an import:
declare const L: any; // --> Works
import 'leaflet-draw';
import { ToastrService } from 'ngx-toastr';
import { AdminFacadeService } from 'src/app/facade/facade_services/admin-facade.service';
const myStyle = {
	"color": "green",
	"weight": 5,
	"opacity": 0.65
};

const markerIcon = L.icon({
	iconSize: [25, 41],
	iconAnchor: [10, 41],
	popupAnchor: [2, -40],
	// specify the path here
	iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
});
L.Marker.prototype.options.icon = markerIcon;
// const myLines = [{
// 	"type": "Polygon",
// 	"coordinates": [[
// 		[105.02517700195314, 19.433801201715198],
// 		[106.23367309570314, 18.852796311610007],
// 		[105.61843872070314, 7.768472031139744]

// 	]]
// }, {
// 	"type": "LineString",
// 	"coordinates": [[-105, 40], [-110, 45], [-115, 55]]
// }];
@Component({
	selector: 'app-cm-leaflet',
	templateUrl: './cm-leaflet.component.html',
	styleUrls: ['./cm-leaflet.component.css']
})
export class CmLeafletComponent implements AfterViewInit {
	name = "Angular";
	@Input() mapType: string = "";
	layers: any;
	map: any;
	lat: number = 0;
	lon: number = 0;
	zoom: number = 10;
	maker!: any;
	dbmaker!: any[];
	polygon: any[] = [];
	@Output() latLng = new EventEmitter<any[]>();
	markers!: any[];
	drawnItems: any;
	@Input() zoneId: number = 0;
	@Input() btnDisabled: boolean = false;
	datachild: any;
	isAddFieldTask!: boolean;
	isSave!: boolean;
	@Output() markerCoords =new EventEmitter<any[]>();
	constructor(private adminFacade: AdminFacadeService,
				private toast: ToastrService,
				private cdr:ChangeDetectorRef) {
	}
	ngAfterViewInit(): void {
		this.cdr.detectChanges();
	}
	ngOnInit() {
		this.adminFacade.getConfiguration().subscribe(res => {
			var latitude = res.find((x: any) => x.prmkey == 'lat');
			this.lat = latitude.prmvalue;
			var longs = res.find((x: any) => x.prmkey == 'long');
			this.lon = longs.prmvalue;
			var zooms = res.find((x: any) => x.prmkey == 'zoomlevel');
			this.zoom = zooms.prmvalue;
			//this.InItMap();
			this.CheckCoordinates();
		});
	}
	CheckCoordinates() {
		if (this.zoneId != 0) {
			this.adminFacade.getZoneCoordinates(this.zoneId).subscribe(res => {
				let cordsArr: any[] = [];
				res.forEach((ele: any) => {
					let lat = Number(ele.latitude);
					let long = Number(ele.longitude);
					let cords = [lat, long];
					cordsArr.push(cords);
				});

				this.polygon = [{ "type": "Polygon", "coordinates": [cordsArr] }];
				this.InItMap();
			});
		}
		else
			this.InItMap();
	}

	InItMap() {
		this.map = L.map('map',).setView([this.lat, this.lon], this.zoom);
		//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

		const baselayers = {
			"openstreetmap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
			//"VMap": L.tileLayer('https://maps.vnpost.vn/api/tm/{z}/{x}/{y}@2x.png?apikey=8fb3246c12d442525034be04bcd038f22e34571be4adbd4c'),

		};

		var overlays = {};

		L.control.layers(baselayers, overlays).addTo(this.map);

		baselayers["openstreetmap"].addTo(this.map);




		this.drawnItems = new L.FeatureGroup();

		this.map.addLayer(this.drawnItems);


		var options = {
			position: 'topright',
			draw: {
				//     polyline: {
				//         shapeOptions: {
				//             color: '#f357a1',
				//             weight: 10
				//         }
				//     },
				//     polygon: {
				//         allowIntersection: false, // Restricts shapes to simple polygons
				//         drawError: {
				//             color: '#e1e100', // Color the shape will turn when intersects
				//             message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
				//         },
				//         shapeOptions: {
				//             color: '#bada55'
				//         }
				//     },
				circle: false,
				circlemarker: false,// Turns off this drawing tool
				//     rectangle: {
				//         shapeOptions: {
				//             clickable: false
				//         }
				//     },
				marker:
				{

					icon: markerIcon

				}
			},
			edit: {
				featureGroup: this.drawnItems, //REQUIRED!!
				// remove: false
			}

		};

		var drawControl = new L.Control.Draw(options);
		this.map.addControl(drawControl);

		var app = this;
		if(this.mapType == "vms") {
			this.map.on('click', (e: any) => {
				var popLocation = e.latlng;
	
				let val = this.isMarkerInsidePolygon(popLocation.lat, popLocation.lng, this.polygon);
				console.log(val);
				if(val == true)
					this.ProvideMarker(popLocation);
				else {
					this.toast.error("Selected location is outside of zone area.","Error", {
						positionClass: 'toast-bottom-right'
					})
				}
			})
		}
		this.map.on(L.Draw.Event.CREATED, (e: any) => {
			var type = e.layerType,
				layer = e.layer;

			if (type === 'marker') {
				layer.bindPopup('A popup!');
				console.log(layer.getLatLng());
			}
			else {

				this.layers = [];
				this.layers = layer.getLatLngs();
				console.log(this.layers);
			}
			app.drawnItems.addLayer(layer);
			//TODO: ask yes no
			// var r = confirm("Press a button!");
			// if (r == true) {

			//   app.drawnItems.addLayer(layer);
			//   app.shareDataService.ShareDataGeometry(e);

			// } else {

			// }

		});

		var layerPostalcodes = L.geoJSON(this.polygon, {
			style: myStyle
		}).addTo(this.map);

		this.drawnItems.addLayer(layerPostalcodes);
		// var layerGroup = new L.LayerGroup();
		// layerGroup.addTo(this.map);
		// layerGroup.addLayer(layerPostalcodes);
		// //layerGroup.removeLayer(layerPostalcodes);
		// this.map.removeLayer(layerGroup);

		//

		this.map.on("singleclick", (event: any) => {
			var lonLat = L.proj.toLonLat(event.coordinate);
			console.log(lonLat);
			//this.addMarker(lonLat[0], lonLat[1]);
		});
	}

	SubmitCoordinates() {
		if (this.layers == undefined || this.layers.length == 0) {
			this.toast.error("Zone Area not selected", "Error", {
				positionClass: 'toast-bottom-right'
			});
		}
		else {
			this.latLng.emit(this.layers);
		}
	}


	isMarkerInsidePolygon(lat: any, lng: any, poly: any) {
		var x = lat, y = lng;
		var polyPoints = poly[0].coordinates[0];
		var inside = false;
		for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
			var xi = polyPoints[i][0], yi = polyPoints[i][1];
			var xj = polyPoints[j][0], yj = polyPoints[j][1];

			var intersect = ((xi > y) != (xj > y))
				&& (x < (yj - yi) * (x - xi) / (xj - xi) + yi);
			if (intersect) {
				inside = !inside;
				break;
			}

		}

		return inside;
	};

	ProvideMarker(loc:any){
		this.markerCoords.emit(loc);
	}
}
