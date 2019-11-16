export enum graphicLineColor {
  BLUE = 'blue',
  RED = 'red',
  GREEN = 'green',
}

export interface IOwnProps {
  readonly className?: string;
  readonly style?: Object;
  readonly series: ILineSeries[];
  readonly view?: graphicLineColor;
}

export interface ILineSeries {
  name: string;
  data: ILineData[];
}

export interface ILineData {
  x: number;
  y: number;
}