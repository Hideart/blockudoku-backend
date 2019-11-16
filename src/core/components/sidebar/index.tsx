import React, { Component } from 'react';
import styledComponents from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

import { default as styles } from './styles';

import {
    IOwnProps,
    IOwnState,
    ISidebar,
} from './types';

import arrowIcon from '@/assets/img/arrow.svg';

let oldState: IOwnState = {
    isExpanded: false,
};

class SidebarLayout extends Component<IOwnProps, IOwnState> implements ISidebar {

  readonly state: IOwnState = {
      isExpanded: false,
  };

  componentDidMount = () => {
      this.setState({...oldState});
  }

  componentWillUnmount = () => {
    oldState = this.state;
  }

  expandHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
      e.preventDefault();
      this.setState((state: IOwnState) => ({ isExpanded: !state.isExpanded, isExpandClicked: true}));
  }

  render() {
    const { className, company, menuItems, mainLink } = this.props;
    const { isExpanded } = this.state;
    return (
        <section className={className}>
            <div id='sidebar' className={isExpanded ? 'sb-expander expanded' : 'sb-expander'}>
                <Link to={mainLink} className='sbi-top'>
                    <div className='sbi-icon'>
                        {
                            company && typeof company.logo === 'string' ?
                                <img src={company && company.logo} alt={company && company.title}/> :
                                company && company.logo
                        }
                    </div>
                    {isExpanded && <span className='sb-title text-light'>{company && company.title}</span>}
                </Link>
                {/* tslint:disable:jsx-no-multiline-js */}
                {menuItems && menuItems.map((el, i) => (
                    <div className='sidebar-items' key={`sbi-${i}`}>
                        <NavLink
                            exact={true}
                            to={el.url}
                            className='sidebar-item'
                            activeClassName='current'
                        >
                            <div className='sbi-icon'>
                                <img src={el.icon} alt={el.label} />
                            </div>
                            {isExpanded && <span className='sbi-label text-light'>{el.label}</span>}
                        </NavLink>
                        {el.sublinks && el.sublinks.map((subEl) => (
                            <NavLink
                                key={`sbi-${subEl.subUrl}`}
                                exact={true}
                                to={subEl.subUrl}
                                className='sidebar-subitem'
                            >
                                <span className='sbi-label text-light'>{subEl.subLabel}</span>
                            </NavLink>
                        ))}
                    </div>
                ))}
                {/* tslint:enable:jsx-no-multiline-js */}
                <button className='sidebar-item sbi-bottom' onClick={this.expandHandler}>
                    <img src={arrowIcon} alt='Settings' />
            </button>
            </div>
        </section>
    );
  }
}

export const Sidebar = styledComponents(SidebarLayout)`${styles}`;
