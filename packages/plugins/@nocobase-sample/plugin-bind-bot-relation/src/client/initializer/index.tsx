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

export function useSearchScopeOptions(): SelectProps['options'] {
  const searchScopeOptions: any = [
    { label: '群', value: 1 },
    { label: '好友', value: 2 },
    { label: '群 + 好友', value: 3 },
  ];
  return searchScopeOptions.map((field: any) => ({ label: field.label, value: field.value }));
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
      onSubmit={({ BotField, SearchScope, UnBindWorkFlowsKey }) => {
        insert(getBotDetailsSchema(BotField, SearchScope, UnBindWorkFlowsKey));
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
        SearchScope: {
          type: 'number',
          title: t('Search scope'),
          required: true,
          'x-component': 'Select',
          'x-component-props': {
            placeholder: t('Please select search scope'),
          },
          'x-decorator': 'FormItem',
          enum: useSearchScopeOptions(),
        },
        UnBindWorkFlowsKey: {
          type: 'string',
          title: t('Unbind work flows key'),
          required: true,
          'x-component': 'Input',
          'x-component-props': {
            placeholder: t('Please input unbind work flows key'),
          },
          'x-decorator': 'FormItem',
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
