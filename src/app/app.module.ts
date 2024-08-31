import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ChartComponent } from './chart/chart.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register/register.component';

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
    LeafletMapComponent,
    ChartComponent,
    NotificationComponent,
    LoginComponent,
    MainlayoutComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    NgApexchartsModule, // Import NgApexchartsModule
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,MatButtonModule, MatListModule,
    MatIconModule,
    MatCardModule,MatInputModule
  ],
  providers: [AppService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
