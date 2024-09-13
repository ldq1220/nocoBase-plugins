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
import { FieldNameLowercase } from '../constants';
import { useT } from '../locale';
import { getHjsCountTotalSchema } from '../schema';

export function useFieldOptions(): SelectProps['options'] {
  const collection = useCollection();
  const compile = useCompile();

  return collection
    .getFields()
    .map((field) => ({ label: field.uiSchema?.title ? compile(field.uiSchema.title) : field.name, value: field.name }));
}

const HjsCountTotalSchemaInitializer = () => {
  const t = useT();
  const { insert } = useSchemaInitializer();
  const options = useFieldOptions();
  return (
    <SchemaInitializerActionModal
      buttonText={t('One-click search')}
      title={t('Select field')}
      isItem
      onSubmit={({ totalField, materialField, customerField }) => {
        insert(getHjsCountTotalSchema(totalField, materialField, customerField));
      }}
      schema={{
        totalField: {
          type: 'string',
          title: t('Order total field'),
          required: true,
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: options,
        },
        materialField: {
          type: 'string',
          title: t('Material detail field'),
          required: true,
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: options,
        },
        customerField: {
          type: 'string',
          title: t('Customer field'),
          required: true,
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: options,
        },
      }}
    ></SchemaInitializerActionModal>
  );
};

export const hjsCountTotalInitializerItem: SchemaInitializerItemType = {
  name: FieldNameLowercase,
  Component: HjsCountTotalSchemaInitializer,
};
