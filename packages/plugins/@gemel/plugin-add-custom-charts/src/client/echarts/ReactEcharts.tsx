/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useEffect } from 'react';
import ReactEChartsComponent, { EChartsInstance, EChartsReactProps } from 'echarts-for-react';

export const ReactECharts = (props: EChartsReactProps['option']) => {
  const echartRef = React.useRef<EChartsInstance>();
  useEffect(() => {
    echartRef.current?.resize();
  });
  return <ReactEChartsComponent option={props} ref={(e) => (echartRef.current = e)} />;
};
