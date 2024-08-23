/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useCallback } from 'react';
import _ from 'lodash';
import {
  SchemaInitializerActionModal,
  SchemaInitializerItemType,
  SelectProps,
  useCollection,
  useCompile,
  useSchemaInitializer,
  SchemaSettingsDefaultValue,
} from '@nocobase/client';
import { SearchOutlined } from '@ant-design/icons';
import { FieldNameLowercase } from '../constants';
import { useT } from '../locale';
import { getBotDetailsSchema } from '../schema';

export function useFieldOptions(): SelectProps['options'] {
  const collection = useCollection();

  const compile = useCompile();
  return collection
    .getFields()
    .map((field) => ({ label: field.uiSchema?.title ? compile(field.uiSchema.title) : field.name, value: field.name }));
}

const BotDetailsSchemaInitializer = () => {
  const t = useT();
  const { insert } = useSchemaInitializer();
  const options = useFieldOptions();

  const scope = [
    { label: 'v1', value: 'v1' },
    { label: 'nested', value: 'nested', children: [{ label: 'v2', value: 'v2' }] },
  ];

  return (
    <SchemaInitializerActionModal
      buttonText={t('Bot Details')}
      title={t('Select bind Field')}
      icon={<SearchOutlined />}
      isItem
      onSubmit={({ BotField }) => {
        insert(getBotDetailsSchema(BotField));
      }}
      schema={{
        BotField: {
          type: 'string',
          title: t('Bind field'),
          required: true,
          'x-component': 'Select',
          'x-component-props': {
            placeholder: t('Please select a field'),
          },
          'x-decorator': 'FormItem',
          enum: options,
        },
        // ApiKey: {
        //   type: 'string',
        //   title: 'API Key',
        //   required: true,
        //   'x-component': 'Variable.Input',
        //   'x-component-props': {
        //     scope,
        //   },
        //   'x-decorator': 'FormItem',
        // },
      }}
    ></SchemaInitializerActionModal>
  );
};

export const botDetailsInitializerItem: SchemaInitializerItemType = {
  name: FieldNameLowercase,
  Component: BotDetailsSchemaInitializer,
};
