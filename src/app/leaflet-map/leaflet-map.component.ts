import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../data.service';

interface ShipData {
  _id: number;
  lon: number;
  lat: number;
  createdAt: string;
  name: string;
  type: number;
}

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements AfterViewInit {
  private map!: L.Map;
  private ships: ShipData[] = [];

  private shipIcons: { [type: string]: L.Icon } = {
    'Unspecified': L.icon({
      iconUrl: 'assets/images/unspecified.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Fishing': L.icon({
      iconUrl: 'assets/images/fishing.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Tanker': L.icon({
      iconUrl: 'assets/images/tanker.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Cargo': L.icon({
      iconUrl: 'assets/images/cargo.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Tug': L.icon({
      iconUrl: 'assets/images/tug.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Highspeed': L.icon({
      iconUrl: 'assets/images/highspeed.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Passenger': L.icon({
      iconUrl: 'assets/images/passenger.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Pleasure': L.icon({
      iconUrl: 'assets/images/pleasure.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })
  };

  constructor(private dataService: DataService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadShipData();
    this.addSeaArea();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-7.18643057415128, 112.71902662227242],
      zoom: 8
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    });

    tiles.addTo(this.map);
  }


  private loadShipData(): void {
    this.dataService.getData().subscribe(data => {
      console.log('Data from API:', data);
      if (Array.isArray(data)) {
        this.ships = data;
        this.addMarkers();
      } else {
        console.error('Invalid data format:', data);
      }
    }, error => {
      console.error('Error loading data:', error);
    });
  }

  private addMarkers(): void {
    if (!this.ships || this.ships.length === 0) {
      console.warn('No ships data available to add markers.');
      return;
    }

    this.ships.forEach(ship => {
      console.log('Adding marker for ship:', ship);
      const icon = this.getIconForShipType(ship.type);
      const marker = L.marker([ship.lat, ship.lon], { icon }).addTo(this.map);
      const popupContent = `
        <div class="marker-popup">
          <h3>${ship.name}</h3>
          <ul>
            <li>ID: ${ship._id}</li>
            <li>Name: ${ship.name}</li>
            <li>Type: ${ship.type}</li>
            <li>Coordinates: ${ship.lat}, ${ship.lon}</li>
            <li>Created At: ${new Date(ship.createdAt).toLocaleString()}</li>
          </ul>
        </div>
      `;
      marker.bindPopup(popupContent);
    });
  }


  private addSeaArea(): void {
    const seaArea = L.polygon([
      [-7.185, 112.718],  // Top-left
      [-7.185, 112.720],  // Top-right
      [-7.188, 112.720],  // Bottom-right
      [-7.188, 112.718]   // Bottom-left
    ], {
      color: 'blue',
      fillColor: '#3388ff',
      fillOpacity: 0.5
    }).addTo(this.map);

    seaArea.bindPopup("Area Asset");
  }

  private getIconForShipType(type: number): L.Icon {
    if ((type === 31 || type === 32) && type >=20 && type<=28) {
      return this.shipIcons['Tug'];
    } else if (type >= 40 && type <= 49) {
      return this.shipIcons['Highspeed'];
    } else if (type === 39) {
      return this.shipIcons['Pleasure'];
    } else if (type >= 50 && type <= 69  ) {
      return this.shipIcons['Passenger'];
    } else if (type === 30) {
      return this.shipIcons['Fishing'];
    } else if (type === 60) {
      return this.shipIcons['Tanker'];
    } else if (type === 70) {
      return this.shipIcons['Cargo'];
    } else if (type === 80) {
      return this.shipIcons['Tanker'];
    } else {
      return this.shipIcons['Unspecified'];
    }
  }
}
