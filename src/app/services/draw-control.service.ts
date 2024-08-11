import { Injectable } from '@angular/core';
import * as L from 'leaflet';
// import { MapUtilities } from './map-utilities';
import { ShapeDataHandlerService } from './shape-data-handler.service';
import { ShapeService } from './shapeService';

// Define what properties a shape should have
interface Shape {
  type: string;
  coordinates: any; // Should be defined more specifically based on your data
  properties: {
    color: string;
  };
  _id: string; // Assuming _id is used as the identifier from MongoDB or similar
}

// Extend the Leaflet Layer to include custom properties like shapeId
interface CustomLayer extends L.Layer {
  shapeId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DrawControlService {
  constructor(
    private shapeDataHandler: ShapeDataHandlerService,
    private shapeService: ShapeService
  ) {}
  static createDrawControl(drawnItems: L.FeatureGroup): L.Control.Draw {
    return new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      },
      draw: {
        circle: {
          shapeOptions: {
            color: '#0000FF'
          }
        },
        polygon: {},
        rectangle: false,
        polyline: false,
        marker: false,
        circlemarker: false
      }
    });
  }

  handleDrawEvents(map: L.Map, drawnItems: L.FeatureGroup): void {
    map.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      drawnItems.addLayer(layer);
      this.shapeDataHandler.promptForLayerData(layer);
      // MapUtilities.saveDrawnItems(drawnItems);
    });

    map.on(L.Draw.Event.DELETED, (event: any) => {
      const layers = event.layers;
      layers.eachLayer((layer: any) => {
        if (layer.shapeId) {
          this.shapeService.deleteShape(layer.shapeId).subscribe({
            next: (res) => console.log('Shape deleted from server', res),
            error: (err) => {
              console.error('Error deleting shape', err);
              alert('Failed to delete shape: ' + err.message); // Display or handle error more visibly
            }
          });
        }
      });
    });

  }
  loadShapes(map: L.Map, drawnItems: L.FeatureGroup): void {
    this.shapeService.getShapes().subscribe(
      (shapes: any[]) => {
        shapes.forEach((shape) => {
          let layer: CustomLayer | undefined;

          if (shape.type === 'circle') {
            layer = L.circle([shape.coordinates.lat, shape.coordinates.lng], {
              radius: shape.coordinates.radius,
              color: shape.properties.color
            }) as CustomLayer;
          } else if (shape.type === 'polygon') {
            layer = L.polygon(shape.coordinates, {
              color: shape.properties.color
            }) as CustomLayer;
          }

          if (layer) {
            layer.addTo(drawnItems);
            this.bindPopupToLayer(layer, shape.properties.mmsi,shape.properties.name, shape.properties.status, shape.properties.description, shape.coordinates);
            layer.shapeId = shape._id; // Ensure shapeId is set here if not done yet
          }
        });
      },
      error => console.error('Error loading shapes:', error)
    );
 }
  private bindPopupToLayer(layer: any,mmsi:number, name: string, status: string, description: string, coordinates: any): void {
    let content = `<div><strong>Name:</strong> ${name}</div>
                   <div><strong>Status:</strong> ${status}</div>
                   <div><strong>Description:</strong> ${description}</div>`;

    if (layer instanceof L.Circle) {
      content += `<div><strong>Coordinates:</strong> ${coordinates.lat}, ${coordinates.lng}</div>`;
    } else if (layer instanceof L.Polygon) {
      content += `<div><strong>Coordinates:</strong><ul>`;
      (coordinates as L.LatLng[][]).forEach(latlngs => {
        latlngs.forEach(latlng => {
          content += `<li>${latlng.lat}, ${latlng.lng}</li>`;
        });
      });
      content += `</ul></div>`;
    }

    layer.bindPopup(content).openPopup();
  }
}
