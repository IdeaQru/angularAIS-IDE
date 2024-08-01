import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly url: string = 'http://103.24.48.92:3000'; // Sesuaikan dengan URL server Anda

  constructor() {
    this.socket = io(this.url);
  }

  onEvent(event: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, (data: any) => observer.next(data));
    });
  }

  emitEvent(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
