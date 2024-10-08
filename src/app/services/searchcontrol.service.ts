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

    // Apply inline styles to the search container to center it at the top
    searchContainer.style.position = 'absolute';
    searchContainer.style.top = '10px'; // Position it closer to the top of the map
    searchContainer.style.left = '50%'; // Center it horizontally
    searchContainer.style.transform = 'translateX(-50%)'; // Adjust for perfect centering
    searchContainer.style.width = '320px';
    searchContainer.style.zIndex = '1000';

    // Apply inline styles to the form field to mimic Angular Material
    formField.style.backgroundColor = 'rgba(161, 154, 154, 0)'; // Slightly transparent background
    formField.style.borderRadius = '12px'; // Rounded corners
    formField.style.padding = '10px'; // Padding for better spacing
    formField.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.158)'; // Subtle shadow for depth

    // Apply inline styles to the search input
    searchInput.style.width = '100%';
    searchInput.style.padding = '8px';
    searchInput.style.border = 'none';
    searchInput.style.outline = 'none';
    searchInput.style.backgroundColor = 'transparent';
    searchInput.style.color = '#000'; // Set input text color to white
    searchInput.style.fontSize = '16px';

    L.DomEvent.addListener(searchInput, 'input', () => {
      this.searchShip(searchInput.value, focusOnShip);
    });

    // Add the search container to the map as a control
    const SearchControl = L.Control.extend({
      onAdd: () => searchContainer,
      options: { position: 'topright' }, // Use top-left as a placeholder, but the styles will position it in the center
    });

    new SearchControl().addTo(map);
  }

  private searchShip(searchQuery: string, focusOnShip: (ship: ShipData) => void): void {
    if (!searchQuery.trim()) {
      console.warn('Search query is empty');
      return;
    }

    this.dataService.getShipsData().subscribe((ships: ShipData[]) => {
      const foundShip = ships.find((ship) =>
        ship.name &&
        (ship.mmsi.toString() === searchQuery.trim() ||
          ship.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (foundShip) {
        focusOnShip(foundShip);
      } else {
        console.warn('Ship not found');
      }
    });
  }
}
