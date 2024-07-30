import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet.fullscreen';
import { IconService } from './icon.service';
import { BaseLayerService } from './base-layer.service';
import { DrawControlService } from './draw-control.service';
// import { MapUtilities } from './map-utilities';
import * as moment from 'moment';
import 'moment-duration-format';
import 'leaflet.heat';
export interface ShipData {
  mmsi: number;
  lon: number;
  lat: number;
  name: string;
  type: number;
  timestamp: string; // Pastikan tipe timestamp sesuai
  destination?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!: L.Map;
  private layersControl!: L.Control.Layers;
  private drawnItems: L.FeatureGroup = new L.FeatureGroup();

  constructor(private drawControlService: DrawControlService) { }

  initializeMap(containerId: string): L.Map {
    this.map = L.map(containerId, {
      center: [-7.18643057415128, 112.71902662227242],
      zoom: 8,
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topright'
      }
    });

    this.addBaseLayers();
    this.addControlLayers();
    this.setupDrawControl();
    this.drawControlService.loadShapes(this.map, this.drawnItems);
    // MapUtilities.loadDrawnItems(this.drawnItems);
    return this.map;
  }

  private addBaseLayers(): void {

    const defaultLayer = BaseLayerService.baseLayers['Ocean'];
    defaultLayer.addTo(this.map);
    this.layersControl = L.control.layers(BaseLayerService.baseLayers).addTo(this.map);
  }

  private addControlLayers(): void {
    this.map.addLayer(this.drawnItems);
  }

  private setupDrawControl(): void {
    const drawControl = DrawControlService.createDrawControl(this.drawnItems);
    this.map.addControl(drawControl);
    this.drawControlService.handleDrawEvents(this.map, this.drawnItems);
  }

  private getTimeAgo(timestamp: string): string {
    const now = moment();
    const then = moment(timestamp, 'DD-MM-YYYY HH:mm:ss');
    const duration = moment.duration(now.diff(then));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    return `${days} days ${hours} hours ${minutes} minutes ago`;
  }
  destroyMap(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  addMarkers(data: ShipData[]): void {
    data.forEach(ship => {
      const icon = IconService.getIconForShipType(ship.type);
      const marker = L.marker([ship.lat, ship.lon], { icon }).addTo(this.map);
      const timeAgo = this.getTimeAgo(ship.timestamp);
      const popupContent = `
        <div class="marker-popup">
          <h3>${ship.name}</h3>
          <ul>
            <li>ID: ${ship.mmsi}</li>
            <li>Name: ${ship.name}</li>
            <li>Type: ${ship.type}</li>
            <li>Coordinates: ${ship.lat}, ${ship.lon}</li>
            <li>Destination: ${ship.destination || 'N/A'}</li>
            <li>Last Received: ${timeAgo}</li>
          </ul>
        </div>
      `;
      marker.bindPopup(popupContent);
    });
  }
  addHeatMap(data: any[]): void {
    const heatData: L.HeatLatLngTuple[] = data.map(ship => [ship.lat, ship.lon, ship.intensity || 1.0]);
    const heat = (L as any).heatLayer(heatData, {
      radius: 65,
      blur: 15,
      maxZoom: 17
    }).addTo(this.map);
  }
}
