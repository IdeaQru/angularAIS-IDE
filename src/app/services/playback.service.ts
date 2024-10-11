import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class PlaybackService {
  private map!: L.Map;

  /**
   * Inisialisasi peta di dalam PlaybackService
   * @param map - Instance Leaflet map yang diterima dari MapService
   */
  initializePlayback(map: L.Map): void {
    this.map = map;
    this.addPlaybackControl();
  }

  /**
   * Menambahkan kontrol playback kustom ke peta menggunakan Leaflet
   */
  private addPlaybackControl(): void {
    const controlDiv = L.DomUtil.create('div', 'playback-control-container');
    controlDiv.innerHTML = `
      <div class="playback-bar" style="display: flex; align-items: center; justify-content: space-between; width: 500px;">
        <button class="control-button" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #333; transition: transform 0.2s ease-in-out; margin: 0 5px;">
          <i class="fa fa-play"></i>
        </button>
        <button class="control-button" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #333; transition: transform 0.2s ease-in-out; margin: 0 5px;">
          <i class="fa fa-undo"></i>
        </button>
        <input type="range" class="time-slider" min="0" max="100" value="50" style="flex: 1; margin: 0 10px; cursor: pointer;">
        <span class="time-display" style="font-size: 14px; color: #333; white-space: nowrap; margin-left: 10px;">
          17 OCT 2020 17:41:16 UTC
        </span>
        <button class="control-button" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #333; transition: transform 0.2s ease-in-out; margin: 0 5px;">
          <i class="fa fa-cog"></i>
        </button>
        <button class="control-button" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #333; transition: transform 0.2s ease-in-out; margin: 0 5px;">
          <i class="fa fa-times"></i>
        </button>
      </div>
    `;

    // Membuat kontrol kustom menggunakan L.Control.extend
    const PlaybackControl = L.Control.extend({
      options: {
        position: 'bottomleft', // Posisi default Leaflet
      },
      onAdd: () => {
        return controlDiv;
      },
    });

    // Menambahkan kontrol kustom ke peta dan mengatur posisinya dengan CSS agar berada di tengah bawah
    this.map.addControl(new PlaybackControl());

    const mapContainer = this.map.getContainer();
    const playbackControlContainer = document.querySelector('.playback-control-container') as HTMLElement;
    if (playbackControlContainer) {
    // Memastikan kontrol berada di tengah bawah dengan CSS inline
    if (playbackControlContainer) {
      playbackControlContainer.style.position = 'absolute';
      playbackControlContainer.style.bottom = '20px';
      playbackControlContainer.style.left = '50%';
      playbackControlContainer.style.transform = 'translateX(-50%)';
      playbackControlContainer.style.zIndex = '1000';
      playbackControlContainer.style.background = 'rgba(161, 154, 154, 0)';
      playbackControlContainer.style.borderRadius = '8px';
      playbackControlContainer.style.padding = '10px';
      playbackControlContainer.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.158)';
      this.centerPlaybackControl(mapContainer, playbackControlContainer);
      this.map.on('resize', () => {
        this.centerPlaybackControl(mapContainer, playbackControlContainer);
      });
    }
  }
}
private centerPlaybackControl(mapContainer: HTMLElement, controlContainer: HTMLElement): void {
  const mapWidth = mapContainer.clientWidth;
  const controlWidth = controlContainer.clientWidth;
  controlContainer.style.left = `${(mapWidth - controlWidth) / 1}px`; // Mengatur posisi horizontal ke tengah
}

}
