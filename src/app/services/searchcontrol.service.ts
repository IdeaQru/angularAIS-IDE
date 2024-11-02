// searchcontrol.service.ts
import * as L from 'leaflet';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { ShipData } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class SearchControlService {
  constructor(private dataService: DataService) {}

  addSearchControl(map: L.Map, focusOnShip: (ship: ShipData) => void): void {
    const searchContainer = L.DomUtil.create('div', 'search-container');

    // Create the HTML structure for the search bar
    const formField = L.DomUtil.create('div', 'custom-search-field', searchContainer);
    const searchInput = L.DomUtil.create('input', 'search-input', formField) as HTMLInputElement;

    searchInput.type = 'text';
    searchInput.placeholder = 'Enter MMSI or Ship Name';

    // Inline styles for positioning
    searchContainer.style.width = '320px';
    searchContainer.style.zIndex = '1000';

    formField.style.backgroundColor = 'rgba(161, 154, 154, 0)'; // Slightly transparent background
    formField.style.borderRadius = '12px';
    formField.style.padding = '10px';
    formField.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.158)';

    searchInput.style.width = '100%';
    searchInput.style.padding = '8px';
    searchInput.style.border = 'none';
    searchInput.style.outline = 'none';
    searchInput.style.backgroundColor = 'transparent';
    searchInput.style.color = '#000';
    searchInput.style.fontSize = '16px';

    L.DomEvent.addListener(searchInput, 'input', () => {
      this.searchShip(searchInput.value, focusOnShip);
    });

    // Create a custom Leaflet control and handle custom positioning for top center
    const SearchControl = L.Control.extend({
      onAdd: () => searchContainer,
      options: { position: 'topleft' }, // Position placeholder, actual position handled below
    });

    const searchControlInstance = new SearchControl();
    searchControlInstance.addTo(map);

    // Override the default Leaflet positioning to place the control at the top center
    const mapContainer = map.getContainer();
    const containerWidth = mapContainer.clientWidth;
    searchContainer.style.position = 'absolute';
    searchContainer.style.top = '10px'; // Adjust vertical position as needed
    searchContainer.style.left = `${(containerWidth - searchContainer.clientWidth) / 2}px`; // Center it horizontally

    // Recalculate the position on map resize to keep the control centered
    map.on('resize', () => {
      const newContainerWidth = map.getContainer().clientWidth;
      searchContainer.style.left = `${(newContainerWidth - searchContainer.clientWidth) / 2}px`;
    });
  }

  private searchShip(searchQuery: string, focusOnShip: (ship: ShipData) => void): void {
    if (!searchQuery.trim()) {
      console.warn('Search query is empty');
      return;
    }

    this.dataService.getShipsData().subscribe((ships: ShipData[]) => {
      const trimmedQuery = searchQuery.trim().toLowerCase();

      const foundShip = ships.find((ship) => {
        // Cek jika query adalah MMSI dan cocokkan
        if (ship.mmsi.toString() === trimmedQuery) {
          return true;
        }
        // Cek jika query adalah name dan name tidak undefined
        if (ship.name && ship.name.toLowerCase().includes(trimmedQuery)) {
          return true;
        }
        return false;
      });

      if (foundShip) {
        focusOnShip(foundShip);
      } else {
        console.warn('Ship not found');
      }
    });
  }


}
