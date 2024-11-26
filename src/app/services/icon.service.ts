import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private static selectedShipTypes: string[] = [];
  private static scriptLegend = `
      <div style="display: flex; align-items: center; margin-top: 16px; padding: 8px; background-color: #f5f5f5; border-radius: 8px;">
        <div style="width: 16px; height: 16px; border-radius: 50%; background-color: yellow; margin-right: 12px;"></div>
        <span style="color: #333; flex-grow: 1;">Warning Zone (Circle)</span>

      </div>
      <div style="display: flex; align-items: center; margin-top: 12px; padding: 8px; background-color: #f5f5f5; border-radius: 8px;">
        <div style="width: 16px; height: 16px; border-radius: 50%; background-color: red; margin-right: 12px;"></div>
        <span style="color: #333; flex-grow: 1;">Danger Zone (Circle)</span>

      </div>
      <div style="display: flex; align-items: center; margin-top: 12px; padding: 8px; background-color: #f5f5f5; border-radius: 8px;">
        <div style="width: 16px; height: 16px; background-color: yellow; margin-right: 12px;"></div>
        <span style="color: #333; flex-grow: 1;">Warning Area (Polygon)</span>

      </div>
      <div style="display: flex; align-items: center; margin-top: 12px; padding: 8px; background-color: #f5f5f5; border-radius: 8px;">
        <div style="width: 16px; height: 16px; background-color: red; margin-right: 12px;"></div>
        <span style="color: #333; flex-grow: 1;">Danger Area (Polygon)</span>

      </div>
    `;
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
    // Logic to determine the correct icon based on type
    if (type >= 0 && type <= 19) {
      // Memetakan tipe 0-19 ke kategori tertentu jika diperlukan, atau gunakan "Unspecified" jika belum ada kategori khusus
      return this.shipIcons['Unspecified'];
    } else if (type >= 20 && type <= 29) {
      return this.shipIcons['Cargo'];
    } else if (type === 30) {
      return this.shipIcons['Fishing'];
    } else if (type === 31 || type === 32) {
      return this.shipIcons['Tug'];
    } else if (type === 36) {
      return this.shipIcons['Pleasure'];
    } else if (type >= 40 && type <= 59) {
      return this.shipIcons['Highspeed'];
    } else if (type >= 60 && type <= 69) {
      return this.shipIcons['Passenger'];
    } else if (type >= 70 && type <= 79) {
      return this.shipIcons['Cargo'];
    } else if (type >= 80 && type <= 89) {
      return this.shipIcons['Tanker'];
    } else if (type >= 90 && type <= 100) {
      // Misalnya untuk tipe 90-100, kita bisa menggunakan kategori "Unspecified" atau kategori lain yang lebih cocok
      return this.shipIcons['Unspecified'];
    } else {
      return this.shipIcons['Unspecified'];
    }

  }

  // Fungsi untuk menampilkan atau menyembunyikan legenda dengan interaksi
  static createLegendControl(onFilterUpdate: (selectedTypes: string[]) => void): L.Control {
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

      // Pass the callback when calling showOptionsPopup
      button.onclick = () => {
        this.showOptionsPopup(onFilterUpdate);
      };

      return container;
    };

    return legend;
  }


  public static showOptionsPopup(onFilterUpdate: (selectedTypes: string[]) => void): void {
    Swal.fire({
      title: 'Options',
      html: `
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 10px;">
          <button id="legendTab" style="flex: 1; padding: 10px; border: none; background: #eee; cursor: pointer;">Legend and Filters</button>
          <button id="settingsTab" style="flex: 1; padding: 10px; border: none; background: #eee; cursor: pointer;">Settings</button>
        </div>
        <div id="content" style="padding: 10px; text-align: left;">
          ${this.getLegendContent()}
        </div>
      `,
      width: 800,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      didOpen: () => {
        const content = document.getElementById('content');

        document.getElementById('legendTab')?.addEventListener('click', () => {
          if (content) {
            content.innerHTML = this.getLegendContent();
            this.addLegendListeners(this.selectedShipTypes); // Apply stored states to checkboxes
          }
        });

        document.getElementById('settingsTab')?.addEventListener('click', () => {
          if (content) {
            content.innerHTML = `
              <h3>Settings</h3>
              <p>Additional settings can go here.</p>
            `;
          }
        });

        // Add initial legend listeners and apply stored states to checkboxes
        this.addLegendListeners(this.selectedShipTypes);
      },
      preConfirm: () => {
        // Save the selected types and pass them to the callback
        onFilterUpdate([...this.selectedShipTypes]);
      }
    });
  }

  private static addLegendListeners(tempSelectedTypes: string[]): void {
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        const target = checkbox as HTMLInputElement;
        const types = target.dataset['types']?.split(',') || []; // Ensure we get an array of types

        // Set the initial checkbox state to checked and update tempSelectedTypes if not already set
        target.checked = true; // Set initial state as checked
        types.forEach((type) => {
            if (!tempSelectedTypes.includes(type)) {
                tempSelectedTypes.push(type); // Add to selected types if not present
            }
        });

        // Add an event listener to update tempSelectedTypes on change
        checkbox.addEventListener('change', () => {
            if (target.checked) {
                types.forEach((type) => {
                    if (!tempSelectedTypes.includes(type)) {
                        tempSelectedTypes.push(type); // Add type if checked and not already present
                    }
                });
            } else {
                types.forEach((type) => {
                    const index = tempSelectedTypes.indexOf(type);
                    if (index > -1) tempSelectedTypes.splice(index, 1); // Remove type if unchecked
                });
            }
        });
    });
}

