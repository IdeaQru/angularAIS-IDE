import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable, Subject, switchMap } from 'rxjs';
import { CircleZoneHandler } from './services/circle-zone-handler';
import { PolygonZoneHandler } from './services/polygon-zone-handler';
import { NotificationService } from './services/notification.service';
import { environment } from '../environments/environment';  // Import environment

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
  private apiUrl = `${environment.apiUrl}/ships`;  // Ambil URL API dari environment
  private zonesApiUrl = `${environment.apiUrl}/shapes`; // API endpoint untuk zona dari environment
  private dataLog = `${environment.apiUrl}/ais-log`; // URL untuk data log

  public shipDataStream = new Subject<ShipData[]>();
  private shipZoneStatus: { [mmsi: number]: { [zoneId: string]: boolean } } =
    {};

  constructor(
    private http: HttpClient,
    private circleZoneHandler: CircleZoneHandler,
    private polygonZoneHandler: PolygonZoneHandler,
    private notificationService: NotificationService
  ) {
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
          if (this.polygonZoneHandler.isShipInZone(ship, zone) && !previousStatus) {
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



  getShipDataStream(): Observable<ShipData[]> {
    return this.shipDataStream.asObservable();
  }
}
