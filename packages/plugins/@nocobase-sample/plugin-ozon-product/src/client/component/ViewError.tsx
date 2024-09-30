/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC } from 'react';
import { Result, Button } from 'antd';

interface Props {
  getAttributeList: () => void;
}

const ViewSpin: FC<Props> = ({ getAttributeList }) => (
  <Result
    status="500"
    title="500"
    subTitle="服务器发生了错误。"
    extra={
      <Button type="primary" color="danger" onClick={getAttributeList}>
        重试
      </Button>
    }
  />
);

export default ViewSpin;
