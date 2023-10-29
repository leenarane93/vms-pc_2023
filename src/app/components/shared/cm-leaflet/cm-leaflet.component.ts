// import { Component } from '@angular/core';
// declare const L: any; // --> Works
// import 'leaflet-draw';

// import { DrawEvents, featureGroup, FeatureGroup, icon, latLng, tileLayer } from 'leaflet';

// const myStyle = {
// 	"color": "green",
// 	"weight": 5,
// 	"opacity": 0.65
// };

// const markerIcon = L.icon({
// 	iconSize: [25, 41],
// 	iconAnchor: [10, 41],
// 	popupAnchor: [2, -40],
// 	// specify the path here
// 	iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
// 	shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
// });
// L.Marker.prototype.options.icon = markerIcon;

// @Component({
// 	selector: 'app-cm-leaflet',
// 	templateUrl: './cm-leaflet.component.html',
// 	styleUrls: ['./cm-leaflet.component.css']
// })
// export class CmLeafletComponent {

// 	// //Drawable Map
// 	// drawnItems: FeatureGroup = featureGroup();
// 	// options = {
// 	// 	layers: [
// 	// 		tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
// 	// 	],
// 	// 	zoom: 5,
// 	// 	center: latLng({ lat: 46.879966, lng: -121.726909 })
// 	// };

// 	// drawOptions: any = {
// 	// 	position: 'topright',
// 	// 	draw: {
// 	// 		marker: {
// 	// 			icon: icon({
// 	// 				iconSize: [25, 41],
// 	// 				iconAnchor: [13, 41],
// 	// 				iconUrl: 'assets/leaflet/marker-icon.png',
// 	// 				iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
// 	// 				shadowUrl: 'assets/leaflet/marker-shadow.png'
// 	// 			})
// 	// 		}
// 	// 	},
// 	// 	edit: {
// 	// 		featureGroup: this.drawnItems
// 	// 	}
// 	// };

// 	// drawLocal: any = {
// 	// 	draw: {
// 	// 		toolbar: {
// 	// 			buttons: {
// 	// 				polygon: 'Draw an awesome polygon!'
// 	// 			}
// 	// 		}
// 	// 	}
// 	// };

// 	// public onDrawCreated(e: any) {
// 	// 	// tslint:disable-next-line:no-console
// 	// 	console.log('Draw Created Event!');

// 	// 	const layer = (e as DrawEvents.Created).layer;
// 	// 	this.drawnItems.addLayer(layer);
// 	// }

// 	// public onDrawStart(e: any) {
// 	// 	// tslint:disable-next-line:no-console
// 	// 	console.log('Draw Started Event!');
// 	// }
// 	name = "Angular";
// 	map: any;
// 	lat: number = 22.29985;
// 	lon: number = 73.19555;
// 	maker!: L.Marker<any>;
// 	dbmaker!: L.Marker<any>[];

// 	markers!: any[];
// 	drawnItems: any;

// 	datachild!: any;
// 	isAddFieldTask!: boolean;
// 	isSave!: boolean;
// 	ngOnInit() {
// 		this.map = L.map('map',).setView([this.lat, this.lon], 8);
// 		//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

// 		const baselayers = {
// 			"openstreetmap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')

// 		};

// 		var overlays = {};

// 		L.control.layers(baselayers, overlays).addTo(this.map);

// 		baselayers["openstreetmap"].addTo(this.map);




// 		this.drawnItems = new L.FeatureGroup();

// 		this.map.addLayer(this.drawnItems);


// 		var options = {
// 			position: 'topright',
// 			draw: {
// 				//     polyline: {
// 				//         shapeOptions: {
// 				//             color: '#f357a1',
// 				//             weight: 10
// 				//         }
// 				//     },
// 				//     polygon: {
// 				//         allowIntersection: false, // Restricts shapes to simple polygons
// 				//         drawError: {
// 				//             color: '#e1e100', // Color the shape will turn when intersects
// 				//             message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
// 				//         },
// 				//         shapeOptions: {
// 				//             color: '#bada55'
// 				//         }
// 				//     },
// 				circle: false,
// 				circlemarker: false,// Turns off this drawing tool
// 				//     rectangle: {
// 				//         shapeOptions: {
// 				//             clickable: false
// 				//         }
// 				//     },
// 				marker:
// 				{

