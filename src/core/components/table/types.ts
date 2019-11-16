export interface IOwnProps<T> {
  readonly className?: string;
  readonly columns: ITableColumns<T>[];
  readonly selectedRecs?: string[];
  readonly sort?: ITableSortParams;
  readonly isDataLoading?: boolean;
  readonly style?: any;
  readonly multiSelect?: boolean;
  readonly onSort?: (sortParams: ITableSortParams) => void;
  readonly onPagination?: (sortParams: ITableSortParams) => void;
  readonly onSelect?: (selectRecs: string[]) => void;
  readonly onRowClick?: (rec: (T & ITableData)) => void;
}

export interface ITable<T> {
  allSelectHandler?: () => void;
  selectHandler: (value: string) => void;
  onSortHandler: (source: string) => (event: React.MouseEvent) => void;
  getHeaderSortClass: (source: string) => string;
  getColumnsData: (record: (T & ITableData)) => JSX.Element[];
  getLimitedData: () => JSX.Element[];
  getPaginationButton: () => JSX.Element | null;
  onPaginationHandler: (event: React.MouseEvent) => void;
}

export interface ITableData {
  id: string;
  [key: string]: string | number | object | undefined | boolean;
}

interface ITableColumns<T> {
  label: string;
  source?: string;
  key: string;
  onRender?: (record: (T & ITableData)) => JSX.Element | JSX.Element[];
  isFixed?: boolean;
}

export interface ITableSortParams {
  column: string;
  order: OrderDirections | string;
  limit: {
    start: number,
    end: number,
    step: number,
    total: number,
  };
}

export enum OrderDirections {
  ASC = 'ASC',
  DESC = 'DESC',
}