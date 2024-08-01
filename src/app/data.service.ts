import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, Subject, switchMap } from 'rxjs';
import { CircleZoneHandler } from './services/circle-zone-handler';
import { PolygonZoneHandler } from './services/polygon-zone-handler';
import { NotificationService, Notification } from './services/notification.service';
import { io } from 'socket.io-client';

export interface ShipData {
  mmsi: number;
  lon: number;
  lat: number;
  name: string;
  type: number;
  timestamp: string;
  destination?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://103.24.48.92:3000/api/ships';  // Ganti dengan URL server API Anda
  private previousShipsInZones: Set<string> = new Set();
  private socket: any;

  constructor(
    private http: HttpClient,
    private circleZoneHandler: CircleZoneHandler,
    private polygonZoneHandler: PolygonZoneHandler,
    private notificationService: NotificationService
  ) {
    this.initializeWebSocketConnection();
  }

  getShipsData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getShipsDataPeriodically(): Observable<any> {
    return interval(10000).pipe(
      switchMap(() => this.getShipsData())
    );
  }

  checkShipsInZones(polygonZones: any[], circleZones: any[], ships: any[]) {
    const currentShipsInZones = new Set<string>();

    polygonZones.forEach(zone => {
      ships.forEach(ship => {
        if (this.polygonZoneHandler.isShipInZone(ship, zone)) {
          currentShipsInZones.add(ship.mmsi);
          if (!this.previousShipsInZones.has(ship.mmsi)) {
            this.notificationService.addNotification({
              message: `Ship ${ship.name} (${ship.mmsi}) entered polygon zone ${zone.properties?.name}`,
              timestamp: new Date().toLocaleTimeString()
            });
          }
        }
      });
    });

    circleZones.forEach(zone => {
      ships.forEach(ship => {
        if (this.circleZoneHandler.isShipInZone(ship, zone)) {
          currentShipsInZones.add(ship.mmsi);
          if (!this.previousShipsInZones.has(ship.mmsi)) {
            this.notificationService.addNotification({
              message: `Ship ${ship.name} (${ship.mmsi}) entered circle zone ${zone.properties?.name}`,
              timestamp: new Date().toLocaleTimeString()
            });
          }
        }
      });
    });

    this.previousShipsInZones = currentShipsInZones;
  }

  private initializeWebSocketConnection() {
    this.socket = io('http://localhost:3000'); // Sesuaikan URL dengan kebutuhan Anda
    this.socket.on('aisData', (data: ShipData) => {
      const notification: Notification = {
        message: `Ship ${data.name} (${data.mmsi}) entered zone at ${new Date(data.timestamp).toLocaleTimeString()}`,
        timestamp: new Date().toLocaleTimeString()
      };
      this.notificationService.addNotification(notification);
    });
  }
}
