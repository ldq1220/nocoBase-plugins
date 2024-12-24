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
import { changeSearchtField, changeSearchScope, changeUnBindWorkFlowsKey, changeApiKey } from './items/index';

export const botDetailsSettings = new SchemaSettings({
  name: `blockSettings:${FieldNameLowercase}`,
  items: [
    changeSearchtField,
    changeSearchScope,
    changeApiKey,
    changeUnBindWorkFlowsKey,
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
