import { ChangeEventHandler, FocusEventHandler } from 'react';

export interface IOwnProps {
  readonly className?: string;
  readonly label?: string;
  readonly value?: number | string;
  readonly disabled?: boolean;
  readonly checked?: boolean;
  readonly onChange?: (value?: string | number) => void;
  readonly onBlur?: FocusEventHandler;
  readonly onFocus?: FocusEventHandler;
}

export interface ICheckbox {
  changeHandler: ChangeEventHandler;
}

export interface IChangeCallback {
  value: boolean;
}