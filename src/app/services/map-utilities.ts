// import * as L from 'leaflet';

// export class MapUtilities {
//   static saveDrawnItems(drawnItems: L.FeatureGroup): void {
//     const data = drawnItems.toGeoJSON();
//     localStorage.setItem('drawnItems', JSON.stringify(data));
//   }

//   static loadDrawnItems(drawnItems: L.FeatureGroup): void {
//     const data = localStorage.getItem('drawnItems');
//     if (data) {
//       const json = JSON.parse(data);
//       L.geoJSON(json, {
//         onEachFeature: (feature, layer) => {
//           drawnItems.addLayer(layer);
//         }
//       });
//     }
//   }
// }
