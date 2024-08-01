import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CircleZoneService {
  private apiUrl = 'http://103.24.48.92:3000/api/shapes/circle'; // Update this URL as per your API endpoint

  constructor(private http: HttpClient) {}

  getCircleZones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
