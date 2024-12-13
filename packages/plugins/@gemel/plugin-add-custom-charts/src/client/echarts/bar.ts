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

export class Bar extends ECharts {
  constructor() {
    super({
      name: 'bar',
      title: 'Bar Chart',
      series: { type: 'bar' },
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
      type: 'value',
      name: xLabel,
    };
    props.yAxis = {
      ...props.yAxis,
      name: yLabel,
    };

    return props;
  }
}

new Bar();
