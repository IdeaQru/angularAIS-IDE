import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { DataService } from '../data.service';
import { MapService } from '../services/map.service';
import { MarkerService } from '../services/marker.service';
import { HeatmapService } from '../services/heatmap.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit, OnDestroy {
  private dataSubscription?: Subscription;
  private aisUpdateSubscription?: Subscription;
  private shapeUpdateSubscription?: Subscription;
  searchQuery: string = '';
  private zones: any[] = [];  // Array untuk menyimpan data zona
  isFullscreen: boolean = false;

  constructor(
    private mapService: MapService,
    private dataService: DataService,
    private markerService: MarkerService,  // Correct service for handling markers
    private heatmapService: HeatmapService // Correct service for handling heatmaps
  ) { }

  ngOnInit(): void {
    this.mapService.initializeMap('map');
    this.loadAndDisplayData();
  }

  ngOnDestroy(): void {
    this.mapService.destroyMap();
    this.dataSubscription?.unsubscribe();
    this.aisUpdateSubscription?.unsubscribe();
    this.shapeUpdateSubscription?.unsubscribe();
  }

  private loadAndDisplayData(): void {
    this.dataSubscription = this.dataService.getShipsDataPeriodically().subscribe({
      next: (data) => {
        this.markerService.addMarkers(this.mapService.getMapInstance(), data); // Use the correct service for markers
        this.heatmapService.addHeatMap(this.mapService.getMapInstance(), data); // Use the correct service for heatmaps
      },
      error: (error) => console.error('Failed to load data:', error)
    });
  }


}
