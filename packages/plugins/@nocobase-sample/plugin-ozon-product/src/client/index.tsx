/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import { BasePropertyMain } from './component/BasePropertyMain';
import { FieldComponentName } from './constants';
import { productListInitializerItem } from './initializer';
import { productListSettings } from './settings';

export class PluginOzonProductClient extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    this.app.addComponents({
      [FieldComponentName]: BasePropertyMain,
    });

    this.app.schemaInitializerManager.addItem(
      'form:configureFields',
      productListInitializerItem.name,
      productListInitializerItem,
    );

    this.app.schemaInitializerManager.addItem(
      'details:configureFields',
      productListInitializerItem.name,
      productListInitializerItem,
    );

    this.app.schemaSettingsManager.add(productListSettings);
  }
}

export default PluginOzonProductClient;
