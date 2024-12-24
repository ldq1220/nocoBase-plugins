/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC, useState, useImperativeHandle, forwardRef } from 'react';
import { Drawer } from 'antd';
import AddAndUpdatePropertyContainer from './AddAndUpdatePropertyContainer';
import LookPropertyContainer from './LookPropertyContainer';

interface BasePropertyDrawerProps {
  ref: any;
  typeValue: any;
  operationType: string;
  primaryProperty: string;
  operationTypeText: string;
}

const BasePropertyDrawer: FC<BasePropertyDrawerProps> = forwardRef(
  ({ typeValue, operationType, primaryProperty, operationTypeText }, ref) => {
    const [open, setOpen] = useState(false);

    // 暴露给父组件的 `showDrawer` 方法
    useImperativeHandle(ref, () => ({
      showDrawer() {
        setOpen(true);
      },
    }));

    const onClose = () => {
      setOpen(false);
    };

    return (
      <Drawer title={operationTypeText + '基础属性'} onClose={onClose} open={open} width="40%">
        {['add', 'update'].includes(operationType) && (
          <AddAndUpdatePropertyContainer
            typeValue={typeValue}
            primaryProperty={primaryProperty}
            open={open}
            onClose={onClose}
          ></AddAndUpdatePropertyContainer>
        )}
        {['look'].includes(operationType) && (
          <LookPropertyContainer
            typeValue={typeValue}
            primaryProperty={primaryProperty}
            open={open}
            onClose={onClose}
          ></LookPropertyContainer>
        )}
      </Drawer>
    );
  },
);

export default BasePropertyDrawer;
