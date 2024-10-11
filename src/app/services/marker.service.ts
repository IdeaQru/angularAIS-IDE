// marker.service.ts
import * as L from 'leaflet';
import { Injectable } from '@angular/core';
import { ShipData } from './map.service';
import { IconService } from './icon.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  private markersLayer: L.LayerGroup = L.layerGroup(); // Initialize markersLayer to hold all markers
  private heatmapLayer?: L.Layer; // Initialize heatmapLayer

  constructor() {}

  // Method to add markers to the map
  addMarkers(map: L.Map, data: ShipData[]): void {
    this.markersLayer.clearLayers(); // Clear any existing markers before adding new ones
    data.forEach((ship) => {
      const iconUrl = IconService.getIconForShipType(ship.type).options.iconUrl;
      const shipBearing = ship.heading || ship.courseOverGround || 0;

      // Create HTML for the rotating ship icon
      const iconHtml = `
        <div class="rotating-ship" style="transform: rotate(${shipBearing}deg);">
          <img src="${iconUrl}" width="24" height="24" />
        </div>
      `;

      const icon = L.divIcon({
        className: 'custom-ship-icon',
        html: iconHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([ship.lat, ship.lon], { icon }).bindPopup(this.createPopupContent(ship));
      this.markersLayer.addLayer(marker);
    });

    map.addLayer(this.markersLayer); // Add the markersLayer to the map
  }

  // Method to add a heatmap to the map
  addHeatMap(map: L.Map, data: ShipData[]): void {
    if (this.heatmapLayer) {
      map.removeLayer(this.heatmapLayer); // Remove existing heatmap layer if it exists
    }
    const heatData: L.HeatLatLngTuple[] = data.map((ship) => [ship.lat, ship.lon, 1.0]);
    this.heatmapLayer = L.heatLayer(heatData, { radius: 35, blur: 15, maxZoom: 17 }).addTo(map);
  }

  // Private method to create popup content for the marker
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
          <li>Course Over Ground: ${ship.courseOverGround || 'N/A'}</li>
          <li>Speed Over Ground: ${ship.speedOverGround || 'N/A'}</li>
          <li>Heading: ${ship.heading || 'N/A'}</li>
          <li>Last Received: ${timeAgo}</li>
        </ul>
      </div>
    `;
  }

  // Private method to calculate the time ago for the marker's data
  private getTimeAgo(timestamp: string): string {
    const now = moment();
    const then = moment(timestamp, 'DD-MM-YYYY HH:mm:ss');
    const duration = moment.duration(now.diff(then));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    return `${days} days ${hours} hours ${minutes} minutes ago`;
  }
}
