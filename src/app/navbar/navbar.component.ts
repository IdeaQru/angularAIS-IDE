// navbar.component.ts

import { Component,Output ,EventEmitter } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private appService: AppService) {}
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
