/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import { FieldComponentName } from './constants';
import { InquiryRecordDetail } from './component';
import { inquiryRecordDetailsInitializerItem } from './initializer';
import { inquiryRecordDetailsSettings } from './settings';

export class PluginInquiryRecordDetailClient extends Plugin {
  async load() {
    this.app.addComponents({ [FieldComponentName]: InquiryRecordDetail });

    this.app.schemaInitializerManager.addItem(
      'details:configureFields',
      inquiryRecordDetailsInitializerItem.name,
      inquiryRecordDetailsInitializerItem,
    );

    this.app.schemaSettingsManager.add(inquiryRecordDetailsSettings);
  }
}

export default PluginInquiryRecordDetailClient;
