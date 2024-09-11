import React from 'react';
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
import { getHjsCheckMaterialSchema } from '../schema';

export function useFieldOptions(): SelectProps['options'] {
  const collection = useCollection();

  const compile = useCompile();
  return collection
    .getFields()
    .map((field) => ({ label: field.uiSchema?.title ? compile(field.uiSchema.title) : field.name, value: field.name }));
}

const HjsCheckMaterialSchemaInitializer = () => {
  const t = useT();
  const { insert } = useSchemaInitializer();
  const options = useFieldOptions();
  return (
    <SchemaInitializerActionModal
      buttonText={t('Check material')}
      title={t('Select check material field')}
      icon={<SearchOutlined />}
      isItem
      onSubmit={({ material }) => {
        insert(getHjsCheckMaterialSchema(material));
      }}
      schema={{
        material: {
          type: 'string',
          title: t('Check material field'),
          required: true,
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: options,
        },
      }}
    ></SchemaInitializerActionModal>
  );
};

export const hjsCheckMaterialInitializerItem: SchemaInitializerItemType = {
  name: FieldNameLowercase,
  Component: HjsCheckMaterialSchemaInitializer,
};
