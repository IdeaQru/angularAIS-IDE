import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
import { interval, Observable, Subject, switchMap } from 'rxjs';
import { CircleZoneHandler } from './services/circle-zone-handler';
import { PolygonZoneHandler } from './services/polygon-zone-handler';
import { NotificationService } from './services/notification.service';

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
export interface AisLogData {
  mmsi: number;
  name: string;
  logTime: string;
  details: object[];
}
@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://165.154.208.232:3000/api/ships'; // Ubah dengan API endpoint Anda
  private zonesApiUrl = 'http://165.154.208.232:3000/api/shapes'; // API endpoint untuk zona
  private dataLog = 'http://165.154.208.232:3000/api/ais-log';
  private socketUrl = 'http://165.154.208.232:3000'; // Ubah dengan URL WebSocket server Anda
  private socket!: Socket;
  public shipDataStream = new Subject<ShipData[]>();
  private shipZoneStatus: { [mmsi: number]: { [zoneId: string]: boolean } } =
    {};

  constructor(
    private http: HttpClient,
    private circleZoneHandler: CircleZoneHandler,
    private polygonZoneHandler: PolygonZoneHandler,
    private notificationService: NotificationService
  ) {
    this.initializeWebSocketConnection();
  }
  getAisLogData(): Observable<AisLogData[]> {
    return this.http.get<AisLogData[]>(this.dataLog);
  }
  getShipsData(): Observable<ShipData[]> {
    return this.http.get<ShipData[]>(this.apiUrl);
  }

  getZonesData(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.zonesApiUrl);
  }

  getShipsDataPeriodically(): Observable<ShipData[]> {
    return interval(30000).pipe(switchMap(() => this.getShipsData()));
  }

  checkShipsInZones(
    polygonZones: Zone[],
    circleZones: Zone[],
    ships: ShipData[]
  ): void {
    polygonZones.forEach((zone) => {
      ships.forEach((ship) => {
        if (this.polygonZoneHandler.isShipInZone(ship, zone)) {
          const zoneId = JSON.stringify(zone.coordinates); // Asumsikan koordinat adalah ID unik zona
          const previousStatus =
            this.shipZoneStatus[ship.mmsi]?.[zoneId] || false;
            if ((this.polygonZoneHandler.isShipInZone(ship, zone) && !previousStatus)) {
          const notificationMessage = `Ship ${ship.name} (${
            ship.mmsi
          }) entered ${zone.properties?.name || 'a polygon zone'}.`;
          console.log(notificationMessage);
          this.notificationService.addNotification({
            message: notificationMessage,
            timestamp: new Date().toLocaleTimeString(),
          });
        }
        }
      });
    });

    circleZones.forEach((zone) => {
      ships.forEach((ship) => {
        if (this.circleZoneHandler.isShipInZone(ship, zone)) {
          const notificationMessage = `Ship ${ship.name} (${
            ship.mmsi
          }) entered ${zone.properties?.name || 'a circle zone'}.`;
          console.log(notificationMessage);
          this.notificationService.addNotification({
            message: notificationMessage,
            timestamp: new Date().toLocaleTimeString(),
          });
        }
      });
    });
  }
  private initializeWebSocketConnection() {
    this.socket = io(this.socketUrl, {
      path: '/api/ships',
    });
    this.socket.on('connect', () =>
      console.log('Connected to WebSocket server!')
    );

    this.socket.on('aisData', (data: ShipData[]) => {
      console.log('Received ship data via WebSocket:', data);
      this.shipDataStream.next(data);

      this.getZonesData().subscribe((zones) => {
        const polygonZones = zones.filter((zone) => zone.type === 'polygon');
        const circleZones = zones.filter((zone) => zone.type === 'circle');

        this.checkShipsInZones(polygonZones, circleZones, data);
      });
    });

    this.socket.on('disconnect', () =>
      console.log('Disconnected from WebSocket server')
    );
    this.socket.on('error', (error: any) =>
      console.error('WebSocket error:', error)
    );
  }

  getShipDataStream(): Observable<ShipData[]> {
    return this.shipDataStream.asObservable();
  }
}
