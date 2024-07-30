import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit, OnDestroy {
  constructor(
    private mapService: MapService, private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.mapService.initializeMap('map');
    this.initializeCanvas();
    this.loadAndDisplayData();
  }

  ngOnDestroy(): void {
    this.mapService.destroyMap(); // Pastikan peta dihancurkan saat komponen di-destroy
  }

  private initializeCanvas(): void {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    if (canvas) {
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (context) {
        this.drawOnCanvas(context);
      }
    }
  }

  private drawOnCanvas(context: CanvasRenderingContext2D): void {
    // Contoh menggambar di canvas
    context.fillStyle = 'green';
    context.fillRect(10, 10, 150, 100);

    // Baca data gambar dari canvas
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

    // Contoh manipulasi data gambar
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 255 - imageData.data[i];       // Red
      imageData.data[i + 1] = 255 - imageData.data[i + 1]; // Green
      imageData.data[i + 2] = 255 - imageData.data[i + 2]; // Blue
    }

    // Tulis kembali data gambar ke canvas
    context.putImageData(imageData, 0, 0);
  }

  private loadAndDisplayData(): void {
    this.dataService.getShipsData().subscribe({
      next: (data) => {
        this.mapService.addMarkers(data);
        this.mapService.addHeatMap(data);
      },
      error: (error) => {
        console.error('Failed to load data:', error);
      }
    });
  }
}
