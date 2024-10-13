import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private static shipIcons: { [type: string]: L.Icon } = {
    'Unspecified': L.icon({
      iconUrl: 'assets/images/unspecified.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Fishing': L.icon({
      iconUrl: 'assets/images/fishing.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Tanker': L.icon({
      iconUrl: 'assets/images/tanker.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Cargo': L.icon({
      iconUrl: 'assets/images/cargo.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Tug': L.icon({
      iconUrl: 'assets/images/tug.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Highspeed': L.icon({
      iconUrl: 'assets/images/highspeed.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Passenger': L.icon({
      iconUrl: 'assets/images/passenger.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    }),
    'Pleasure': L.icon({
      iconUrl: 'assets/images/pleasure.png',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })
  };

  static getIconForShipType(type: number): L.Icon {
    if (type >= 20 && type <= 29) {
      return this.shipIcons['Cargo'];
    } else if (type >= 30 && type <= 39) {
      if (type === 30) {
        return this.shipIcons['Fishing'];
      } else if (type === 31 || type === 32) {
        return this.shipIcons['Tug'];
      } else if (type === 36) {
        return this.shipIcons['Pleasure'];
      } else {
        return this.shipIcons['Unspecified'];
      }
    } else if (type >= 40 && type <= 59) {
      return this.shipIcons['Highspeed'];
    } else if (type >= 60 && type <= 69) {
      return this.shipIcons['Passenger'];
    } else if (type >= 70 && type <= 79) {
      return this.shipIcons['Cargo'];
    } else if (type >= 80 && type <= 89) {
      return this.shipIcons['Tanker'];
    } else if (type >= 90 && type <= 99) {
      return this.shipIcons['Unspecified'];
    } else {
      return this.shipIcons['Unspecified'];
    }
  }

  // Fungsi untuk menampilkan atau menyembunyikan legenda dengan interaksi
  static createLegendControl(): L.Control {
    const legend = new L.Control({ position: 'topright' });

    legend.onAdd = () => {
      const container = L.DomUtil.create('div', 'legend-container');

      // Tombol untuk menampilkan legenda
      const button = L.DomUtil.create('button', 'legend-button', container);
      button.innerText = 'Show Legend';

      // Inline styles for button styling (mirip dengan input yang Anda berikan)
      button.style.backgroundColor = 'rgba(161, 154, 154, 0.0)'; // Slightly transparent background
      button.style.borderRadius = '12px';
      button.style.padding = '10px';
      button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.158)';
      button.style.border = 'none';
      button.style.color = '#000'; // Text color black
      button.style.fontSize = '16px';
      button.style.cursor = 'pointer';


      // Buat div untuk legenda dan sembunyikan
      const legendDiv = L.DomUtil.create('div', 'info legend', container);
      legendDiv.style.display = 'none'; // Awalnya tersembunyi

      // Jenis Kapal
      const shipTypes = [
        { name: 'Unspecified', icon: 'assets/images/unspecified.png' },
        { name: 'Fishing', icon: 'assets/images/fishing.png' },
        { name: 'Tanker', icon: 'assets/images/tanker.png' },
        { name: 'Cargo', icon: 'assets/images/cargo.png' },
        { name: 'Tug', icon: 'assets/images/tug.png' },
        { name: 'Highspeed', icon: 'assets/images/highspeed.png' },
        { name: 'Passenger', icon: 'assets/images/passenger.png' },
        { name: 'Pleasure', icon: 'assets/images/pleasure.png' }
      ];

      // Loop untuk membuat item legenda untuk jenis kapal
      shipTypes.forEach(ship => {
        legendDiv.innerHTML += `
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <img src="${ship.icon}" width="24" height="24" style="margin-right: 8px;">
            <span style="color: black;">${ship.name}</span>
          </div>
        `;
      });

      // Tambahkan logo untuk Circle (Warning Zone dan Danger Zone) dan Polygon (Warning Area dan Danger Area)
      legendDiv.innerHTML += `
        <div style="display: flex; align-items: center; margin-top: 10px;">
          <div style="width: 16px; height: 16px; border-radius: 50%; background-color: yellow; margin-right: 8px;"></div>
          <span style="color: black;">Warning Zone (Circle)</span>
        </div>
        <div style="display: flex; align-items: center; margin-top: 10px;">
          <div style="width: 16px; height: 16px; border-radius: 50%; background-color: red; margin-right: 8px;"></div>
          <span style="color: black;">Danger Zone (Circle)</span>
        </div>
        <div style="display: flex; align-items: center; margin-top: 10px;">
          <div style="width: 16px; height: 16px; background-color: yellow; margin-right: 8px;"></div>
          <span style="color: black;">Warning Area (Polygon)</span>
        </div>
        <div style="display: flex; align-items: center; margin-top: 10px;">
          <div style="width: 16px; height: 16px; background-color: red; margin-right: 8px;"></div>
          <span style="color: black;">Danger Area (Polygon)</span>
        </div>
      `;

      // Tambahkan event untuk menampilkan atau menyembunyikan legenda
      button.onclick = () => {
        if (legendDiv.style.display === 'none') {
          legendDiv.style.display = 'block';
          button.innerText = 'Hide Legend';
        } else {
          legendDiv.style.display = 'none';
          button.innerText = 'Show Legend';
        }
      };

      return container; // Kembalikan container yang berisi tombol dan legenda
    };

    return legend;
  }

}
