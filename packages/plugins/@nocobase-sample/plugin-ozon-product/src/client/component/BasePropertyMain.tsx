/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer } from '@formily/react';
import { Button, message } from 'antd';
import React, { FC, useRef, useState, useEffect } from 'react';
import { useForm } from '@formily/react';
import { FieldComponentName } from '../constants';
import BasePropertyDrawer from './BasePropertyDrawer';

export interface Props {
  typeField: string;
  operationType: string;
  primaryProperty: string;
}

export const BasePropertyMain: FC<Props> = observer(
  ({ typeField, operationType, primaryProperty }) => {
    const form = useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const drawerRef = useRef(null);
    const [hasInit, setHasInit] = useState(false);
    const [prevTypeValue, setPrevTypeValue] = useState(undefined);

    const operationTypeText = operationType === 'add' ? '添加' : operationType === 'update' ? '编辑' : '查看';
    const typeValue = typeField ? form.values[typeField] : undefined;

    const handleOpenDrawer = () => {
      if (!typeValue) return messageApi.info('请选择商品类目');
      const ConreteCategory = hasConcreteCategory();
      if (!ConreteCategory) {
        return messageApi.info('请选择具体商品类目');
      } else {
        setHasInit(true);
        comparisonType(); // 对比商品类目是否发生变化

        setTimeout(() => {
          if (drawerRef.current) drawerRef.current.showDrawer(); // 打开抽屉
        }, 0);
      }
    };

    useEffect(() => {
      if (typeValue) {
        const ConreteCategory = hasConcreteCategory();
        if (!prevTypeValue && ConreteCategory) {
          setPrevTypeValue(typeValue); // 初始化 存储商品类目信息
        }
      }
    }, [typeValue]);

    // 对比商品类目是否发生变化
    const comparisonType = () => {
      // console.log('typeValue,prevTypeValue----', typeValue, prevTypeValue);
      if (typeValue.ozon_id != prevTypeValue.ozon_id) {
        form.values[primaryProperty] = ''; // 清空基础属性
      }
    };

    // 对比是否 为具体类目
    const hasConcreteCategory = () => {
      const { ozon_id, ozon_parent_id } = typeValue;
      const startNum = Number(String(ozon_id).slice(0, 2));
      const endNum = ozon_parent_id % 100;

      return startNum === endNum;
    };

    return (
      <>
        <div>
          {contextHolder}
          <Button type="primary" onClick={handleOpenDrawer}>
            {operationTypeText}基础属性
          </Button>
        </div>

        {hasInit && (
          <BasePropertyDrawer
            ref={drawerRef}
            operationType={operationType}
            primaryProperty={primaryProperty}
            operationTypeText={operationTypeText}
            typeValue={typeValue}
          ></BasePropertyDrawer>
        )}
      </>
    );
  },
  { displayName: FieldComponentName },
);
