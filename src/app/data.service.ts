import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { interval, Observable, Subject, switchMap } from 'rxjs';
import { CircleZoneHandler } from './services/circle-zone-handler';
import { PolygonZoneHandler } from './services/polygon-zone-handler';
import { NotificationService, Notification } from './services/notification.service';

export interface ShipData {
  mmsi: number;
  lon: number;
  lat: number;
  name: string;
  type: number;
  timestamp: string;
  destination?: string;
}

export interface Zone {
  type: 'polygon' | 'circle';
  properties?: any;
  coordinates: number[][] | number[][][];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/ships';  // Adjust this to your API endpoint
  private socketUrl = 'http://localhost:3000';  // Adjust to your WebSocket server URL
  private socket!: Socket;
  public shipDataStream = new Subject<ShipData[]>();

  constructor(
    private http: HttpClient,
    private circleZoneHandler: CircleZoneHandler,
    private polygonZoneHandler: PolygonZoneHandler,
    private notificationService: NotificationService
  ) {
    this.initializeWebSocketConnection();
  }

  getShipsData(): Observable<ShipData[]> {
    return this.http.get<ShipData[]>(this.apiUrl);
  }

  getShipsDataPeriodically(): Observable<ShipData[]> {
    return interval(30000).pipe(switchMap(() => this.getShipsData()));
  }

  private initializeWebSocketConnection() {
    this.socket = io(this.socketUrl, {
      path: '/socket.io'
    });
    this.socket.on('connect', () => console.log('Connected to WebSocket server!'));
    this.socket.on('aisData', (data: ShipData[]) => {
      console.log('Received ship data via WebSocket:', data);
      this.shipDataStream.next(data);
    });
    this.socket.on('disconnect', () => console.log('Disconnected from WebSocket server'));
    this.socket.on('error', (error: any) => console.error('WebSocket error:', error));
  }

  checkShipsInZones(zones: Zone[], ships: ShipData[]): void {
    zones.forEach(zone => {
      ships.forEach(ship => {
        let inZone = false;
        if (zone.type === 'circle') {
          inZone = this.circleZoneHandler.isShipInZone(ship, zone);
        } else if (zone.type === 'polygon') {
          inZone = this.polygonZoneHandler.isShipInZone(ship, zone);
        }

        if (inZone) {
          const notificationMessage = `Ship ${ship.name} (${ship.mmsi}) entered ${zone.properties?.name || 'a zone'}.`;
          this.notificationService.addNotification({
            message: notificationMessage,
            timestamp: new Date().toLocaleTimeString()
          });
        }
      });
    });
  }

  getShipDataStream(): Observable<ShipData[]> {
    return this.shipDataStream.asObservable();
  }
}
