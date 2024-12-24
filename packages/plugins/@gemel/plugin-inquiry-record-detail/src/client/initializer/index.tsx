/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useMemo } from 'react';
import {
  SchemaInitializerActionModal,
  SchemaInitializerItemType,
  SelectProps,
  useCollection,
  useCompile,
  useSchemaInitializer,
  useCollection_deprecated,
  useCollectionManager_deprecated,
  useRecord,
  useVariableOptions,
  useFormBlockContext,
} from '@nocobase/client';
import { FileTextOutlined } from '@ant-design/icons';
import { useFieldSchema } from '@formily/react';
import { FieldNameLowercase } from '../constants';
import { useT } from '../locale';
import { getInquiryRecordDetailsSchema } from '../schema';

export function useFieldOptions(): SelectProps['options'] {
  const collection = useCollection();

  const compile = useCompile();
  return collection
    .getFields()
    .map((field) => ({ label: field.uiSchema?.title ? compile(field.uiSchema.title) : field.name, value: field.name }));
}

const InquiryRecordDetailsSchemaInitializer = () => {
  const t = useT();
  const { insert } = useSchemaInitializer();
  const options = useFieldOptions();

  const { getField } = useCollection_deprecated();
  const { getCollectionJoinField } = useCollectionManager_deprecated();
  const currentSchema = useFieldSchema();
  const fieldSchema = currentSchema;
  const collectionField = useMemo(
    () => getField(fieldSchema['name']) || getCollectionJoinField(fieldSchema['x-collection-field']),
    [fieldSchema, getInquiryRecordDetailsSchema, getField],
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

  return (
    <SchemaInitializerActionModal
      buttonText={t('Inquiry Record Details')}
      title={t('Configure basic parameters')}
      icon={<FileTextOutlined />}
      isItem
      onSubmit={({ InquiryRecordId }) => {
        insert(getInquiryRecordDetailsSchema(InquiryRecordId));
      }}
      schema={{
        InquiryRecordId: {
          type: 'string',
          title: t('Inquiry record id'),
          required: true,
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: options,
        },
      }}
    ></SchemaInitializerActionModal>
  );
};

export const inquiryRecordDetailsInitializerItem: SchemaInitializerItemType = {
  name: FieldNameLowercase,
  Component: InquiryRecordDetailsSchemaInitializer,
};
