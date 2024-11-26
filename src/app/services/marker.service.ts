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
  addMarkers(map: L.Map, data: ShipData[], selectedTypes: string[]): void {
    // Check if selectedTypes has valid entries; if not, return early
    if (!selectedTypes || selectedTypes.length === 0) {
      console.warn('No selected ship types. Skipping marker addition.');
      return;
    }
  
    // Filter data to include only ships that match selected types and are within the last 24 hours
    const filteredData = data.filter((ship) => {
      const shipType = ship.type !== undefined ? ship.type.toString() : '';
      return selectedTypes.includes(shipType);
    });
  
    if (filteredData.length === 0) {
      console.warn('No ship data available for selected types:', selectedTypes);
      return;
    }
  
    // Add or update filtered markers
    filteredData.forEach((ship) => {
      const shipBearing = ship.heading || ship.courseOverGround || 0;
      const iconUrl = IconService.getIconForShipType(ship.type).options.iconUrl;
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
        let marker = this.findMarkerByMmsi(ship.mmsi);
  
        // If marker does not exist, create a new one
        if (!marker) {
          const directionLine = this.createDirectionLine(ship.lat, ship.lon, shipBearing);
          this.markersLayer.addLayer(directionLine);

          marker = L.marker([ship.lat, ship.lon], { icon }).bindPopup(this.createPopupContent(ship));
          this.markersLayer.addLayer(marker);
          setTimeout(() => {
            this.markersLayer.removeLayer(directionLine);
          }, 2000);  // Remove after 2 seconds
          marker.setPopupContent(this.createPopupContent(ship));
        
        } else {

          this.markersLayer.removeLayer(marker);

      
        }
      }
    });
  
    map.addLayer(this.markersLayer);
  }
  
  // Helper method to find a marker by its MMSI (assuming marker's mmsi is stored in the popup or data)
  
  

  // Method to create a direction line (arrow) indicating ship movement
  private createDirectionLine(lat: number, lon: number, bearing: number): L.Polyline {
    const distance = 0.01; // Distance for the line (adjust as necessary)
    const angleRad = (bearing * Math.PI) / 180; // Convert bearing to radians
  
    // Calculate the end point of the direction line
    const endLat = lat + Math.sin(angleRad) * distance;
    const endLon = lon + Math.cos(angleRad) * distance;
  
    // Create the initial line (arrow) from the ship's position to the direction it is heading
    const line = L.polyline([[lat, lon], [endLat, endLon]], {
      color: 'red', // Color of the direction line
      weight: 3,    // Line weight
      opacity: 0.7, // Line opacity
      dashArray: '5,10', // Dash line effect
    });
  
    // Add animation: Move the end point of the line step by step
    let steps = 20; // Number of steps for the animation
    let currentStep = 0;
  
    // Function to animate the line
    const animateLine = () => {
      if (currentStep < steps) {
        // Increase the end point distance step by step
        const newDistance = (currentStep / steps) * 0.05; // Increase line distance gradually
  
        const newEndLat = lat + Math.sin(angleRad) * newDistance;
        const newEndLon = lon + Math.cos(angleRad) * newDistance;
  
        // Update the polyline with the new end point
        line.setLatLngs([[lat, lon], [newEndLat, newEndLon]]);
        
        currentStep++;
      } else {
        // Stop animation after it reaches the final position
        clearInterval(animationInterval);
      }
    };
  
    // Set an interval to animate the line every 50ms
    const animationInterval = setInterval(animateLine, 50);
  
    return line;
  }
  

  
  // Helper method to find a marker by its MMSI (assuming marker's mmsi is stored in the popup or data)
  private findMarkerByMmsi(mmsi: number): L.Marker | undefined {
    let foundMarker: L.Marker | undefined;
    this.markersLayer.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Marker) {
        const popupContent = layer.getPopup()?.getContent();
        if (popupContent && typeof popupContent === 'string' && popupContent.includes(mmsi.toString())) {
          foundMarker = layer;
        }
      }
    });
    return foundMarker;
  }
  private createPopupContent(ship: ShipData): string {
    const timeAgo =this.getTimeAgo(ship.timestamp);
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
