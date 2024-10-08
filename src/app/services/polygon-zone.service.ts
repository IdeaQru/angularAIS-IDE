import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolygonZoneService {
  private apiUrl = 'http://localhost:3000/api/shapes/polygon'; // Update this URL as per your API endpoint

  constructor(private http: HttpClient) {}

  getPolygonZones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
