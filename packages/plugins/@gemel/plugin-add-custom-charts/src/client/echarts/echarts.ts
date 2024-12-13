/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Chart, ChartProps, ChartType, RenderProps } from '@nocobase/plugin-data-visualization/client';
import { ReactECharts } from './ReactEcharts';
import deepmerge from 'deepmerge';

export class ECharts extends Chart {
  series: any;
  constructor({
    name,
    title,
    series,
    config,
  }: {
    name: string;
    title: string;
    series: any;
    config?: ChartProps['config'];
  }) {
    super({
      name,
      title,
      Component: ReactECharts,
      config: ['xField', 'yField', 'seriesField', ...(config || [])],
    });
    this.series = series;
  }

  init: ChartType['init'] = (fields, { measures, dimensions }) => {
    const { xField, yField, seriesField } = this.infer(fields, {
      measures,
      dimensions,
    });
    return {
      general: {
        xField: xField?.value,
        yField: yField?.value,
        seriesField: seriesField?.value,
      },
    };
  };

  getProps({ data, general, advanced, fieldProps }: RenderProps) {
    console.log('data:-----', data);
    console.log('general:-----', general);
    console.log('advanced:-----', advanced);
    console.log('fieldProps:-----', fieldProps);

    const { xField, yField, seriesField } = general;
    const xLabel = fieldProps[xField]?.label;
    const yLabel = fieldProps[yField]?.label;
    let seriesName = [yLabel];
    if (seriesField) {
      seriesName = Array.from(new Set(data.map((row: any) => row[seriesField]))).map((value) => value || 'null');
    }
    const result = deepmerge(
      {
        dataset: [
          {
            dimensions: [xField, ...(seriesField ? seriesName : [yField])],
            source: data,
          },
        ],
        series: seriesName.map((name) => ({
          name,
          // datasetIndex: 1,
          ...this.series,
          encode: {
            x: xField,
            y: yField,
          },
        })),
        xAxis: {
          name: xLabel,
          type: 'category',
        },
        yAxis: {
          name: yLabel,
          type: 'category',
        },
        animation: false,
      },
      advanced,
    );

    console.log('result:--------', result);
    return result;
  }

  getReference() {
    return {
      title: 'ECharts',
      link: 'https://echarts.apache.org/en/option.html',
    };
  }
}
