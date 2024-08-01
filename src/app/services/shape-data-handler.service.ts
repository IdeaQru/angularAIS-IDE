import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface Ship {
  name: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShapeDataHandlerService {
  private apiUrl = 'http://103.24.48.92:3000/api/shapes';
  private shipsApiUrl = 'http://103.24.48.92:3000/api/ships';
  private shipsCache!: Ship[];

  constructor(private http: HttpClient) {}

  // Prompt the user to enter data for a zone
  promptForLayerData(layer: any): void {
    const coordinates = layer instanceof L.Circle ? layer.getLatLng() : layer.getLatLngs();
    Swal.fire({
      title: 'Enter Shape Data',
      html: this.getHtmlForSwal(),
      focusConfirm: false,
      preConfirm: () => this.getShapeData()
    }).then((result) => {
      if (result.value) {
        const { name, status, description } = result.value;
        const dataToSend = this.createDataObject(name, status, description, layer, coordinates);
        this.sendDataToServer(dataToSend);
      }
    });
  }

  // HTML for SweetAlert prompt
  getHtmlForSwal(): string {
    return '<input id="name" class="swal2-input" placeholder="Name">' +
           '<select id="status" class="swal2-input">' +
           '<option value="">Choose Status</option>' +
           '<option value="Warning">Warning</option>' +
           '<option value="Danger">Danger</option>' +
           '</select>' +
           '<textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>';
  }

  // Retrieve data from the SweetAlert dialog
  getShapeData(): any {
    return {
      name: (document.getElementById('name') as HTMLInputElement).value,
      status: (document.getElementById('status') as HTMLSelectElement).value,
      description: (document.getElementById('description') as HTMLTextAreaElement).value
    };
  }

  // Create a data object for the zone
  private createDataObject(name: string, status: string, description: string, layer: any, coordinates: any): any {
    const color = this.getColorBasedOnStatus(status);
    if (layer.setStyle) {
      layer.setStyle({ color });
    }

    return {
      type: layer instanceof L.Circle ? 'circle' : 'polygon',
      properties: {
        name,
        status,
        description,
        color,
        opacity: 0.8
      },
      coordinates: this.getCoordinatesData(layer, coordinates)
    };
  }

  // Determine the color based on status
  private getColorBasedOnStatus(status: string): string {
    switch (status) {
      case 'Warning': return '#FFFF00'; // Yellow
      case 'Danger': return '#FF0000';  // Red
      default: return '#0000FF';        // Blue
    }
  }

  // Get coordinates data
  private getCoordinatesData(layer: any, coordinates: any): any {
    if (layer instanceof L.Circle) {
      return { lat: coordinates.lat, lng: coordinates.lng, radius: layer.getRadius() };
    } else {
      return coordinates.map((latlngs: L.LatLng[]) => latlngs.map(latlng => ({ lat: latlng.lat, lng: latlng.lng })));
    }
  }

  // Send data to the server
  private sendDataToServer(data: any): void {
    this.http.post(this.apiUrl, data).subscribe({
      next: response => console.log('Data sent successfully', response),
      error: error => console.error('Error sending data', error)
    });
  }



}
