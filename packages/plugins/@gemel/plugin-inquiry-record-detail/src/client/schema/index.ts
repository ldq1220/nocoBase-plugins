/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema } from '@nocobase/client';
import { FieldComponentName } from '../constants';
import { inquiryRecordDetailsSettings } from '../settings';

export const getInquiryRecordDetailsSchema = (InquiryRecordId: string): ISchema => ({
  type: 'void',
  'x-decorator': 'FormItem',
  'x-toolbar': 'FormItemSchemaToolbar',
  'x-component': FieldComponentName,
  'x-settings': inquiryRecordDetailsSettings.name,
  'x-component-props': {
    InquiryRecordId,
  },
});
