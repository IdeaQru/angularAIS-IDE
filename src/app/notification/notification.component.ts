import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notifications: Notification[]) => {
      // Sort notifications by timestamp in descending order
      this.notifications = notifications;
    });
  }

  deleteNotification(notification: Notification) {
    this.notificationService.deleteNotification(notification);
  }
  deleteAllNotifications() {
    this.notificationService.deleteAllNotifications();
  }
}
