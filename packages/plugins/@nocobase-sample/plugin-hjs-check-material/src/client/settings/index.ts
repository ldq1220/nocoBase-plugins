import { SchemaSettings } from '@nocobase/client';
import { FieldNameLowercase } from '../constants';

export const hsjCheckMaterialSettings = new SchemaSettings({
  name: `blockSettings:${FieldNameLowercase}`,
  items: [
    {
      type: 'remove',
      name: 'remove',
      componentProps: {
        removeParentsIfNoChildren: true,
        breakRemoveOn: {
          'x-component': 'Grid',
        },
      },
    },
  ],
});
