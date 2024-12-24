/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import { ECharts, Pie, Bar, Line } from './echarts';
import DataVisualizationPlugin from '@nocobase/plugin-data-visualization/client';

export class PluginAddCustomChartsClient extends Plugin {
  async afterAdd() {}

  async beforeLoad() {
    const plugin = this.app.pm.get(DataVisualizationPlugin);
    plugin.charts.addGroup('echarts', {
      title: 'ECharts',
      charts: [
        new ECharts({
          name: 'echarts',
          title: 'ECharts',
          series: { type: 'line' },
        }),
        new Pie(),
        new Bar(),
        new Line(),
      ],
    });
  }

  async load() {
    console.log(this.app);
  }
}

export default PluginAddCustomChartsClient;
