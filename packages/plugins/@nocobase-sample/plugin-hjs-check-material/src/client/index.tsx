/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import { HjsCheckMaterials } from './component';
import { FieldComponentName } from './constants';
import { hjsCheckMaterialInitializerItem } from './initializer';
import { hsjCheckMaterialSettings } from './settings';

export class PluginHjsCheckMaterialClient extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    this.app.addComponents({ [FieldComponentName]: HjsCheckMaterials });
    this.app.schemaInitializerManager.addItem(
      'table:configureColumns',
      hjsCheckMaterialInitializerItem.name,
      hjsCheckMaterialInitializerItem,
    );
    this.app.schemaSettingsManager.add(hsjCheckMaterialSettings);
  }
}

export default PluginHjsCheckMaterialClient;
