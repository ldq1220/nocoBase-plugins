/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import { HjsCountTotal } from './component';
import { FieldComponentName } from './constants';
import { hjsCountTotalInitializerItem } from './initializer';
import { hsjCountTotalSettings } from './settings';

export class PluginHjsCountTotalClient extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    this.app.addComponents({ [FieldComponentName]: HjsCountTotal });

    this.app.schemaInitializerManager.addItem(
      'createForm:configureActions',
      hjsCountTotalInitializerItem.name,
      hjsCountTotalInitializerItem,
    );
    this.app.schemaInitializerManager.addItem(
      'editForm:configureActions',
      hjsCountTotalInitializerItem.name,
      hjsCountTotalInitializerItem,
    );

    this.app.schemaSettingsManager.add(hsjCountTotalSettings);
  }
}

export default PluginHjsCountTotalClient;
