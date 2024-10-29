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
// Method to add markers to the map
addMarkers(map: L.Map, data: ShipData[], selectedTypes: string[]): void {
  this.markersLayer.clearLayers();

  // Check if selectedTypes has valid entries; if not, return early
  if (!selectedTypes || selectedTypes.length === 0) {
      console.warn('No selected ship types. Skipping marker addition.');
      return;
  }

  // Filter data to include only ships that match selected types and are within the last 24 hours
  const filteredData = data.filter((ship) => {
      // Safely handle undefined ship.type
      const shipType = ship.type !== undefined ? ship.type.toString() : '';
      
      // Only include ships of selected types and recent ships within 24 hours
      return selectedTypes.includes(shipType) && this.isRecent(ship.timestamp);
  });

  if (filteredData.length === 0) {
      console.warn('No ship data available for selected types within the last 24 hours:', selectedTypes);
      return; // Exit if no data matches
  }

  // Add filtered markers to the map
  filteredData.forEach((ship) => {
      const iconUrl = IconService.getIconForShipType(ship.type).options.iconUrl;
      const shipBearing = ship.heading || ship.courseOverGround || 0;

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

      // Ensure latitude and longitude are defined
      if (ship.lat !== undefined && ship.lon !== undefined) {
          const marker = L.marker([ship.lat, ship.lon], { icon }).bindPopup(this.createPopupContent(ship));
          this.markersLayer.addLayer(marker);
      }
  });

  map.addLayer(this.markersLayer);
}




  // Method to check if the timestamp is within the last 24 hours
  private isRecent(timestamp: string): boolean {
    const now = moment();
    const shipTime = moment(timestamp, 'DD-MM-YYYY HH:mm:ss'); // Adjust format if needed
    return now.diff(shipTime, 'hours') < 24;
  }

  // Method to add a heatmap to the map
  addHeatMap(map: L.Map, data: ShipData[]): void {
    if (this.heatmapLayer) {
      map.removeLayer(this.heatmapLayer); // Remove existing heatmap layer if it exists
    }
    const heatData: L.HeatLatLngTuple[] = data.map((ship) => [
      ship.lat,
      ship.lon,
      1.0,
    ]);
    this.heatmapLayer = L.heatLayer(heatData, {
      radius: 35,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);
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
