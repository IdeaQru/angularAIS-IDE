import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { DataService } from '../data.service';
import { MapService } from '../services/map.service';
import { SocketService } from '../services/socket.service';

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
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
    this.mapService.initializeMap('map');
    this.setupRealtimeUpdates();
    this.loadAndDisplayData();
    
    // this.loadZones();  // Memuat data zona
  }


 
  ngOnDestroy(): void {
    this.mapService.destroyMap();
    this.socketService.disconnect();
    this.dataSubscription?.unsubscribe();
    this.aisUpdateSubscription?.unsubscribe();
    this.shapeUpdateSubscription?.unsubscribe();
  }

  private loadAndDisplayData(): void {
    this.dataSubscription = this.dataService.getShipsDataPeriodically().subscribe({
      next: (data) => {
        this.mapService.addMarkers(data);
        this.mapService.addHeatMap(data);
      },
      error: (error) => console.error('Failed to load data:', error)
    });
  }

  private setupRealtimeUpdates(): void {
    this.aisUpdateSubscription = this.socketService.onAisDataUpdate().pipe(
      throttleTime(1000)
    ).subscribe(data => {
      this.mapService.addMarkers([data]);
      this.mapService.addHeatMap([data]);
    });

    this.shapeUpdateSubscription = this.socketService.onShapeDataUpdate().subscribe(data => {
      this.mapService.addMarkers([data]);
      this.mapService.addHeatMap([data]);
    });
    console.log(this.aisUpdateSubscription);
  }






  
}
