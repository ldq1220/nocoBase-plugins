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
import { changeProductType, changeOperationType, changePrimaryProperty } from './items';

export const productListSettings = new SchemaSettings({
  name: `blockSettings:${FieldNameLowercase}`,
  items: [
    changeProductType,
    changeOperationType,
    changePrimaryProperty,
    {
      name: 'remove',
      type: 'remove',
      componentProps: {
        removeParentsIfNoChildren: true,
        breakRemoveOn: {
          'x-component': 'Grid',
        },
      },
    },
  ],
});
