import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PolygonZoneHandler } from '../main/polygon-zone-handler';
import { CircleZoneHandler } from '../main/circle-zone-handler';
import { DataService } from '../data.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  polygonZones: any[] = [];
  circleZones: any[] = [];
  ships: any[] = [];
  filteredShips = new MatTableDataSource<any>();
  displayedColumns: string[] = ['mmsi', 'name', 'lat', 'lon', 'type', 'timestamp', 'destination'];
  selectedZoneType: string = '';
  pageSize: number = 25;
  selectedZoneName: string = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

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

  ngAfterViewInit() {
    this.filteredShips.paginator = this.paginator;
  }

  loadPolygonZones() {
    this.polygonZoneHandler.loadPolygonZones().subscribe(data => {
      this.polygonZones = data;
    });
  }

  loadCircleZones() {
    this.circleZoneHandler.loadCircleZones().subscribe(data => {
      this.circleZones = data;
    });
  }

  loadShips() {
    this.dataService.getShipsData().subscribe(data => {
      this.ships = data;
      this.updateAllZoneCounts(); // Update ship counts for all zones after loading ships
    }, error => console.error('Failed to load ships:', error));
  }

  onZoneTypeChange(type: string) {
    this.selectedZoneType = type;
    this.filteredShips.data = [];
  }

  onZoneChange(zone: any) {
    this.selectedZoneName = zone.properties?.name || 'Unknown Zone';
    this.filteredShips.data = this.ships.filter(ship => this.isShipInZone(ship, zone, this.selectedZoneType));
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.paginator.pageSize = size;
  }

  isShipInZone(ship: any, zone: any, type: string): boolean {
    if (type === 'circle') {
      return this.circleZoneHandler.isShipInZone(ship, zone);
    } else if (type === 'polygon') {
      return this.polygonZoneHandler.isShipInZone(ship, zone);
    }
    return false;
  }

  updateAllZoneCounts() {
    // This method is kept in case you want to update counts for zones without selection
  }

  downloadPDF() {
    const doc = new jsPDF();
    const zoneName = this.selectedZoneName || 'Unknown Zone';
    const date = new Date();
    const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const fileName = `Report_of_${zoneName}_${dateString}.pdf`;

    const head = [['MMSI', 'Name', 'Latitude', 'Longitude', 'Type', 'Timestamp', 'Destination']];
    const data = this.filteredShips.data.map((ship: any) => [ship.mmsi, ship.name, ship.lat, ship.lon, ship.type, ship.timestamp, ship.destination]);

    doc.text(`Laporan Zona ${zoneName}`, 14, 10);
    doc.text(` ${dateString}`, 14, 20);
    doc.text(`Jumlah Kapal: ${this.filteredShips.data.length}`, 14, 30);

    autoTable(doc, {
      head: head,
      body: data,
      styles: {
        fontSize: 8
      },
      margin: { top: 40 }
    });

    doc.save(fileName);
  }
}
