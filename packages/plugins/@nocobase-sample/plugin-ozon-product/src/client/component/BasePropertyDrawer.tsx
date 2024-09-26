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
import AddPropertyContainer from './AddPropertyContainer';
import UpdatePropertyContainer from './UpdatePropertyContainer';
import LookPropertyContainer from './LookPropertyContainer';
import BottonGroup from './BottonGroup';

interface BasePropertyDrawerProps {
  ref: any;
  typeField: string;
  operationType: string;
  operationTypeText: string;
  typeValue: any;
}

const BasePropertyDrawer: FC<BasePropertyDrawerProps> = forwardRef(
  ({ typeField, operationType, operationTypeText, typeValue }, ref) => {
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
        {operationType === 'add' && <AddPropertyContainer typeValue={typeValue} open={open}></AddPropertyContainer>}
        {operationType === 'update' && (
          <UpdatePropertyContainer typeValue={typeValue} open={open}></UpdatePropertyContainer>
        )}
        {operationType === 'look' && <LookPropertyContainer typeValue={typeValue} open={open}></LookPropertyContainer>}
      </Drawer>
    );
  },
);

export default BasePropertyDrawer;
