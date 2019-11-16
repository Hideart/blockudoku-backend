import React, { Component } from 'react';
import styledComponents from 'styled-components';
import ReactHighcharts from 'react-highcharts';

import { default as styles } from './styles';

import {
    IOwnProps,
} from './types';
import { GraphicColor } from '@/core/models/enums/app-color';

class GraphicPieLayout extends Component<IOwnProps> {
    render() {
        const {className, chartWidth, chartStyle, style, series } = this.props;

        const config: Highcharts.Options = {
            chart: {
              plotShadow: false,
              type: 'pie',
              margin: [0, 0, 0, 0],
              spacingTop: 0,
              spacingBottom: 0,
              spacingLeft: 0,
              spacingRight: 0,
              width: chartWidth && chartWidth,
              height: chartWidth && chartWidth,
              ...chartStyle,
            },
            title: {
              text: undefined,
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            },
            credits: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    enabled: false,
                  },
                  showInLegend: false,
                  size: '100%',
                  borderWidth: 0,
                },
            },
            colors: [
                GraphicColor.darkBlue,
                GraphicColor.blue,
                GraphicColor.lightBlue,
                GraphicColor.whiteBlue,
            ],
            series,
        };
        return (
            <section
                style={style}
                className={`${className} graphic-pie`}
            >
                <ReactHighcharts config={config} />
            </section>
        );
    }
  }

export const GraphicPie = styledComponents(GraphicPieLayout)`${styles}`;
