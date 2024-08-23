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
import { BotDetails } from './component';
import { FieldComponentName } from './constants';
import { botDetailsInitializerItem } from './initializer';
import { botDetailsSettings } from './settings';

export class PluginFieldComponentWithoutValueClient extends Plugin {
  async load() {
    this.app.addComponents({ [FieldComponentName]: BotDetails });

    // function Demo() {
    //   const schema = {
    //     type: 'void',
    //     name: 'root',
    //     properties: {
    //       test: {
    //         type: 'void',
    //         'x-component': 'FormV2',
    //         properties: {
    //           username: {
    //             type: 'string',
    //             'x-decorator': 'FormItem',
    //             'x-component': 'Input',
    //             title: 'Username',
    //             required: true,
    //           },
    //           orderDetails: {
    //             type: 'string',
    //             'x-decorator': 'FormItem',
    //             'x-component': BotDetails,
    //             title: '机器人',
    //             'x-component-props': {
    //               orderField: 'username',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   };

    //   return <SchemaComponent schema={schema} />;
    // }

    // this.app.router.add('admin.order-details-component', {
    //   path: '/admin/order-details-component',
    //   Component: Demo,
    // });

    this.app.schemaInitializerManager.addItem(
      'form:configureFields',
      botDetailsInitializerItem.name,
      botDetailsInitializerItem,
    );
    this.app.schemaSettingsManager.add(botDetailsSettings);
  }
}

export default PluginFieldComponentWithoutValueClient;
