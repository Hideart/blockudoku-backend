export interface IOwnProps {
  readonly className?: string;
  readonly defaultVal?: ISelectOption;
  readonly options: ISelectOption[];
  readonly placeholder?: string;
  readonly onChange?: (select: any) => void;
}

export interface ICustomSelect {
    getOptionLabel: (option: ISelectOption) => string;
    getOptionValue: (option: ISelectOption) => string;
}

export interface ISelectOption {
    value: string;
    key: string;
}
