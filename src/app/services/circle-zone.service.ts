import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CircleZoneService {
  private apiUrl = `${environment.apiUrl}/ships/shapes/circle`;  // Ambil URL API dari environment

  constructor(private http: HttpClient) {}

  getCircleZones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
