import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShapeDataHandlerService {
  private apiUrl = `${environment.apiUrl}/shapes`;  // Ambil URL API dari environment


  constructor(private http: HttpClient) {}

  /**
   * Prompts the user to enter data for the shape layer using SweetAlert.
   * Ensures that the popup remains visible during fullscreen mode.
   * @param layer - The drawn shape layer (Circle or Polygon)
   */
  promptForLayerData(layer: any): void {
    const coordinates = layer instanceof L.Circle ? layer.getLatLng() : layer.getLatLngs();

    Swal.fire({
      title: 'Enter Shape Data',
      target: document.body, // Ensures the popup is attached directly to the body element
      html: this.getHtmlForSwal(),
      focusConfirm: false,
      preConfirm: () => this.getShapeDataFromInput()
    }).then((result) => {
      if (result.value) {
        const dataToSend = this.createDataObject(result.value, layer, coordinates);
        this.sendDataToServer(dataToSend);
      }
    });

    // Ensure that the popup is visible during fullscreen
  }

  /**
   * Ensures that the SweetAlert popup remains visible even when the map is in fullscreen mode.
   */


  /**
   * Creates the HTML content for the SweetAlert popup.
   */
  private getHtmlForSwal(): string {
    return `
      <input id="mmsi" class="swal2-input" type="number" placeholder="MMSI" min="0" required>
      <input id="name" class="swal2-input" placeholder="Name" required>
      <select id="status" class="swal2-input">
        <option value="">Choose Status</option>
        <option value="Warning">Warning</option>
        <option value="Danger">Danger</option>
      </select>
      <textarea id="description" class="swal2-textarea" placeholder="Description"></textarea>
    `;
  }
  private createDataObject(inputData: { mmsi: number; name: string; status: string; description: string }, layer: any, coordinates: any): any {
    const color = this.getColorBasedOnStatus(inputData.status);

    if (layer.setStyle) {
      layer.setStyle({ color });
    }

    return {
      type: layer instanceof L.Circle ? 'circle' : 'polygon',
      properties: {
        ...inputData,
        color,
        opacity: 0.8
      },
      coordinates: this.getCoordinatesData(layer, coordinates)
    };
  }

  /**
   * Determines the color based on the status of the shape.
   */
  private getColorBasedOnStatus(status: string): string {
    switch (status) {
      case 'Warning': return '#FFFF00'; // Yellow
      case 'Danger': return '#FF0000';  // Red
      default: return '#0000FF';        // Blue
    }
  }

  /**
   * Extracts coordinates data from the shape layer.
   */
  private getCoordinatesData(layer: any, coordinates: any): any {
    if (layer instanceof L.Circle) {
      return { lat: coordinates.lat, lng: coordinates.lng, radius: layer.getRadius() };
    } else {
      return coordinates.map((latlngs: L.LatLng[]) => latlngs.map(latlng => ({ lat: latlng.lat, lng: latlng.lng })));
    }
  }
  /**
   * Retrieves the shape data from the SweetAlert input fields.
   */
  private getShapeDataFromInput(): { mmsi: number; name: string; status: string; description: string } | null {
    const mmsi = (document.getElementById('mmsi') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const status = (document.getElementById('status') as HTMLSelectElement).value;
    const description = (document.getElementById('description') as HTMLTextAreaElement).value;

    // Validate the input data
    if (!mmsi || isNaN(Number(mmsi))) {
      Swal.showValidationMessage('MMSI is required and must be a number');
      return null;
    }
    return { mmsi: Number(mmsi), name, status, description };
  }

  /**
   * Sends the shape data to the server using HTTP POST.
   */
  private sendDataToServer(data: any): void {
    this.http.post(this.apiUrl, data).pipe(
      tap(response => console.log('Data sent successfully:', response)),
      catchError(error => {
        console.error('Error sending data:', error);
        return throwError(error);
      })
    ).subscribe();
  }
  
}
