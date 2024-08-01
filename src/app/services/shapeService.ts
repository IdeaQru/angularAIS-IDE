import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  private apiUrl = 'http://103.24.48.92:3000/api/shapes'; // URL API backend

  constructor(private http: HttpClient) { }

  getShapes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addShape(shapeData: any): Observable<any> {
    return this.http.post(this.apiUrl, shapeData);
  }
  // Dalam ShapeDataHandlerService
  deleteShape(shapeId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${shapeId}`).pipe(
      tap(() => console.log(`Deleting shape with id ${shapeId}`)),
      catchError(error => {
        console.error(`Deletion failed for shape with id ${shapeId}:`, error);
        return throwError(() => new Error('Deletion failed'));
      })
    );
  }


}
