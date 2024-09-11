import { ISchema } from '@nocobase/client';
import { FieldComponentName } from '../constants';
import { hsjCheckMaterialSettings } from '../settings';

export const getHjsCheckMaterialSchema = (material: string): ISchema => ({
  type: 'void',
  'x-decorator': 'FormItem',
  'x-toolbar': 'FormItemSchemaToolbar',
  'x-component': FieldComponentName,
  'x-component-props': {
    material: material,
  },
  'x-settings': hsjCheckMaterialSettings.name,
});
