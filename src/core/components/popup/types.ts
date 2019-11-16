
export interface IOwnProps {
    readonly className?: string;
    readonly title?: string;
    readonly visible: boolean;
    readonly onClose: () => void;
}