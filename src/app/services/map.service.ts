import * as L from 'leaflet';
import 'leaflet-draw';
import 'leaflet.fullscreen';
import 'leaflet.heat';
import { Injectable } from '@angular/core';
import { IconService } from './icon.service';
import { BaseLayerService } from './base-layer.service';
import { DrawControlService } from './draw-control.service';
import * as moment from 'moment';
import 'moment-duration-format';
import { CoordinateControlService } from './add-coordinate.service';
import { SearchControlService } from './searchcontrol.service';
import { ShapeDataHandlerService } from './shape-data-handler.service';
import { PlaybackService } from './playback.service'; // Import PlaybackService

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
  private searchConrolService: SearchControlService | undefined;
  constructor(
    private drawControlService: DrawControlService,
    private searchControlService: SearchControlService, // Inject the SearchControlService
    private shapeDataHandlerService: ShapeDataHandlerService,
  private playbackService: PlaybackService


  ) {
    this.coordinateControlService = new CoordinateControlService(); // Initialize CoordinateControlService

  }

  initializeMap(containerId: string): L.Map {
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
    // Add the coordinate control and search control to the map
    this.coordinateControlService.addCoordinateControl(this.map);
    this.searchControlService.addSearchControl(this.map, this.focusOnShip.bind(this));
    this.drawControlService.loadShapes(this.map, this.drawnItems);
    return this.map;
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
      const layer = event.layer;
      this.drawnItems.addLayer(layer);
      // Trigger the SweetAlert popup using ShapeDataHandlerService
      this.shapeDataHandlerService.promptForLayerData(layer);
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
