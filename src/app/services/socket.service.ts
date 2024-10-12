import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private apiUrl = `${environment.apiUrl}`;  // Ambil URL API dari environment

  constructor() {
    this.socket = io(this.apiUrl);
  }

  // Use Observable to handle data streams
  onAisDataUpdate(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('aisDataUpdate', (data) => {
        observer.next(data);
      });

      // Handle socket disconnect or error
      return () => this.socket.off('aisDataUpdate');
    });
  }

  onShapeDataUpdate(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('shapeDataUpdate', (data) => {
        observer.next(data);
      });

      // Handle socket disconnect or error
      return () => this.socket.off('shapeDataUpdate');
    });
  }

  disconnect(): void {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }
}
