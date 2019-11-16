export enum ButtonTypeView {
    MAIN = 'main',
    SECOND = 'second',
}
export interface ITab {
    key: string | number;
    label: string | number;
}
export interface IOwnProps {
    readonly className?: string;
    readonly tabs: ITab[];
    readonly defaultSelect?: string;
    onTabChange?: (tabKey: string | number) => void;
}
