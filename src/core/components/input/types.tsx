import { MouseEvent, FocusEvent, ChangeEvent } from 'react';

export interface IOwnState {
    placeholderShown: boolean;
}

export interface IOwnProps {
    readonly style?: Object;
    readonly className?: string;
    readonly name?: string;
    readonly value: string | number;
    readonly type: string;
    readonly disabled?: boolean;
    readonly placeholder?: string;
    readonly onChange: (e: ChangeEvent) => void;
    readonly onClick?: (e: MouseEvent) => void;
    readonly onBlur?: (e: FocusEvent) => void;
    readonly onFocus?: (e: FocusEvent) => void;
}

export interface IInput {
    handleClick: (e: MouseEvent) => void;
    handleBlur: (e: FocusEvent) => void;
    handleFocus: (e: FocusEvent) => void;
}
