import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private apiUrl = `${environment.apiUrl}/shapes`;  // Ambil URL API dari environment
;  // URL API

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
