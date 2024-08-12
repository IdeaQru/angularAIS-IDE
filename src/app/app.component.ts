import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CircleZoneHandler } from './services/circle-zone-handler';
import { PolygonZoneHandler } from './services/polygon-zone-handler';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AIS Asset Web App';
  polygonZones: any[] = [];
  circleZones: any[] = [];
  ships: any[] = [];
  previousShips: any[] = []; // Menyimpan data kapal sebelumnya

  constructor(
    private dataService: DataService,
    private circleZoneHandler: CircleZoneHandler,
    private polygonZoneHandler: PolygonZoneHandler
  ) {}

  ngOnInit() {
    this.loadZones();
    this.monitorShips();
  }

  loadZones() {
    this.polygonZoneHandler.loadPolygonZones().subscribe(zones => {
      this.polygonZones = zones;
    });

    this.circleZoneHandler.loadCircleZones().subscribe(zones => {
      this.circleZones = zones;
    });
  }

  monitorShips() {
    // Menggunakan combineLatest untuk menunggu kedua zona dan data kapal
    combineLatest([
      this.polygonZoneHandler.loadPolygonZones(),
      this.circleZoneHandler.loadCircleZones(),
      this.dataService.getShipsDataPeriodically()
    ]).subscribe(([polygonZones, circleZones, ships]) => {
      this.polygonZones = polygonZones;
      this.circleZones = circleZones;
      this.ships = ships;

      // Panggil checkShipsInZones hanya jika ada kapal baru atau aplikasi baru dibuka
      if (this.previousShips.length === 0 || this.ships.length !== this.previousShips.length) {
        this.dataService.checkShipsInZones(this.polygonZones, this.circleZones, this.ships);
      }

      // Perbarui previousShips dengan data kapal terbaru
      this.previousShips = [...this.ships];
    });
  }
}
