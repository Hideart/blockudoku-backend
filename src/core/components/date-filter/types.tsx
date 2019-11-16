import { Moment } from 'moment';
import { IDateRange } from '@/core/components/date-filter-item/types';

export interface IOwnState {
  value: string | number;
}

export interface IOwnProps {
  readonly data: IDateFilterParams[];
  readonly onChange: (value: IDateRange) => void;
  readonly className?: string;
  readonly style?: Object;
  readonly isLoading?: boolean;
  readonly defaultChecked?: number;
}

export interface IDateFilter {
  onChangeHandler: (value: IDateRange) => void;
}

export interface IDateFilterParams {
  label: string;
  value: Moment;
}
