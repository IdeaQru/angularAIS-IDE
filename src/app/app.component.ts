import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CircleZoneHandler } from './services/circle-zone-handler';
import { PolygonZoneHandler } from './services/polygon-zone-handler';

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
    this.polygonZoneHandler.loadPolygonZones().subscribe(zones => this.polygonZones = zones);
    this.circleZoneHandler.loadCircleZones().subscribe(zones => this.circleZones = zones);
  }

  monitorShips() {
    this.dataService.getShipsDataPeriodically().subscribe(ships => {
      this.ships = ships;
      this.dataService.checkShipsInZones(this.polygonZones, this.circleZones, this.ships);
    });
  }
}
