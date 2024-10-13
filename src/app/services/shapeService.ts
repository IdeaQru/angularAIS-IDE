import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  private apiUrl = `${environment.apiUrl}/shapes`;  // Ambil URL API dari environment
; // URL API backend

  constructor(private http: HttpClient) { }

  getShapes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addShape(shapeData: any): Observable<any> {
    return this.http.post(this.apiUrl, shapeData);
  }
  // Dalam ShapeDataHandlerService
    deleteShape(shapeId: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${shapeId}`);
  }


}
