import { MouseEventHandler, FocusEvent } from 'react';

export interface IOwnState {
    readonly startDate: Date;
    readonly endDate: Date;
}

export interface IOwnProps {
  readonly className?: string;
  readonly style?: Object;
  readonly placeholder?: string;
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
  readonly onBlur?: (evt: FocusEvent<HTMLButtonElement>) => void;
  readonly onFocus?: (evt: FocusEvent<HTMLButtonElement>) => void;
}

export interface IDatePicker {
    handleChange: (startDate?: Date | null, endDate?: Date) => void;
    handleChangeStart: (startDate: Date) => void;
    handleChangeEnd: (endDate: Date) => void;
}
