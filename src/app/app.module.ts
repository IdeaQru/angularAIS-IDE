import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { UiconfiguratorComponent } from './uiconfigurator/uiconfigurator.component';
import { AppService } from './app.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablesComponent } from './tables/tables.component';
import { NewfiturComponent } from './newfitur/newfitur.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { DataService } from './data.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
    FooterComponent,
    UiconfiguratorComponent,
    DashboardComponent,
    TablesComponent,
    NewfiturComponent,
    LeafletMapComponent

  ],
  imports: [
    BrowserModule,
    NgApexchartsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppService,DataService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
