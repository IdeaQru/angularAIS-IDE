import { Injectable } from '@angular/core';
import { PolygonZoneService } from '../services/polygon-zone.service';
import * as turf from '@turf/turf';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Coordinate {
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root'
})
export class PolygonZoneHandler {

  constructor(private polygonZoneService: PolygonZoneService) {}

  loadPolygonZones(): Observable<any[]> {
    return this.polygonZoneService.getPolygonZones().pipe(
      map(data => data.map(zone => {
        if (!zone.coordinates || zone.coordinates.length === 0) return null;
        let coordinates = zone.coordinates[0].map((coord: Coordinate) => {
          if (coord && typeof coord.lat === 'number' && typeof coord.lng === 'number') {
            return [coord.lng, coord.lat];
          }
          return null;
        }).filter((coord: Coordinate) => coord !== null);

        if (coordinates.length >= 3 && coordinates[0] !== coordinates[coordinates.length - 1]) {
          coordinates.push(coordinates[0]);
        }
        if (coordinates.length < 4) return null;
        return { ...zone, coordinates: [coordinates] };
      }).filter(zone => zone !== null))
    );
  }

  isShipInZone(ship: any, zone: any): boolean {
    const lat = parseFloat(ship.lat);
    const lon = parseFloat(ship.lon);
  
    // Validasi koordinat kapal
    if (isNaN(lon) || isNaN(lat)) {
      console.error('Invalid ship coordinates:', ship);
      return false;
    }
  
    try {
      // Validasi koordinat zona
      const coordinates = zone.coordinates[0]; // Assuming this is a simple polygon
      const isValidPolygon = coordinates.every(coord => 
        Array.isArray(coord) && coord.length === 2 && !isNaN(coord[0]) && !isNaN(coord[1])
      );
  
      if (!isValidPolygon) {
        console.error('Invalid polygon coordinates:', zone.coordinates);
        return false;
      }
  
      // Pastikan poligon tertutup (titik pertama dan terakhir harus sama)
      if (coordinates[0][0] !== coordinates[coordinates.length - 1][0] || 
          coordinates[0][1] !== coordinates[coordinates.length - 1][1]) {
        coordinates.push(coordinates[0]); // Tutup poligon
      }
  
      const point = turf.point([lon, lat]);
      const polygon = turf.polygon([coordinates]);
  
      return turf.booleanPointInPolygon(point, polygon);
    } catch (error) {
      console.error('Failed to create polygon or check ship in zone', error);
      return false;
    }
  }

  
}
