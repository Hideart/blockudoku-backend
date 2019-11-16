import { MouseEventHandler, FocusEvent } from 'react';

export enum ButtonTypeView {
    MAIN = 'main',
    SECOND = 'second',
}
export interface IOwnProps {
  readonly className?: string;
  readonly icon?: JSX.Element;
  readonly type?: any;
  readonly style?: Object;
  readonly view?: ButtonTypeView;
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
  readonly onBlur?: (evt: FocusEvent<HTMLButtonElement>) => void;
  readonly onFocus?: (evt: FocusEvent<HTMLButtonElement>) => void;
  readonly disabled?: boolean;
}
