import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet.fullscreen';
import 'leaflet.heat';
import { Injectable } from '@angular/core';
import { IconService } from './icon.service';
import { BaseLayerService } from './base-layer.service';
import { DrawControlService } from './draw-control.service';
import * as moment from 'moment';
import 'moment-duration-format';

export interface ShipData {
  mmsi: number;
  lon: number;
  lat: number;
  name: string;
  type: number;
  timestamp: string;
  destination?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!: L.Map;
  private layersControl!: L.Control.Layers;
  private drawnItems: L.FeatureGroup = new L.FeatureGroup();
  private markersLayer: L.LayerGroup = L.layerGroup();
  private heatmapLayer?: L.Layer;

  constructor(private drawControlService: DrawControlService) { }

  initializeMap(containerId: string): L.Map {
    this.map = L.map(containerId, {
      center: [-7.18643057415128, 112.71902662227242],
      zoom: 8,
      fullscreenControl: true,
      fullscreenControlOptions: { position: 'topright' }
    });

    this.addBaseLayers();
    this.map.addLayer(this.drawnItems);
    this.map.addLayer(this.markersLayer);
    this.setupDrawControl();
    this.drawControlService.loadShapes(this.map, this.drawnItems);
    return this.map;
  }

  private addBaseLayers(): void {
    const defaultLayer = BaseLayerService.baseLayers['Ocean'];
    defaultLayer.addTo(this.map);
    this.layersControl = L.control.layers(BaseLayerService.baseLayers).addTo(this.map);
  }

  private setupDrawControl(): void {
    const drawControl = DrawControlService.createDrawControl(this.drawnItems);
    this.map.addControl(drawControl);
    this.drawControlService.handleDrawEvents(this.map, this.drawnItems);
  }

  addMarkers(data: ShipData[]): void {
    this.markersLayer.clearLayers();
    data.forEach(ship => {
      const icon = IconService.getIconForShipType(ship.type);
      const marker = L.marker([ship.lat, ship.lon], { icon }).bindPopup(this.createPopupContent(ship));
      this.markersLayer.addLayer(marker);
    });
  }

  addHeatMap(data: any[]): void {
    if (this.heatmapLayer) {
      this.map.removeLayer(this.heatmapLayer);
    }
    const heatData: L.HeatLatLngTuple[] = data.map(ship => [ship.lat, ship.lon, 1.0]);
    this.heatmapLayer = L.heatLayer(heatData, { radius: 35, blur: 15, maxZoom: 17 }).addTo(this.map);
  }

  private createPopupContent(ship: ShipData): string {
    const timeAgo = this.getTimeAgo(ship.timestamp);
    return `
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
// map.service.ts
focusOnShip(ship: ShipData): void {
  this.map.setView([ship.lat, ship.lon], 18);
  // Tambahkan logika untuk menyorot atau membuka popup jika diperlukan
}




  destroyMap(): void {
    this.map.remove();
  }
}
