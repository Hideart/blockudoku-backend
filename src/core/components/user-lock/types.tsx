export interface IOwnState {
}

export interface IOwnProps {
  readonly className?: string;
  readonly checked?: boolean;
  readonly onChange?: (value: boolean) => void;
}
