import { Component } from '@angular/core';

@Component({
  selector: 'app-options-page',
  templateUrl: './options-page.component.html',
  styleUrls: ['./options-page.component.css'],
  template: `
    <h2>Options</h2>
    <mat-tab-group>
      <mat-tab label="Settings">
        <div>Settings Content</div>
        <!-- Konten lainnya untuk Settings -->
      </mat-tab>
      <mat-tab label="Filter">
        <div>Filter Content</div>
        <!-- Konten lainnya untuk Filter -->
      </mat-tab>
      <mat-tab label="Anomaly Detect">
        <div>Anomaly Detect Content</div>
        <!-- Konten lainnya untuk Anomaly Detect -->
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [`
    .mat-tab-group {
      margin-top: 16px;
    }
  `]
})
export class OptionsPageComponent {

}
