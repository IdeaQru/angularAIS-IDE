import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet.fullscreen';
import 'leaflet.heat';
import { Injectable } from '@angular/core';
import { BaseLayerService } from './base-layer.service';
import { DrawControlService } from './draw-control.service';
import * as moment from 'moment';
import 'moment-duration-format';
import { CoordinateControlService } from './add-coordinate.service';
import { SearchControlService } from './searchcontrol.service';
import { ShapeDataHandlerService } from './shape-data-handler.service';
import { PlaybackService } from './playback.service'; // Import PlaybackService
import { IconService } from './icon.service';  // Pastikan file service diimport
import { ShapeService } from './shapeService';

export interface ShipData {
  mmsi: number;
  lon: number;
  lat: number;
  name: string;
  type: number;
  timestamp: string;
  courseOverGround?: number;
  speedOverGround?: number;
  heading?: number;
  destination?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!: L.Map;
  private layersControl!: L.Control.Layers;
  private drawnItems: L.FeatureGroup = new L.FeatureGroup();
  private heatmapLayer?: L.Layer;
  private coordinateControlService: CoordinateControlService;
  constructor(
    private drawControlService: DrawControlService,
    private searchControlService: SearchControlService, // Inject the SearchControlService
    private shapeDataHandlerService: ShapeDataHandlerService,
  private playbackService: PlaybackService,
  private iconService: IconService,
  private shapeService: ShapeService


  ) {
    this.coordinateControlService = new CoordinateControlService(); // Initialize CoordinateControlService

  }

  initializeMap(containerId: string, onFilterUpdate: (selectedTypes: string[]) => void): L.Map {
    this.map = L.map(containerId, {
      center: [-7.18643057415128, 112.71902662227242],
      zoom: 8,
      fullscreenControl: true,
      fullscreenControlOptions: { position: 'topright' }
    });

    this.addBaseLayers();
    this.map.addLayer(this.drawnItems);
    this.setupDrawControl();
    this.playbackService.initializePlayback(this.map);
    this.addLegend(onFilterUpdate); // Pass onFilterUpdate to addLegend
    this.coordinateControlService.addCoordinateControl(this.map);
    this.searchControlService.addSearchControl(this.map, this.focusOnShip.bind(this));
    this.drawControlService.loadShapes(this.map, this.drawnItems);
    return this.map;
  }

  // Modify addLegend to receive onFilterUpdate as a parameter
  private addLegend(onFilterUpdate: (selectedTypes: string[]) => void): void {
    const legendControl = IconService.createLegendControl(onFilterUpdate); // Use createLegendControl with callback
    legendControl.addTo(this.map);
  }
  private addBaseLayers(): void {
    const defaultLayer = BaseLayerService.baseLayers['Ocean'];
    defaultLayer.addTo(this.map);
    this.layersControl = L.control.layers(BaseLayerService.baseLayers).addTo(this.map);
  }

  private setupDrawControl(): void {
    const drawControl = DrawControlService.createDrawControl(this.drawnItems);
    this.map.addControl(drawControl);

    // Listen for drawing events to trigger the SweetAlert popup
    this.map.on(L.Draw.Event.CREATED, (event: any) => {
      console.log('Draw event triggered');
      const layer = event.layer;
      this.drawnItems.addLayer(layer);
      // Trigger the SweetAlert popup using ShapeDataHandlerService
      this.shapeDataHandlerService.promptForLayerData(layer);
    });

    this.map.on(L.Draw.Event.DELETED, (event: any) => {
      const layers = event.layers;
      layers.eachLayer((layer: any) => {
        if (layer.shapeId) {
          console.log('Deleting shape with id', layer.shapeId);
          this.shapeService.deleteShape(layer.shapeId).subscribe({
            next: (res) => {
              console.log('Shape deleted successfully from server:', res);
            },
            error: (err) => {
              console.error('Error deleting shape:', err);
              alert('Failed to delete shape from server: ' + err.message);
            }
          });
        } else {
          console.log('Layer does not have shapeId');
        }
      });
    });
  }



focusOnShip(ship: ShipData): void {
  this.map.setView([ship.lat, ship.lon], 18);
}

// In map.service.ts
getMapInstance(): L.Map {
  return this.map;
}

  destroyMap(): void {
    this.map.remove();
  }
}
