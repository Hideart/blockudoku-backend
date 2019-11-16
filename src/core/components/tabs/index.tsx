import React, { Component } from 'react';
import styledComponents from 'styled-components';
import classNames from 'classnames';

import { default as styles } from './styles';
import { ButtonTypeView } from './types';

import {
    IOwnProps,
} from './types';
export { ButtonTypeView };

class ButtonLayout extends Component<IOwnProps> {
    readonly state = {
        activeTabKey: '',
    };
    handleClick = (activeTabKey: string) => {
        const { onTabChange } = this.props;

        this.setState({ activeTabKey });
        if (onTabChange) {
            onTabChange(activeTabKey as string);
        }
    }
    render() {
        const {
            className,
            tabs,
            defaultSelect,
        } = this.props;
        const { activeTabKey } = this.state;
        const isTabActive = (key: string) => {
            return activeTabKey === key || (defaultSelect ===  key && activeTabKey === '');
        };

        return (
            <section className={className}>
                {/* tslint:disable-next-line: jsx-no-multiline-js */}
                {tabs.map(tab => (
                    <div
                        key={tab.key}
                        className={classNames('tab', { tab_active: isTabActive(tab.key as string) })}
                        // tslint:disable-next-line: jsx-no-lambda
                        onClick={() => this.handleClick(tab.key as string)}
                    >
                        {tab.label}
                    </div>
                ))}

            </section>
        );
    }
  }

export const Tabs = styledComponents(ButtonLayout)`${styles}`;
