import React, { Component } from 'react';
import styledComponents from 'styled-components';

import { Checkbox } from '@/core/components/checkbox';
import { Button } from '@/core/components/button';

import { default as styles } from './styles';

import {
    IOwnProps,
    ITable,
    OrderDirections,
    ITableData,
    ITableSortParams,
} from './types';
export type ITableSortParams = ITableSortParams;

class TableLayout<T> extends Component<IOwnProps<T> & { data: (T & ITableData)[] }> implements ITable<T> {

  //#region Event handlers
  allSelectHandler = (): void => {
    const { data, selectedRecs, onSelect } = this.props;
    if (selectedRecs && onSelect) {
      if ( data.length && (data.length !== selectedRecs.length) ) {
        const selectedRows = data.map(rec => rec.id);
        onSelect(selectedRows);
      } else {
        onSelect([]);
      }
    }
  }

  selectHandler = (recId?: string | number): void => {

    const { selectedRecs, onSelect } = this.props;

    if (selectedRecs && onSelect) {
      if (recId && !selectedRecs.includes(recId.toString())) {
        const selectedRows = [...selectedRecs, recId.toString()];
        onSelect(selectedRows);
      } else {
        const selectedRows = [...selectedRecs].filter(id => id !== recId);
        onSelect(selectedRows);
      }
    }
  }

  onSortHandler = (source: string) => (event: React.MouseEvent): void => {
    event.preventDefault();

    const { sort, onSort } = this.props;

    if (sort && onSort) {
      let order = sort.order;
      if (source === sort.column) {
        order = sort.order === OrderDirections.ASC ? OrderDirections.DESC : OrderDirections.ASC;
      } else {
        order = OrderDirections.DESC;
      }

      onSort({
        ...sort,
        column: source,
        order: order,
      });
    }
  }

  onPaginationHandler = (event: React.MouseEvent): void => {
    const { sort, onPagination, isDataLoading } = this.props;
    if (sort) {
      const isDataExists: boolean = sort.limit.end < sort.limit.total;
      if (isDataExists && !isDataLoading) {
        const nextCount = sort && sort.limit.end + sort.limit.step;
        nextCount && onPagination && onPagination({
          ...sort,
          limit: {
            ...sort.limit,
            end: nextCount,
          },
        });
      }
    }
  }

  //#endregion

  //#region Conditional rendering

  getHeaderSortClass = (source: string): string => {
    const { sort } = this.props;

    if (sort && sort.column === source) {
      switch (sort.order) {
        case OrderDirections.ASC:
          return ' sorted-asc';

        case OrderDirections.DESC:
          return ' sorted-desc';

        default:
          return '';
      }
    }

    return '';
  }

  getColumnsData = (record: (T & ITableData)): JSX.Element[] => {

    const items: JSX.Element[] = [];
    const { columns } = this.props;

    for (let i = 0; i < columns.length; i++) {
      const column  = columns[i];
      let newField: any = record[i];
      if (column && column.source !== record[i]) {
          newField = Object.entries(record).find(f => f[0] === column.source) || ['', undefined];
      }

      if (column.key === 'custom-column' && column.onRender) {
        let userColumnClass = 'user-column';
        if (column.isFixed) {
          userColumnClass += ' sticky-col';
        }
        items.push(<td key={`tb-col-${i}`} className={userColumnClass}>{column.onRender(record)}</td>);
      } else {

        items.push(
          <td key={`tb-col-${i}`} className='table-row'>{column.onRender ? column.onRender(record) : newField[1]} </td>,
        );
      }

    }

    return items;
  }

  handleRowClick = (rec: (T & ITableData)) => (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    const target = event.target as HTMLElement;
    console.log(target.nodeName);

    if (
      target.nodeName === 'svg' ||
      target.nodeName === 'INPUT' ||
      target.nodeName === 'path' ||
      target.classList.contains('user-column') ||
      target.classList.contains('ll-checkbox') ||
      target.classList.contains('invisible-checkbox') ||
      target.classList.contains('table-cb') ||
      target.classList.contains('user-column') ||
      target.id === 'checkbox'
    ) {
      return;
    }

    const { onRowClick } = this.props;
    if (onRowClick) {
      onRowClick(rec);
    }
  }

  getLimitedData = (): JSX.Element[] => {

    const  {data, selectedRecs, onSelect } = this.props;
    const recsArray: JSX.Element[] = [];

    let sort = this.props.sort;
    if (!sort) sort = {column: 'id', order: OrderDirections.DESC, limit: {start: 0, end: 10, step: 10, total: 10}};

    for (let i = sort.limit.start; i < sort.limit.end; i++) {
      if (data[i] && data[i].id) {
        // tslint:disable: jsx-wrap-multiline
        // tslint:disable: jsx-no-multiline-js
        recsArray.push(
          <tr key={data[i].id} onClick={this.handleRowClick(data[i])}>
            {selectedRecs && onSelect &&
              <td className='table-cb'>
                <Checkbox
                  onChange={this.selectHandler}
                  value={data[i].id}
                  checked={selectedRecs.includes(data[i].id)}
                />
              </td>
            }
            {this.getColumnsData(data[i]).map(field => ( field ))}
          </tr>,
        );
      }
    }

    return recsArray;
  }

  getPaginationButton = (): JSX.Element | null => {
    const { sort } = this.props;
    if (sort && (sort.limit.end < sort.limit.total)) {
      return (<Button className='load-more-btn' onClick={this.onPaginationHandler}>Load more</Button>);
    }
    return null;
  }

  //#endregion

  //#region  Render view
  render() {
    const {
      className,
      columns,
      data,
      style,
      selectedRecs,
      onSelect,
    } = this.props || this.state;

    const tableScrollClass = ' table-scroll';

    return (
        <section className={className + tableScrollClass} style={style}>
          <div className='table-wrapper'>
            <table id='data-table' className='data-table'>
              <thead>
                <tr>
                  {/* tslint:disable:jsx-no-multiline-js */}
                  {selectedRecs && onSelect ?
                    <th className='table-cb'>
                      <Checkbox onChange={this.allSelectHandler} checked={data.length === selectedRecs.length} />
                    </th> :
                    ''
                  }
                  {columns.map((el, i) => (
                    <th key={el.key}>
                      <button className='dt-sort-btn' onClick={this.onSortHandler(el.key)}>
                        <span className={`dt-header-title${this.getHeaderSortClass(el.key)}`}>
                          {el.label}
                        </span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.getLimitedData()}
              </tbody>
            </table>
          </div>
          {this.getPaginationButton()}
        </section>
    );
  }
  //#endregion
}

export const Table: new <T>() => TableLayout<T> = styledComponents(TableLayout)`${styles}` as any;