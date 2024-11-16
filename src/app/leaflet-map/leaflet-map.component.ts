// leaflet-map.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { MapService } from '../services/map.service';
import { MarkerService } from '../services/marker.service';
import { HeatmapService } from '../services/heatmap.service';
import { IconService } from '../services/icon.service';
import { ShipData } from '../services/map.service'; // Import ShipData from map.service

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit, OnDestroy {
  private dataSubscription?: Subscription;
  // private selectedTypes: string[] = []; // Filtered ship types
  private  selectedTypes: string[] = [
    ...Array.from({ length: 20 }, (_, i) => i.toString()), // 0-19
    ...Array.from({ length: 40 }, (_, i) => (90 + i).toString()), // 90-129
    '30', // Fishing
    '31', '32', // Tug
    '36', // Pleasure
    ...Array.from({ length: 10 }, (_, i) => (20 + i).toString()), // Cargo (20-29)
    ...Array.from({ length: 10 }, (_, i) => (70 + i).toString()), // Cargo (70-79)
    ...Array.from({ length: 10 }, (_, i) => (80 + i).toString()), // Tanker (80-89)
    ...Array.from({ length: 20 }, (_, i) => (40 + i).toString()), // Highspeed (40-59)
    ...Array.from({ length: 10 }, (_, i) => (60 + i).toString()) // Passenger (60-69)
  ];

  constructor(
    private mapService: MapService,
    private dataService: DataService,
    private markerService: MarkerService,
    private heatmapService: HeatmapService
  ) {}

  ngOnInit(): void {
    this.mapService.initializeMap('map', (selectedTypes) => this.onFilterUpdate(selectedTypes));
    this.loadAndDisplayData();

    // Show the filter popup on initialization
    // IconService.showOptionsPopup((selectedTypes) => this.onFilterUpdate(selectedTypes));
  }
  showFilterOptions(): void {
    IconService.showOptionsPopup((selectedTypes) => this.onFilterUpdate(selectedTypes));
  }

  ngOnDestroy(): void {
    this.mapService.destroyMap();
    this.dataSubscription?.unsubscribe();
  }

  private loadAndDisplayData(): void {
    this.dataSubscription = this.dataService.getShipsDataPeriodically().subscribe({
      next: (data: ShipData[]) => {
        // Log each ship to verify its structure
        // console.log('Loaded data:', data);

        const filteredData = this.selectedTypes.length
          ? data.filter(ship => {
              // Ensure 'type' exists and is valid before checking inclusion
              if (ship.type === undefined || ship.type === null) {
               ship.type = 0;
              }
              return this.selectedTypes.includes(ship.type.toString());
            })
          : data;

        this.markerService.addMarkers(this.mapService.getMapInstance(), filteredData, this.selectedTypes);
        this.heatmapService.addHeatMap(this.mapService.getMapInstance(), filteredData);
      },
      error: (error) => console.error('Failed to load data:', error)
    });
  }


  private onFilterUpdate(selectedTypes: string[]): void {
    this.selectedTypes = selectedTypes;
    console.log('Selected Types:', this.selectedTypes); // Check if selectedTypes has values

    this.loadAndDisplayData(); // Reload data with updated filters
  }
}
