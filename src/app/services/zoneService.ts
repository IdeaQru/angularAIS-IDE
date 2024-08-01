import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private apiUrl = 'http://103.24.48.92:3000/api/shapes';  // URL API

  constructor(private http: HttpClient) { }

  getZones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(shapes => shapes.map(shape => ({
        id: shape._id,
        type: shape.type,
        name: shape.properties.name,  // Mengambil nama dari properties
        status: shape.properties.status,
        description: shape.properties.description,
        color: shape.properties.color,
        opacity: shape.properties.opacity,
        coordinates: shape.coordinates
      })))
    );
  }
  // zone.service.ts
getZonesByType(type: string): Observable<any[]> {
  return this.getZones().pipe(
    map(zones => zones.filter(zone => zone.type === type))
  );
}

}