// Utility function to create a range of numbers
private static createRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}


  private static getLegendContent(): string {
    const shipTypes = [
      {
        name: 'Unspecified',
        icon: 'assets/images/unspecified.png',
        types: Array.from({ length: 20 }, (_, i) => i) // 0-19 (before defined ranges)
          .concat(Array.from({ length: 40 }, (_, i) => i + 90)) // 90+ (after defined ranges)
      },

        { name: 'Fishing', icon: 'assets/images/fishing.png', types: [30] },
        { name: 'Tanker', icon: 'assets/images/tanker.png', types: this.createRange(80, 89) },  // Tipe 80-89
        { name: 'Cargo', icon: 'assets/images/cargo.png', types: [...this.createRange(20, 29), ...this.createRange(70, 79)] }, // Tipe 20-29 dan 70-79
        { name: 'Tug', icon: 'assets/images/tug.png', types: [31, 32] },
        { name: 'Highspeed', icon: 'assets/images/highspeed.png', types: this.createRange(40, 59) },  // Tipe 40-59
        { name: 'Passenger', icon: 'assets/images/passenger.png', types: this.createRange(60, 69) },  // Tipe 60-69
        { name: 'Pleasure', icon: 'assets/images/pleasure.png', types: [36] }

    ];

    let legendHTML = '<h3 style="color: #333; text-align: center; margin-bottom: 16px;">Legend</h3>';

    shipTypes.forEach(ship => {
      legendHTML += `
        <div style="display: flex; align-items: center; margin-bottom: 12px; padding: 8px; background-color: #f5f5f5; border-radius: 8px;">
          <img src="${ship.icon}" width="24" height="24" style="margin-right: 12px;">
          <span style="color: #333; flex-grow: 1;">${ship.name}</span>
          <label class="switch">
            <input type="checkbox" data-types="${ship.types.join(',')}" id="toggle-${ship.name.toLowerCase()}" checked>
            <span class="slider round"></span>
          </label>
        </div>
      `;
    });
    // Tambahkan elemen legenda untuk Circle (Warning Zone dan Danger Zone) dan Polygon (Warning Area dan Danger Area)
    legendHTML += this.scriptLegend;
    return legendHTML;
  }


}
