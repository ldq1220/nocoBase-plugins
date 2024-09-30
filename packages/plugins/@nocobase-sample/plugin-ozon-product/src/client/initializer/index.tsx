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
import { BoldOutlined } from '@ant-design/icons';

import { FieldNameLowercase } from '../constants';
import { useT } from '../locale';
import { getProductListSchema } from '../schema';

export function useFieldOptions(): SelectProps['options'] {
  const collection = useCollection();

  const compile = useCompile();
  return collection
    .getFields()
    .map((field) => ({ label: field.uiSchema?.title ? compile(field.uiSchema.title) : field.name, value: field.name }));
}

const ProductListSchemaInitializer = () => {
  const t = useT();
  const { insert } = useSchemaInitializer();
  const options = useFieldOptions();
  return (
    <SchemaInitializerActionModal
      buttonText={t('Base property')}
      title={t('Preinstall field')}
      icon={<BoldOutlined />}
      isItem
      onSubmit={({ typeField, operationType, primaryProperty }) => {
        insert(getProductListSchema(typeField, operationType, primaryProperty));
      }}
      schema={{
        typeField: {
          type: 'string',
          title: t('Product category'),
          required: true,
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: options,
        },
        operationType: {
          type: 'string',
          title: t('Operation type'),
          required: true,
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: [
            { label: t('Add'), value: 'add' },
            { label: t('Update'), value: 'update' },
            { label: t('Look'), value: 'look' },
          ],
        },
        primaryProperty: {
          type: 'string',
          title: t('Primary property'),
          required: true,
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: options,
        },
      }}
    ></SchemaInitializerActionModal>
  );
};

export const productListInitializerItem: SchemaInitializerItemType = {
  name: FieldNameLowercase,
  Component: ProductListSchemaInitializer,
};
