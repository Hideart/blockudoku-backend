
export interface IOwnProps {
  readonly className?: string;
  readonly style?: Object;
  readonly chartStyle?: Highcharts.ChartOptions;
  readonly chartWidth?: number;
  readonly series: IPieSeries[];
}

export interface IPieSeries {
  name: string;
  data: IPieData[];
}

export interface IPieData {
  name: string;
  y: number;
}
