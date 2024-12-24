/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { createModalSettingsItem } from '@nocobase/client';
import { tStr } from '../../locale';

export const changeUnBindWorkFlowsKey = createModalSettingsItem({
  name: 'ChangeUnBindWorkFlowsKey',
  title: tStr('Change unbind work flows key'),
  parentSchemaKey: `x-component-props`,
  schema: (defaultValues) => {
    return {
      type: 'object',
      title: tStr('Change unbind work flows key'),
      properties: {
        UnBindWorkFlowsKey: {
          title: tStr('Unbind work flows key'),
          type: 'string',
          default: defaultValues.UnBindWorkFlowsKey,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {},
        },
      },
    };
  },
});
