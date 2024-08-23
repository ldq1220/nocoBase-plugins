/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin, SchemaComponent } from '@nocobase/client';
import { OrderDetails } from './component';
import { FieldComponentName } from './constants';
import { orderDetailsInitializerItem } from './initializer';
import { orderDetailsSettings } from './settings';

export class PluginFieldOrderDetailsClient extends Plugin {
  async load() {
    this.app.addComponents({ [FieldComponentName]: OrderDetails });

    this.app.schemaInitializerManager.addItem(
      'form:configureFields',
      orderDetailsInitializerItem.name,
      orderDetailsInitializerItem,
    );

    this.app.schemaSettingsManager.add(orderDetailsSettings);
  }
}

export default PluginFieldOrderDetailsClient;
