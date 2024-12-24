/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { RenderProps } from '@nocobase/plugin-data-visualization/client';
import { ECharts } from './echarts';

export class Line extends ECharts {
  constructor() {
    super({
      name: 'line',
      title: 'Line Chart',
      series: { type: 'line' },
    });
    this.config = [
      {
        configType: 'field',
        title: 'xField',
      },
      {
        configType: 'field',
        title: 'yField',
      },
      'seriesField',
    ];
  }

  getProps({ data, general, advanced, fieldProps }: RenderProps) {
    const props = super.getProps({ data, general, advanced, fieldProps });
    const xLabel = fieldProps[general.xField]?.label;
    const yLabel = fieldProps[general.yField]?.label;
    props.xAxis = {
      ...props.xAxis,
      name: xLabel,
      type: 'time',
    };
    props.yAxis = {
      ...props.yAxis,
      name: yLabel,
      type: 'category',
    };

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          emphasis: {
            focus: 'series',
          },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'Email',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series',
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ads',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series',
          },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'Search Engine',
          type: 'bar',
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          emphasis: {
            focus: 'series',
          },
          markLine: {
            lineStyle: {
              type: 'dashed',
            },
            data: [[{ type: 'min' }, { type: 'max' }]],
          },
        },
        {
          name: 'Baidu',
          type: 'bar',
          barWidth: 5,
          stack: 'Search Engine',
          emphasis: {
            focus: 'series',
          },
          data: [620, 732, 701, 734, 1090, 1130, 1120],
        },
        {
          name: 'Google',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series',
          },
          data: [120, 132, 101, 134, 290, 230, 220],
        },
        {
          name: 'Bing',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series',
          },
          data: [60, 72, 71, 74, 190, 130, 110],
        },
        {
          name: 'Others',
          type: 'bar',
          stack: 'Search Engine',
          emphasis: {
            focus: 'series',
          },
          data: [62, 82, 91, 84, 109, 110, 120],
        },
      ],
    };
  }
}

new Line();
