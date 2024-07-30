import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { PolygonZoneHandler } from '../services/polygon-zone-handler';
import { CircleZoneHandler } from '../services/circle-zone-handler';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexPlotOptions
} from 'ng-apexcharts';

const shipTypeNames: { [key: number]: string } = {
  20: 'Tug', 21: 'Tug', 22: 'Tug', 23: 'Tug', 24: 'Tug', 25: 'Tug', 26: 'Tug', 27: 'Tug', 28: 'Tug', 29: 'Unspecified',
  30: 'Fishing', 31: 'Tug', 32: 'Tug', 33: 'AntiPollution', 34: 'LawEnforcement', 35: 'Medical', 36: 'Military', 37: 'Military', 38: 'Sailing', 39: 'Pleasure',
  40: 'Highspeed', 41: 'Highspeed', 42: 'Highspeed', 43: 'Highspeed', 44: 'Highspeed', 45: 'Highspeed', 46: 'Highspeed', 47: 'Highspeed', 48: 'Highspeed', 49: 'Highspeed',
  50: 'Passenger', 51: 'Passenger', 52: 'Passenger', 53: 'Passenger', 54: 'Passenger', 55: 'Passenger', 56: 'Passenger', 57: 'Passenger', 58: 'Passenger', 59: 'Passenger',
  60: 'Cargo', 61: 'Cargo', 62: 'Cargo', 63: 'Cargo', 64: 'Cargo', 65: 'Cargo', 66: 'Cargo', 67: 'Cargo', 68: 'Cargo', 69: 'Cargo',
  70: 'Cargo', 71: 'Cargo', 72: 'Cargo', 73: 'Cargo', 74: 'Cargo', 75: 'Cargo', 76: 'Cargo', 77: 'Cargo', 78: 'Cargo', 79: 'Cargo',
  80: 'Tanker', 81: 'Tanker', 82: 'Tanker', 83: 'Tanker', 84: 'Tanker', 85: 'Tanker', 86: 'Tanker', 87: 'Tanker', 88: 'Tanker', 89: 'Tanker',
  90: 'Pilot', 91: 'SearchAndRescue', 92: 'Tug', 93: 'PortTender', 94: 'AntiPollution', 95: 'LawEnforcement', 96: 'Medical', 97: 'Military', 98: 'Sailing', 99: 'Pleasure'
};

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  title: ApexTitleSubtitle;
  xaxis?: ApexXAxis;
  dataLabels?: any;
  plotOptions?: ApexPlotOptions;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public pieChartOptions: Partial<ChartOptions> | any;
  public barChartOptions: Partial<ChartOptions> | any;
  public lineChartOptions: Partial<ChartOptions> | any;
  ships: any[] = [];
  polygonZones: any[] = [];
  circleZones: any[] = [];
  selectedZoneType: string = '';
  selectedZone: any = null;

  @ViewChild('chart') chart: any;

  constructor(
    private dataService: DataService,
    private polygonZoneHandler: PolygonZoneHandler,
    private circleZoneHandler: CircleZoneHandler
  ) {
    this.pieChartOptions = {
      series: [],
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: [],
      title: {
        text: 'Ship Types in Selected Zone'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };

    this.barChartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Ship Types in Selected Zone (Bar Chart)'
      },
      xaxis: {
        categories: []
      }
    };

    this.lineChartOptions = {
      series: [],
      chart: {
        type: 'area',
        height: 350
      },
      title: {
        text: 'Ship Types Over Time'
      },
      xaxis: {
        categories: []
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        area: {
          fillTo: 'end'
        }
      }
    };
  }

  ngOnInit() {
    this.loadPolygonZones();
    this.loadCircleZones();
    this.loadShips();
  }

  loadPolygonZones() {
    this.polygonZoneHandler.loadPolygonZones().subscribe((data: any) => {
      this.polygonZones = data;
    });
  }

  loadCircleZones() {
    this.circleZoneHandler.loadCircleZones().subscribe((data: any) => {
      this.circleZones = data;
    });
  }

  loadShips() {
    this.dataService.getShipsData().subscribe(data => {
      this.ships = data;
      this.updateChart();
    }, error => console.error('Failed to load ships:', error));
  }

  generateChartData(filteredShips: any[]) {
    const shipTypes: { [key: string]: number } = {};
    const shipTypesOverTime: { [key: string]: { [key: string]: number } } = {};

    filteredShips.forEach(ship => {
      const typeName = shipTypeNames[ship.type] || 'Unspecified';
      const timestampParts = ship.timestamp.split(' ');
      const dateParts = timestampParts[0].split('-');
      const timestamp = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timestampParts[1]}`).toLocaleDateString();

      if (shipTypes[typeName]) {
        shipTypes[typeName]++;
      } else {
        shipTypes[typeName] = 1;
      }

      if (!shipTypesOverTime[timestamp]) {
        shipTypesOverTime[timestamp] = {};
      }

      if (shipTypesOverTime[timestamp][typeName]) {
        shipTypesOverTime[timestamp][typeName]++;

      } else {
        shipTypesOverTime[timestamp][typeName] = 1;
      }
    });

    const series = Object.values(shipTypes);
    const labels = Object.keys(shipTypes);

    this.pieChartOptions.series = series;
    this.pieChartOptions.labels = labels;

    this.barChartOptions.series = [{ name: 'Ships', data: series }];
    this.barChartOptions.xaxis = { categories: labels };

    const timestamps = Object.keys(shipTypesOverTime).sort();
    const areaSeries = labels.map(label => ({
      name: label,
      data: timestamps.map(timestamp => shipTypesOverTime[timestamp][label] || 0)
    }));

    this.lineChartOptions.series = areaSeries;
    this.lineChartOptions.xaxis = { categories: timestamps };

  }

  onZoneTypeChange(type: string) {
    this.selectedZoneType = type;
    this.selectedZone = null;
    this.updateChart();
  }

  onZoneChange(zone: any) {
    this.selectedZone = zone;
    this.updateChart();
  }

  updateChart() {
    if (!this.selectedZone || !this.ships.length) {
      this.pieChartOptions.series = [];
      this.pieChartOptions.labels = [];
      this.barChartOptions.series = [];
      this.barChartOptions.xaxis = { categories: [] };
      this.lineChartOptions.series = [];
      this.lineChartOptions.xaxis = { categories: [] };
      return;
    }

    const filteredShips = this.ships.filter(ship => this.isShipInZone(ship, this.selectedZone, this.selectedZoneType));
    this.generateChartData(filteredShips);
  }

  isShipInZone(ship: any, zone: any, type: string): boolean {
    if (type === 'circle') {
      return this.circleZoneHandler.isShipInZone(ship, zone);
    } else if (type === 'polygon') {
      return this.polygonZoneHandler.isShipInZone(ship, zone);
    }
    return false;
  }
}
