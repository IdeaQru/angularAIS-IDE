import * as L from 'leaflet';

export class BaseLayerService {
  static baseLayers = {
    'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }),
    'Esri World Street Map': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 20,
      attribution: '... Esri &mdash; Esri, DeLorme, NAVTEQ'
    }),
    'Ocean': L.tileLayer('https://api.maptiler.com/maps/ocean/{z}/{x}/{y}.png?key=TLRSpsp0lyuC33gmLrBu', {
      maxZoom: 20,
      attribution: '&copy; MapTiler'
    }),
    'Satelite': L.tileLayer('https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}@2x.jpg?key=GDfjtnu7IHfNAGwlcHjN', {
      maxZoom: 20,
      attribution: '&copy; MapTiler'
    }),
  };
};

