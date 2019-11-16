import React, { Component } from 'react';
import styledComponents from 'styled-components';
import ReactHighcharts from 'react-highcharts';
import { AppColor, GraphicColor } from '@/core/models/enums/app-color';
import { graphicLineColor } from './types';

import { default as styles } from './styles';

import {
    IOwnProps,
} from './types';
export { graphicLineColor };
// tslint:disable-next-line: class-name
class graphicLineLayout extends Component<IOwnProps> {

    getLineColor(): string {
        const { props } = this;
        switch (props.view) {
            case graphicLineColor.BLUE:
                return GraphicColor.darkBlue;
            case graphicLineColor.RED:
                return AppColor.red;
            case graphicLineColor.GREEN:
                return AppColor.green;
            default:
                return AppColor.blue;
        }
    }

    render() {
        const {className, style, series} = this.props;

        const config: Highcharts.Options = {
        chart: {
            type: 'areaspline',
            className: 'graphic-line',
        },
        navigation: {
            buttonOptions: {
                enabled: false,
            },
        },
        subtitle: undefined,
        title: undefined,
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar',
                'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                crosshair: {
                  color: GraphicColor.whiteBlue,
                  width: 1,
                  zIndex: 2,
                },
                labels: {
                    style: {
                        fontSize: '14px',
                        color: AppColor.black,
                    },
                 },
        },
        yAxis: {
            categories: [0, 1000, 2000, 3000, 4000],
            plotLines: [{
                color: AppColor.grey,
                value: 0,
                width: 1,
            }],
            tickInterval: 1000,
            title: undefined,
            labels: {
                style: {
                    fontSize: '14px',
                    color: AppColor.black,
                },
             },
        },
        tooltip: {
            enabled: false,
            borderRadius: 3,
            borderWidth: 1,
        },
        legend: {
          enabled: false,
        },
        credits: {
            enabled: false,
        },
        plotOptions: {
            areaspline: {
                fillColor: 'rgba(60,75,242,0.05)',
                lineWidth: 4,
                marker: {
                    enabled: false,
                    fillColor: AppColor.white,
                    lineColor: this.getLineColor(),
                    lineWidth: 8,
                    radius: 9,
                },
                threshold: null,
            },
            series: {
                color: this.getLineColor(),
                shadow: {
                    width: 8,
                    offsetY: 2,
                    color: '#3c4bf2',
                    opacity: 0.05,
                },
                point: {
                    events: {
                        mouseOut: function() {
                            const labelGroup = (this as any).series.chart.xAxis[0].labelGroup;
                            const element = labelGroup.element.childNodes[(this as any).x - 1];
                            if (element) element.style.fill = AppColor.black;
                        },
                        mouseOver: function() {
                            const labelGroup = (this as any).series.chart.xAxis[0].labelGroup;
                            const element = labelGroup.element.childNodes[(this as any).x - 1];
                            if (element) element.style.fill = GraphicColor.darkBlue;
                        },
                    },
                },
            },
        },
        series,
        };
        return (
            <section
                style={style && style}
                className={`${className} graphicLine`}
            >
                <ReactHighcharts config={config} />
            </section>
        );
    }
  }

export const GraphicLine = styledComponents(graphicLineLayout)`${styles}`;