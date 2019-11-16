import React, { Component } from 'react';
import styledComponents from 'styled-components';

import { default as styles } from './styles';

import {
    IOwnProps,
} from './types';

class GraphicBarLayout extends Component<IOwnProps> {

    renderData = (): Array<JSX.Element> => {
        const {chartData} = this.props;
        const elements: Array<JSX.Element> = [];

        for (const dataItem of chartData) {
            elements.push(
                // tslint:disable-next-line: jsx-wrap-multiline
                <section className='graphic-bar__item' key={dataItem.name}>
                    <p className='graphic-bar__item-name'>{dataItem.name}</p>
                    <div className='graphic-bar__item-scale'>
                        <div style={{width: `${dataItem.value}%`}} className='graphic-bar__item-value'>
                            <span>{dataItem.value}%</span>
                        </div>
                    </div>
                </section>,
            );
        }
        return elements;
    }
    render() {
        const {className, ...others } = this.props;

        return (
            <div className={`${className} graphic-bar`} {...others}>
                {this.renderData()}
            </div>
        );
    }
  }

export const GraphicBar = styledComponents(GraphicBarLayout)`${styles}`;
