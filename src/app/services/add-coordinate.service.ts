import * as L from 'leaflet';
import Swal from 'sweetalert2';

export class CoordinateControlService {
  private coordinateControl: L.Control | undefined;
  private trackCursor: boolean = false; // Flag to toggle between center and cursor tracking
  private lockedMarker: L.Marker | undefined;

  // Method to add the coordinate control to the map
  addCoordinateControl(map: L.Map): void {
    const coordinateCardTemplate = `
      <div class="coordinate-card">
        <div class="coordinate-card-header">Map Coordinates</div>
        <div class="coordinate-card-body">
          <div class="toggle-slider-container">
            <label class="switch">
              <input type="checkbox" id="coordinate-toggle">
              <span class="slider"></span>
            </label>
            <span class="toggle-label" id="toggle-label">Center</span>
          </div>
          <div id="coordinate-info">
            <div><strong>Decimal Coordinates:</strong></div>
            <div>Lat: <span id="lat-decimal">0.00000</span>, Lng: <span id="lng-decimal">0.00000</span></div>
            <div><strong>DMS Coordinates:</strong></div>
            <div>Lat: <span id="lat-dms">0° 0' 0" N</span>, Lng: <span id="lng-dms">0° 0' 0" E</span></div>
          </div>
        </div>
      </div>
    `;

    const CoordinateControl = L.Control.extend({
      onAdd: () => {
        const div = L.DomUtil.create('div', 'leaflet-coordinate-display');
        div.innerHTML = coordinateCardTemplate;
        this.applyInlineStyles(div);
        this.setupSliderToggle(div, map);
        return div;
      }
    });

    this.coordinateControl = new CoordinateControl({ position: 'bottomleft' });

    if (this.coordinateControl) {
      this.coordinateControl.addTo(map);
      map.on('move', () => this.updateCoordinates(map));
      map.on('mousemove', (event: L.LeafletMouseEvent) => {
        if (this.trackCursor) {
          this.updateCoordinates(map, event.latlng);
        }
      });
      map.on('dblclick', (event: L.LeafletMouseEvent) => this.lockCoordinates(map, event.latlng));
    }
  }

  // Method to lock coordinates on double-click and display a marker with a SweetAlert popup
  private lockCoordinates(map: L.Map, latlng: L.LatLng): void {
    // Remove the previous marker if it exists
    if (this.lockedMarker) {
      map.removeLayer(this.lockedMarker);
    }

    // Add a marker at the clicked position
    this.lockedMarker = L.marker(latlng).addTo(map);

    // Show a SweetAlert popup with the coordinates
    Swal.fire({
      title: 'Coordinates Locked',
      html: `
        <div><strong>Decimal Coordinates:</strong></div>
        <div>Lat: ${latlng.lat.toFixed(5)}, Lng: ${latlng.lng.toFixed(5)}</div>
        <div><strong>DMS Coordinates:</strong></div>
        <div>Lat: ${this.convertToDMS(latlng.lat)}, Lng: ${this.convertToDMS(latlng.lng)}</div>
      `,
      confirmButtonText: 'OK'
    });

    // Update the coordinate display with the locked location
    this.updateCoordinates(map, latlng);
  }

  // Method to set up the slider toggle for center/cursor coordinate tracking
  private setupSliderToggle(div: HTMLElement, map: L.Map): void {
    const toggleInput = div.querySelector('#coordinate-toggle') as HTMLInputElement;
    const toggleLabel = div.querySelector('#toggle-label') as HTMLElement;

    toggleInput.addEventListener('change', () => {
      this.trackCursor = toggleInput.checked;
      toggleLabel.innerText = this.trackCursor ? 'Cursor' : 'Center';

      // Remove marker if center mode is active
      if (!this.trackCursor && this.lockedMarker) {
        map.removeLayer(this.lockedMarker);
        this.lockedMarker = undefined;
      }

      this.updateCoordinates(map); // Update coordinates to show the correct mode immediately
    });
  }

  // Method to update the coordinates on the control based on either map center or cursor position
  private updateCoordinates(map: L.Map, cursorLatLng?: L.LatLng): void {
    const latDecimalElement = document.getElementById('lat-decimal');
    const lngDecimalElement = document.getElementById('lng-decimal');
    const latDMSElement = document.getElementById('lat-dms');
    const lngDMSElement = document.getElementById('lng-dms');

    const latLng = cursorLatLng || map.getCenter(); // Use cursor position if tracking, otherwise map center

    if (latDecimalElement && lngDecimalElement && latDMSElement && lngDMSElement) {
      latDecimalElement.innerText = latLng.lat.toFixed(5);
      lngDecimalElement.innerText = latLng.lng.toFixed(5);
      latDMSElement.innerText = this.convertToDMS(latLng.lat);
      lngDMSElement.innerText = this.convertToDMS(latLng.lng);
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

  // Apply inline styles to the coordinate card and the slider toggle
  private applyInlineStyles(div: HTMLElement): void {
    div.style.backgroundColor = 'rgba(161, 154, 154, 0)'; // Semi-transparent background
    div.style.color = '#000'; // Black text for readability
    div.style.borderRadius = '8px';
    div.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.3)';
    div.style.width = '250px';
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

    // Style for the slider toggle
    const sliderStyle = document.createElement('style');
    sliderStyle.innerHTML = `
      .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
      }
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 34px;
      }
      .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 4px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }
      input:checked + .slider {
        background-color: #007bff;
      }
      input:checked + .slider:before {
        transform: translateX(26px);
      }
      .toggle-label {
        margin-left: 10px;
        font-size: 14px;
        color: #000;
      }
    `;
    document.head.appendChild(sliderStyle);
  }
}
