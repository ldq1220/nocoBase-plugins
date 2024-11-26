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
import { ProfileOutlined } from '@ant-design/icons';

import { FieldNameLowercase } from '../constants';
import { useT } from '../locale';
import { getCompanyDetailsSchema } from '../schema';

export function useFieldOptions(): SelectProps['options'] {
  const collection = useCollection();
  const compile = useCompile();
  return collection
    .getFields()
    .map((field) => ({ label: field.uiSchema?.title ? compile(field.uiSchema.title) : field.name, value: field.name }));
}

const CompanyDetailsSchemaInitializer = () => {
  const t = useT();
  const { insert } = useSchemaInitializer();
  const options = useFieldOptions();
  return (
    <SchemaInitializerActionModal
      buttonText={'公司信息自动获取'}
      title={'公司信息自动获取'}
      icon={<ProfileOutlined />}
      isItem
      onSubmit={({ ApiKey }) => {
        insert(getCompanyDetailsSchema(ApiKey));
      }}
      schema={{
        // CompanyField: {
        //   type: 'string',
        //   title: t('Bind field'),
        //   required: true,
        //   'x-component': 'Select',
        //   'x-decorator': 'FormItem',
        //   'x-component-props': {
        //     placeholder: t('Please select a field'),
        //   },
        //   enum: options,
        // },
        ApiKey: {
          type: 'string',
          title: 'Api Key',
          required: true,
          'x-component': 'Variable.Input',
          'x-component-props': {
            useTypedConstant: true,
          },
          'x-decorator': 'FormItem',
        },
      }}
    ></SchemaInitializerActionModal>
  );
};

export const CompanyDetailsInitializerItem: SchemaInitializerItemType = {
  name: FieldNameLowercase,
  Component: CompanyDetailsSchemaInitializer,
};
