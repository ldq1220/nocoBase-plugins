/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ChartType, RenderProps } from '@nocobase/plugin-data-visualization/client';
import { ECharts } from './echarts';
import deepmerge from 'deepmerge';

export class Pie extends ECharts {
  constructor() {
    super({
      name: 'pie',
      title: 'Pie Chart',
      series: { type: 'pie' },
    });
    this.config = [
      {
        configType: 'field',
        name: 'angleField',
        title: 'angleField',
        required: true,
      },
      {
        configType: 'field',
        name: 'colorField',
        title: 'colorField',
        required: true,
      },
    ];
  }

  init: ChartType['init'] = (fields, { measures, dimensions }) => {
    const { xField, yField } = this.infer(fields, { measures, dimensions });
    return {
      general: {
        colorField: xField?.value,
        angleField: yField?.value,
      },
    };
  };
}
