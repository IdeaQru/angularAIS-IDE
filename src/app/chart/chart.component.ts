import { Component, OnInit, Input } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexStroke, ApexDataLabels, ApexGrid, ApexFill, ApexMarkers, ApexTooltip, ApexPlotOptions, ApexLegend, ApexTitleSubtitle } from 'ng-apexcharts';

export type ChartOptions = {
subtitle: ApexTitleSubtitle;
  series: ApexAxisChartSeries;
  chart: ApexChart;
  stroke?: ApexStroke;
  dataLabels?: ApexDataLabels;
  grid?: ApexGrid;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  fill?: ApexFill;
  markers?: ApexMarkers;
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  labels?: string[];
  legend?: ApexLegend;
  colors?: string[];
  title?: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input()
  chartOptions!: ChartOptions;
  @Input()
  chartId!: string;
  constructor() {}

  ngOnInit(): void {}
}
