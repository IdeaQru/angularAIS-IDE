// coordinate-control.service.ts
import * as L from 'leaflet';

export class CoordinateControlService {
  private coordinateControl: L.Control | undefined;

  // Method to add the coordinate control to the map
// Method to add the coordinate control to the map
addCoordinateControl(map: L.Map): void {
    const coordinateCardTemplate = `
      <div class="coordinate-card">
        <div class="coordinate-card-header">Map Coordinates</div>
        <div class="coordinate-card-body">
          <div><strong>Decimal Coordinates:</strong></div>
          <div>Lat: <span id="lat-decimal">0.00000</span>, Lng: <span id="lng-decimal">0.00000</span></div>
          <div><strong>DMS Coordinates:</strong></div>
          <div>Lat: <span id="lat-dms">0° 0' 0" N</span>, Lng: <span id="lng-dms">0° 0' 0" E</span></div>
        </div>
      </div>
    `;
  
    const CoordinateControl = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create('div', 'leaflet-coordinate-display');
        div.innerHTML = coordinateCardTemplate;
        this.applyInlineStyles(div);
        return div;
      }
    });
  
    this.coordinateControl = new CoordinateControl({ position: 'bottomleft' });
  
    if (this.coordinateControl) {
      this.coordinateControl.addTo(map);
      map.on('move', () => this.updateCoordinates(map));
    }
  }
  
  // Method to update the coordinates on the control
  updateCoordinates(map: L.Map): void {
    const latDecimalElement = document.getElementById('lat-decimal');
    const lngDecimalElement = document.getElementById('lng-decimal');
    const latDMSElement = document.getElementById('lat-dms');
    const lngDMSElement = document.getElementById('lng-dms');
  
    if (latDecimalElement && lngDecimalElement && latDMSElement && lngDMSElement) {
      const center = map.getCenter();
      latDecimalElement.innerText = center.lat.toFixed(5);
      lngDecimalElement.innerText = center.lng.toFixed(5);
      latDMSElement.innerText = this.convertToDMS(center.lat);
      lngDMSElement.innerText = this.convertToDMS(center.lng);
    }
  }
  
// Function to convert decimal coordinates to DMS (Degrees, Minutes, Seconds) format
private convertToDMS(coordinate: number): string {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);
  
    const direction = coordinate >= 0 ? (coordinate === absolute ? 'N' : 'E') : (coordinate === absolute ? 'S' : 'W');
  
    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  }
  
  // Method to update the coordinates on the control


  // Apply inline styles to the coordinate card
  private applyInlineStyles(div: HTMLElement): void {
    div.style.backgroundColor = 'rgba(161, 154, 154, 0)'; // Semi-transparent background
    div.style.color = '#000'; // Black text for readability
    div.style.borderRadius = '8px';
    div.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.3)';
    div.style.width = '200px';
    div.style.overflow = 'hidden';
    div.style.margin = '5px';
    div.style.position = 'absolute';
    div.style.bottom = '15px';
    div.style.left = '15px';

    const header = div.querySelector('.coordinate-card-header') as HTMLElement;
    if (header) {
      header.style.backgroundColor = 'rgba(161, 154, 154, 0)';
      header.style.color = 'black';
      header.style.padding = '8px';
      header.style.fontWeight = 'bold';
      header.style.textAlign = 'center';
    }

    const body = div.querySelector('.coordinate-card-body') as HTMLElement;
    const coordinateLines = body.querySelectorAll('div');
    coordinateLines.forEach((line: HTMLElement) => {
      line.style.marginBottom = '4px'; // Add spacing between lines for clearer layout
    });
  }
}
