/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema } from '@nocobase/client';
import { FiledComponentName } from '../constants';
import { CompanyDetailsSettings } from '../settings';

export const getCompanyDetailsSchema = (ApiKey: string): ISchema => ({
  type: 'void',
  'x-decorator': 'FormItem',
  'x-toolbar': 'FormItemSchemaToolbar',
  'x-component': FiledComponentName,
  'x-component-props': {
    ApiKey,
  },
  'x-settings': CompanyDetailsSettings.name,
});
