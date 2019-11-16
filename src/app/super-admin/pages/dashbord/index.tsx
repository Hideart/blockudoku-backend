import React, { Component } from 'react';
import styledComponents from 'styled-components';

import { default as styles } from './styles';

import { CustomDatepicker } from '@/core/components/datepicker';
import { Select } from '@/core/components/select';

import {
  IOwnProps,
} from '@/core/components/layout/types';
import { DateFilter } from '@/core/components/date-filter';

import { Card } from '@/core/components/card';
import moment from 'moment';
import { GraphicPie } from '@/core/components/graphic-pie';
import { GraphicLine, graphicLineColor } from '@/core/components/graphic-line';
import { GraphicBar } from '@/core/components/graphic-bar';

class SADashboard extends Component<IOwnProps> {
  filtering = () => {
    console.log(1);
  }

  render() {
      const data = [
        { label: 'Today', value: moment().startOf('day') },
        { label: 'This week', value: moment().subtract(1, 'weeks') },
        { label: 'This month', value: moment().subtract(1, 'months') },
        { label: 'This year', value: moment().subtract(1, 'years') },
      ];

      const series = [{
        name: 'Brands',
        data: [{
          name: 'Team management',
          percent: 20,
          y: 20,
        }, {
          name: 'Crypto exchange',
          percent: 30,
          y: 40,
        }, {
          name: '30% White sound service',
          percent: 40,
          y: 40,
        }, {
          name: 'App for cleaners',
          percent: 50,
          y: 40,
        }],
      }];

      const chartData = [
        { name: 'USD', value: 89 },
        { name: 'GBP', value: 65 },
        { name: 'EUR', value: 43 },
        { name: 'ZAR', value: 18 },
      ];

      const options = [
        { key: 'chocolate', value: 'Chocolate' },
        { key: 'strawberry', value: 'Strawberry' },
        { key: 'vanilla', value: 'Vanilla' },
      ];

      const seriesLine = [{
        name: '',
        type: 'areaspline',
        data: [{
            x: 1,
            y: 500,
        }, {
            x: 2,
            y: 1000,
        }, {
            x: 3,
            y: 1600,
        }, {
            x: 4,
            y: 3658,
        }, {
            x: 5,
            y: 156,
        }, {
            x: 6,
            y: 1500,
        }, {
            x: 7,
            y: 2000,
        }, {
            x: 8,
            y: 3000,
        }, {
            x: 9,
            y: 2100,
        }, {
            x: 10,
            y: 56,
        }, {
            x: 11,
            y: 1111,
        }],
    }];

      const { className } = this.props;
      return (
      <section className={`${className} dashboard`}>
        <section className='dashboard__filters'>
            <CustomDatepicker />
            <DateFilter data={data} onChange={() => {this.filtering(); }} />
        </section>
        <section className='dashboard__content'>
            <Card title='Subscription Revenue' value='100000$' />
            <Card title='Total Subscriptions' value='1000' />
            <Card title='Total Orders' value='100000' />
            <Card title='Total SMS' value='8000' />
            <Card title='All Service Users' value='2000' />
            <section className='dashboard__graphic dashboard__graphic_medium'>
                <p className='dashboard__graphic-title'>Subscription Revenue by Currency</p>
                <GraphicBar chartData={chartData}/>
            </section>
            <section className='dashboard__graphic dashboard__graphic_medium'>
                <GraphicPie series={series} chartWidth={261}/>
                <div className='dashboard__graphic-aside'>
                  <p className='dashboard__graphic-title'>Subscription by Status</p>
                  {series[0].data.map((el, i) => (
                    <dl key={i}>
                      <dt>{el.percent + '%'}</dt>
                      <dd>{el.name}</dd>
                    </dl>
                  ))}
                </div>
            </section>
            <section className='dashboard__graphic dashboard__graphic_medium'>
                <GraphicPie series={series} chartWidth={261}/>
                <div className='dashboard__graphic-aside'>
                  <Select
                      placeholder='All Service Providers'
                      options={options}
                  />
                  <p className='dashboard__graphic-title'>Orders by Status</p>
                  {series[0].data.map((el, i) => (
                    <dl key={i}>
                      <dt>{el.percent + '%'}</dt>
                      <dd>{el.name}</dd>
                    </dl>
                  ))}
                </div>
            </section>
            <section className='dashboard__graphic dashboard__graphic_medium'>
                <GraphicPie series={series} chartWidth={261}/>
                <div className='dashboard__graphic-aside'>
                    <Select
                      placeholder='All Service Providers'
                      options={options}
                    />
                  <p className='dashboard__graphic-title'>Quotes by Status</p>
                  {series[0].data.map((el, i) => (
                    <dl key={i}>
                      <dt>{el.percent + '%'}</dt>
                      <dd>{el.name}</dd>
                    </dl>
                  ))}
                </div>
            </section>
            <section className='dashboard__wrap'>
                  <Select
                      placeholder='Month'
                      options={options}
                  />
                  <Select
                      placeholder='Year'
                      options={options}
                  />
                  <Select
                      placeholder='All Service Providers'
                      options={options}
                  />
              <section className='dashboard__graphic dashboard__graphic_big'>
                <p className='dashboard__graphic-title'>Subscription by Status</p>
                <p className='dashboard__graphic-subtitle'>Orders</p>
                <GraphicLine series={seriesLine} />
              </section>
              <section className='dashboard__graphic dashboard__graphic_big dashboard__graphic_red'>
                <p className='dashboard__graphic-title'>Subscription by Status</p>
                <p className='dashboard__graphic-subtitle'>Orders</p>
                <GraphicLine series={seriesLine} view={graphicLineColor.RED} />
              </section>
              <section className='dashboard__graphic dashboard__graphic_big dashboard__graphic_green'>
                <p className='dashboard__graphic-title'>Subscription by Status</p>
                <p className='dashboard__graphic-subtitle'>Orders</p>
                <GraphicLine series={seriesLine} view={graphicLineColor.GREEN} />
              </section>
            </section>
        </section>
      </section>
    );
  }
}

export const SADashbordPage = styledComponents(SADashboard)`${styles}`;
