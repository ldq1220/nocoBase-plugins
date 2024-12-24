/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { SchemaSettings } from '@nocobase/client';
import { FieldNameLowercase } from '../constants';
import { changeTotalField, changeMaterialField } from './items';

export const hsjCountTotalSettings = new SchemaSettings({
  name: `blockSettings:${FieldNameLowercase}`,
  items: [
    changeTotalField,
    changeMaterialField,
    changeTotalField,
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
