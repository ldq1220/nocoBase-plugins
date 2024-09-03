/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createModalSettingsItem } from '@nocobase/client';
import { tStr } from '../../locale';
import React, { useMemo } from 'react';
import _ from 'lodash';
import {
  SelectProps,
  useCollection,
  useCompile,
  useCollection_deprecated,
  useCollectionManager_deprecated,
  useRecord,
  useVariableOptions,
  useFormBlockContext,
  isVariable,
} from '@nocobase/client';
import { useFieldSchema } from '@formily/react';

export function useFieldOptions(): SelectProps['options'] {
  const collection = useCollection();

  const compile = useCompile();
  return collection
    .getFields()
    .map((field) => ({ label: field.uiSchema?.title ? compile(field.uiSchema.title) : field.name, value: field.name }));
}

export const ApikeySchema = (defaultValues) => {
  const { getField } = useCollection_deprecated();
  const { getCollectionJoinField, getCollectionFields, getAllCollectionsInheritChain } =
    useCollectionManager_deprecated();
  const currentSchema = useFieldSchema();
  const fieldSchema = currentSchema;
  const collectionField = useMemo(
    () => getField(fieldSchema['name']) || getCollectionJoinField(fieldSchema['x-collection-field']),
    [fieldSchema, getCollectionJoinField, getField],
  );
  const { form } = useFormBlockContext();
  const record = useRecord();
  const variableOptions = useVariableOptions({
    collectionField,
    form,
    record,
    targetFieldSchema: fieldSchema,
    noDisabled: true,
  });

  const isApiKeyVariable = isVariable(defaultValues?.ApiKey);

  const schema = {
    ApiKeyInfo: {
      type: 'void',
      'x-component': 'div',
      'x-component-props': {},
      properties: {
        path: {
          type: 'string',
          'x-component': 'h4',
          'x-content': (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span>当前Api Key：</span>
                <span style={{ color: '#e18a3b' }}>{defaultValues?.ApiKey}</span>
              </div>
              <div>
                <span>类型：</span>
                <span style={{ color: '#e18a3b' }}>({isVariable(defaultValues?.ApiKey) ? '变量' : '常量'})</span>
              </div>
            </div>
          ),
        },
        ...(isApiKeyVariable && {
          value: {
            type: 'string',
            title: '变量值',
            default: defaultValues?.ApiKey,
            'x-component': 'Input',
            'x-decorator': 'FormItem',
            'x-component-props': {
              scope: variableOptions,
              disabled: true,
            },
          },
        }),
      },
    },
    ApiKey: {
      type: 'string',
      title: '新Api Key',
      required: true,
      'x-component': 'Variable.Input',
      'x-component-props': {
        scope: variableOptions,
        useTypedConstant: true,
      },
      'x-decorator': 'FormItem',
    },
    NewApikeyTooltip: {
      type: 'void',
      'x-component': 'div',
      'x-component-props': { style: { color: '#FF4D4F' } },
      properties: {
        tooltip: {
          type: 'string',
          'x-component': 'h4',
          'x-content': `新Api Key设置成功后，不会触发组件刷新，请手动刷新页面！`,
        },
      },
    },
  };
  return schema;
};

export const changeApiKey = createModalSettingsItem({
  name: 'changeApiKey',
  title: tStr('Change api key'),
  parentSchemaKey: `x-component-props`,
  schema: (defaultValues) => {
    return {
      type: 'object',
      title: tStr('Change api key'),
      properties: ApikeySchema(defaultValues),
    };
  },
});
