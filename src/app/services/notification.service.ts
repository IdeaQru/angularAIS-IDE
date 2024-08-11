import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  private audio = new Audio('../../assets/sound/notification.mp3');

  constructor(private snackBar: MatSnackBar) {}

  addNotification(notification: Notification) {
    const currentNotifications = this.notificationsSubject.getValue();
    this.notificationsSubject.next([...currentNotifications, notification]);
    this.playNotificationSound();
    this.showNotificationPopup(notification.message);
  }

  private playNotificationSound() {
    this.audio.play().catch(error => console.error('Failed to play sound:', error));
  }
  deleteNotification(notification: Notification) {
    const notifications = this.notificationsSubject.getValue().filter(n => n !== notification);
    this.notificationsSubject.next(notifications);
  }
  private showNotificationPopup(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
