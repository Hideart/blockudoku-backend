
export interface IOwnProps {
  readonly className?: string;
  readonly style?: Object;
  chartData: Array<IChartData>;
}

export interface IChartData {
  name: string;
  value: number;
}
