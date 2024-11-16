import { Component, OnInit } from '@angular/core';
import { PolygonZoneHandler } from './polygon-zone-handler';
import { CircleZoneHandler } from './circle-zone-handler';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  polygonZones: any[] = [];
  circleZones: any[] = [];
  ships: any[] = [];
  polygonShipCounts: { [key: string]: number } = {};
  circleShipCounts: { [key: string]: number } = {};
  currentSelectedPolygonZone: any = null;
  currentSelectedCircleZone: any = null;
  isMinimized = false; // State untuk meminimalkan kedua card

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized; // Toggle state
  }
  constructor(
    private polygonZoneHandler: PolygonZoneHandler,
    private circleZoneHandler: CircleZoneHandler,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadPolygonZones();
    this.loadCircleZones();
    this.loadShips();
  }

  // Memuat zona poligon menggunakan PolygonZoneHandler
  loadPolygonZones() {
    this.polygonZoneHandler.loadPolygonZones().subscribe(data => {
      this.polygonZones = data;
    });
  }

  // Memuat zona lingkaran menggunakan CircleZoneHandler
  loadCircleZones() {
    this.circleZoneHandler.loadCircleZones().subscribe(data => {
      this.circleZones = data;
    });
  }

  // Memuat data kapal dari DataService
  loadShips() {
    this.dataService.getShipsData().subscribe(data => {
      this.ships = data;
      this.updateAllZoneCounts(); // Memperbarui jumlah kapal di semua zona setelah memuat data kapal
    }, error => console.error('Failed to load ships:', error));
  }

  // Menangani pemilihan zona poligon
  onPolygonZoneSelected(zone: any) {
    this.currentSelectedPolygonZone = zone;
    this.updateShipCountInZone(zone, 'polygon');
  }

  // Menangani pemilihan zona lingkaran
  onCircleZoneSelected(zone: any) {
    this.currentSelectedCircleZone = zone;
    this.updateShipCountInZone(zone, 'circle');
  }

  // Memperbarui jumlah kapal di semua zona
  updateAllZoneCounts() {
    this.polygonZones.forEach(zone => {
      this.polygonShipCounts[zone._id] = this.ships.filter(ship => this.polygonZoneHandler.isShipInZone(ship, zone)).length;
    });
    this.circleZones.forEach(zone => {
      this.circleShipCounts[zone._id] = this.ships.filter(ship => this.circleZoneHandler.isShipInZone(ship, zone)).length;
    });
  }

  // Memperbarui jumlah kapal di zona yang dipilih
  updateShipCountInZone(zone: any, type: string) {
    if (!zone || !this.ships.length) return;
    const count = this.ships.filter(ship => this.isShipInZone(ship, zone, type)).length;
    if (type === 'polygon') {
      this.polygonShipCounts[zone._id] = count;
    } else if (type === 'circle') {
      this.circleShipCounts[zone._id] = count;
    }
  }

  // Memeriksa apakah kapal berada dalam zona tertentu (poligon atau lingkaran)
  isShipInZone(ship: any, zone: any, type: string): boolean {
    if (type === 'circle') {
      return this.circleZoneHandler.isShipInZone(ship, zone);
    } else if (type === 'polygon') {
      return this.polygonZoneHandler.isShipInZone(ship, zone);
    }
    return false;
  }

}
