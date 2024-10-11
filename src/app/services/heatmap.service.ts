// heatmap.service.ts
import * as L from 'leaflet';
import { Injectable } from '@angular/core';
import { ShipData } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class HeatmapService {
  private heatmapLayer?: L.Layer;

  constructor() {}

  addHeatMap(map: L.Map, data: ShipData[]): void {
    if (this.heatmapLayer) {
      map.removeLayer(this.heatmapLayer);
    }
    const heatData: L.HeatLatLngTuple[] = data.map((ship) => [ship.lat, ship.lon, 1.0]);
    this.heatmapLayer = L.heatLayer(heatData, { radius: 35, blur: 15, maxZoom: 17 }).addTo(map);
  }
}
