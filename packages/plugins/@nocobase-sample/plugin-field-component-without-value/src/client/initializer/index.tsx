/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import {
  SchemaInitializerActionModal,
  SchemaInitializerItemType,
  SelectProps,
  useCollection,
  useCompile,
  useSchemaInitializer,
} from '@nocobase/client';
import { MenuOutlined } from '@ant-design/icons';

import { FieldNameLowercase } from '../constants';
import { useT } from '../locale';
import { getOrderDetailsSchema } from '../schema';

export function useFieldOptions(): SelectProps['options'] {
  const collection = useCollection();

  const compile = useCompile();
  return collection
    .getFields()
    .map((field) => ({ label: field.uiSchema?.title ? compile(field.uiSchema.title) : field.name, value: field.name }));
}

const OrderDetailsSchemaInitializer = () => {
  const t = useT();
  const { insert } = useSchemaInitializer();
  const options = useFieldOptions();

  return (
    <SchemaInitializerActionModal
      buttonText={t('Order Details')}
      title={t('Select Order Field')}
      icon={<MenuOutlined />}
      isItem
      onSubmit={({ orderField }) => {
        insert(getOrderDetailsSchema(orderField));
      }}
      schema={{
        orderField: {
          type: 'string',
          title: t('Order field'),
          required: true,
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: options,
        },
      }}
    ></SchemaInitializerActionModal>
  );
};

export const orderDetailsInitializerItem: SchemaInitializerItemType = {
  name: FieldNameLowercase,
  Component: OrderDetailsSchemaInitializer,
};
