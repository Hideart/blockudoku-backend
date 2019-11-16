
export interface IOwnState {
    isOpened: boolean;
}

export interface IOwnProps {
    readonly className?: string;
    readonly name: string;
    readonly onClick?: (e: MouseEvent) => void;
}

export interface IAccordion {
    handleClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}