/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Alert, Flex, Spin } from 'antd';

const ViewSpin: React.FC = () => (
  <Flex gap="middle" vertical>
    <Spin tip="加载中...">
      <Alert message="商品基础属性" description="数据加载中，请耐心等待。。。" type="info" />
    </Spin>
  </Flex>
);

export default ViewSpin;
