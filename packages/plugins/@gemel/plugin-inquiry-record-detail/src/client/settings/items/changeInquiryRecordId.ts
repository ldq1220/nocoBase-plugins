/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createSelectSchemaSettingsItem } from '@nocobase/client';
import { tStr } from '../../locale';
import { useFieldOptions } from '../../initializer';

export const changeInquiryRecordId = createSelectSchemaSettingsItem({
  name: 'ChangeInquiryRecordId',
  title: tStr('Inquiry record id'),
  useOptions: useFieldOptions,
  schemaKey: `x-component-props.InquiryRecordId`,
});
