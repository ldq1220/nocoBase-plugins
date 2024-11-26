/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Plugin, SchemaComponent } from '@nocobase/client';

import { CompanyDetails } from './component';
import { FiledComponentName } from './constants';
import { CompanyDetailsInitializerItem } from './initializer';
import { CompanyDetailsSettings } from './settings';

export class PluginFieldOrderDetailsClient extends Plugin {
  async load() {
    this.app.addComponents({ [FiledComponentName]: CompanyDetails });

    this.app.schemaInitializerManager.addItem(
      'form:configureFields',
      CompanyDetailsInitializerItem.name,
      CompanyDetailsInitializerItem,
    );
    this.app.schemaSettingsManager.add(CompanyDetailsSettings);
  }
}

export default PluginFieldOrderDetailsClient;