// 					icon: markerIcon

// 				}
// 			},
// 			edit: {
// 				featureGroup: this.drawnItems, //REQUIRED!!
// 				// remove: false
// 			}

// 		};

// 		var drawControl = new L.Control.Draw(options);
// 		this.map.addControl(drawControl);

// 		var app = this;
// 		this.map.on(L.Draw.Event.CREATED, function (e: any) {
// 			var type = e.layerType,
// 				layer = e.layer;

// 			if (type === 'marker') {
// 				layer.bindPopup('A popup!');
// 				console.log(layer.getLatLng());
// 			}
// 			else {
// 				console.log(layer.getLatLngs());
// 			}
// 			app.drawnItems.addLayer(layer);
// 			//TODO: ask yes no
// 			// var r = confirm("Press a button!");
// 			// if (r == true) {

// 			//   app.drawnItems.addLayer(layer);
// 			//   app.shareDataService.ShareDataGeometry(e);

// 			// } else {

// 			// }

// 		});

// 		// var layerGroup = new L.LayerGroup();
// 		// layerGroup.addTo(this.map);
// 		// layerGroup.addLayer(layerPostalcodes);
// 		// //layerGroup.removeLayer(layerPostalcodes);
// 		// this.map.removeLayer(layerGroup);

// 		//

// 	}
// }


import { AfterViewInit, Component } from '@angular/core';

// when the docs use an import:
declare const L: any; // --> Works
import 'leaflet-draw';
const myLines = [{
	"type": "Polygon",
	"coordinates": [[
		[105.02517700195314, 19.433801201715198],
		[106.23367309570314, 18.852796311610007],
		[105.61843872070314, 7.768472031139744]

	]]
}, {
	"type": "LineString",
	"coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];


//For geometry from data
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
@Component({
	selector: 'app-cm-leaflet',
	templateUrl: './cm-leaflet.component.html',
	styleUrls: ['./cm-leaflet.component.css']
})
export class CmLeafletComponent {
	name = "Angular";
	map: any;
	lat: number = 16.382889;
	lon: number = 107.402344;
	maker!: any;
	dbmaker!: any[];

	markers!: any[];
	drawnItems: any;

	datachild: any;
	isAddFieldTask!: boolean;
	isSave!: boolean;
	ngOnInit() {
		this.map = L.map('map',).setView([this.lat, this.lon], 6);
		//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

		const baselayers = {
			"openstreetmap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
			"googleStreets": L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
				maxZoom: 20,
				subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
			}),
			"googleHybrid": L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
				maxZoom: 20,
				subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
			}),
			"googleSat": L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
				maxZoom: 20,
				subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
			}),
			"googleTerrain": L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
				maxZoom: 20,
				subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
			}),
			"VMap": L.tileLayer('https://maps.vnpost.vn/api/tm/{z}/{x}/{y}@2x.png?apikey=8fb3246c12d442525034be04bcd038f22e34571be4adbd4c'),

		};

		var overlays = {};

		L.control.layers(baselayers, overlays).addTo(this.map);

		baselayers["VMap"].addTo(this.map);




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
		this.map.on(L.Draw.Event.CREATED, function (e: any) {
			var type = e.layerType,
				layer = e.layer;

			if (type === 'marker') {
				layer.bindPopup('A popup!');
				console.log(layer.getLatLng());
			}
			else {
				console.log(layer.getLatLngs());
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

		var layerPostalcodes = L.geoJSON(myLines, {
			style: myStyle
		}).addTo(this.map);

		this.drawnItems.addLayer(layerPostalcodes);
		// var layerGroup = new L.LayerGroup();
		// layerGroup.addTo(this.map);
		// layerGroup.addLayer(layerPostalcodes);
		// //layerGroup.removeLayer(layerPostalcodes);
		// this.map.removeLayer(layerGroup);

		//

	}
}
