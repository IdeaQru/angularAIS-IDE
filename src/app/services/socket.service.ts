import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://165.154.208.232:3000');
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
