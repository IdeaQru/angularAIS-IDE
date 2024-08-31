import { Component, OnInit } from '@angular/core';
import { NotificationService,Notification } from '../services/notification.service';
import { AppService } from '../app.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  notifications: Notification[] = [];

constructor(private notificationService: NotificationService,private appService: AppService ,private authService: AuthService, private router: Router) {}
userName: string = ''; // Nama pengguna untuk ditampilkan

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
    this.userName = this.authService.getUserName();
  }
  callToggleSidenav() {
    // Panggil fungsi toggleSidenav dengan id "sidenav-main"
   return this.appService.callToggleSidenav();
  }
  get isPluginVisible(): boolean {
    return this.appService.getIsPluginVisible();
  }


  togglePluginVisibility() {
    this.appService.togglePluginVisibility();
  }

  closeFixedPlugin() {
    this.appService.closeFixedPlugin();
  }
}
