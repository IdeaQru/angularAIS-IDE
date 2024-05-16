// app.service.ts

import { Injectable } from '@angular/core';
declare var toggleSidenav: any;
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }
  private isPluginVisible: boolean = false;
  callToggleSidenav() {
    // Panggil fungsi toggleSidenav dengan id "sidenav-main"
    toggleSidenav("sidenav-main");
  }
  togglePluginVisibility() {
    this.isPluginVisible = !this.isPluginVisible;
  }


  closeFixedPlugin() {
    this.isPluginVisible = false;
  }

  getIsPluginVisible(): boolean {
    return this.isPluginVisible;
  }

}
