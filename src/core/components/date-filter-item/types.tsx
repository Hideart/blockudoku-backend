import { ChangeEventHandler } from 'react';
import { Moment } from 'moment';

export interface IOwnState {
  value: string | number;
}

export interface IOwnProps {
  readonly value: Moment | Date;
  readonly defaultChecked?: number;
  readonly onChange: (value: IDateRange) => void;
  readonly className?: string;
}

export interface IInput {
  changeInput: ChangeEventHandler;
}

export interface IDateRange {
  start: string;
  end: string;
}
