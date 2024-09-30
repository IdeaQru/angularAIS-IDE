import { Injectable } from '@angular/core';
import { CircleZoneService } from './services/circle-zone.service';
import * as turf from '@turf/turf';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CircleZoneHandler {

  constructor(private circleZoneService: CircleZoneService) {}

  // Metode untuk memuat zona lingkaran dari layanan CircleZoneService
  loadCircleZones(): Observable<any[]> {
    return this.circleZoneService.getCircleZones().pipe(
      // Memproses data yang diterima dari layanan
      map(data => data.map(zone => {
        // Periksa apakah koordinat dan radius ada dan valid
        if (!zone.coordinates || typeof zone.coordinates.radius !== 'number') return null;
        if (typeof zone.coordinates.lat !== 'number' || typeof zone.coordinates.lng !== 'number') return null;

        // Kembalikan zona dengan struktur yang diubah
        return {
          ...zone,
          center: { lat: zone.coordinates.lat, lng: zone.coordinates.lng }, // Set pusat lingkaran
          radius: zone.coordinates.radius // Set radius lingkaran
        };
      }).filter(zone => zone !== null)) // Hapus zona yang tidak valid
    );
  }

  // Metode untuk memeriksa apakah kapal berada dalam zona lingkaran
  isShipInZone(ship: any, zone: any): boolean {
    // Hitung jarak antara kapal dan pusat lingkaran menggunakan turf.js
    const distance = turf.distance([ship.lon, ship.lat], [zone.center.lng, zone.center.lat], { units: 'meters' });
    return distance <= zone.radius; // Periksa apakah jarak kurang dari atau sama dengan radius lingkaran
  }
}
