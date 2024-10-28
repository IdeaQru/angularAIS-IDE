import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import Swal from 'sweetalert2';

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
  static router: any;

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

      const button = L.DomUtil.create('button', 'options-button', container);
      button.innerText = 'Options';
      button.style.backgroundColor = 'rgba(161, 154, 154, 0.0)';
      button.style.borderRadius = '12px';
      button.style.padding = '10px';
      button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.158)';
      button.style.border = 'none';
      button.style.color = '#000';
      button.style.fontSize = '16px';
      button.style.cursor = 'pointer';

      const dropdownMenu = L.DomUtil.create('div', 'dropdown-menu', container);
      dropdownMenu.style.display = 'none';
      dropdownMenu.style.position = 'absolute';
      dropdownMenu.style.top = '40px';
      dropdownMenu.style.right = '0';
      dropdownMenu.style.backgroundColor = 'white';
      dropdownMenu.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      dropdownMenu.style.borderRadius = '8px';
      dropdownMenu.style.padding = '10px';
      dropdownMenu.style.zIndex = '1000';

      const options = [
        { label: 'Settings', route: '/settings' },
        { label: 'Filter', route: '/filter' },
        { label: 'Anomaly Detect', route: '/anomaly-detect' }
      ];

      options.forEach(option => {
        const item = L.DomUtil.create('div', 'dropdown-item', dropdownMenu);
        item.innerText = option.label;
        item.style.padding = '8px';
        item.style.cursor = 'pointer';
        item.onmouseenter = () => item.style.backgroundColor = '#f0f0f0';
        item.onmouseleave = () => item.style.backgroundColor = 'white';

        item.onclick = () => {
          // Panggil SweetAlert pop-up
          Swal.fire({
            title: option.label,
            html: `<iframe src="${option.route}" width="100%" height="400px" style="border:none;"></iframe>`,
            width: 800,
            showConfirmButton: true,
          });
          dropdownMenu.style.display = 'none';
        };
      });

      button.onclick = () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
      };

      return container;
    };

    return legend;
  }
}  