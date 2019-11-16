import { MouseEvent, FocusEvent, ChangeEventHandler } from 'react';

export interface IOwnState {
    placeholderShown: boolean;
}

export interface IOwnProps {
    readonly style?: Object;
    readonly className?: string;
    readonly value?: string | number;
    readonly placeholder?: string;
    readonly onChange?: (value: string) => void;
    readonly onClick?: (evt: MouseEvent<HTMLInputElement>) => void;
    readonly onBlur?: (evt: FocusEvent<HTMLInputElement>) => void;
    readonly onFocus?: (evt: FocusEvent<HTMLInputElement>) => void;
}

export interface IInput {
    onOwnChange: ChangeEventHandler;
}
