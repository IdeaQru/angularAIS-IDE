import * as L from 'leaflet';

export class BaseLayerService {
  static baseLayers = {
    'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }),
    'Stadia Dark': L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '... Stadia Maps, OpenMapTiles, OpenStreetMap contributors'
    }),
    'Esri World Street Map': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 20,
      attribution: '... Esri &mdash; Esri, DeLorme, NAVTEQ'
    }),
    'Ocean': L.tileLayer('https://api.maptiler.com/maps/ocean/{z}/{x}/{y}.png?key=TLRSpsp0lyuC33gmLrBu', {
      maxZoom: 20,
      attribution: '&copy; MapTiler'
    })
  };
};

