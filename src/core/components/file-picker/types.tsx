export interface IOwnState {
  loaded: string;
}

export interface IOwnProps {
  readonly className?: string;
  readonly style?: Object;
  readonly isLoading: boolean;
  readonly onDrop: (files: File[]) => void;
  readonly value?: File;
  readonly multiple: boolean;
  currentImage?: string;
}

export interface IImagePicker {
  onDropHandler: (files: Array<File>) => void;
}
