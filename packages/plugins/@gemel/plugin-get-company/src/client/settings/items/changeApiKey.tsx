/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createModalSettingsItem } from '@nocobase/client';
import React, { useMemo } from 'react';
import { handleMaskKey } from '../../utils/index';
import _ from 'lodash';
import {
  useCollection_deprecated,
  useCollectionManager_deprecated,
  useRecord,
  useVariableOptions,
  useFormBlockContext,
  isVariable,
} from '@nocobase/client';
import { useFieldSchema } from '@formily/react';

export const ApiKeySchema = (defaultValues) => {
  console.log('🚀 ~ ApiKeySchema ~ defaultValues:', defaultValues);
  const { getField } = useCollection_deprecated();
  const { getCollectionJoinField } = useCollectionManager_deprecated();
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
              <div>
                <span>当前Api Key：</span>
                <span style={{ color: '#e18a3b' }}>
                  {isApiKeyVariable ? defaultValues?.ApiKey : handleMaskKey(defaultValues?.ApiKey)}
                </span>
              </div>
              <div>
                <span>类型：</span>
                <span style={{ color: '#e18a3b' }}>({isApiKeyVariable ? '变量' : '常量'})</span>
              </div>
            </div>
          ),
        },
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
  title: '更改ApiKey',
  parentSchemaKey: `x-component-props`,
  schema: (defaultValues) => {
    return {
      type: 'object',
      title: '更改ApiKey',
      properties: ApiKeySchema(defaultValues),
    };
  },
});
