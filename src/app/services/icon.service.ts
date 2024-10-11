import * as L from 'leaflet';

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

}
