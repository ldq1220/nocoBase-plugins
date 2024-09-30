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

export const changeOperationType = createSelectSchemaSettingsItem({
  name: 'ChangeSearchScope',
  title: '绑定操作类型',
  options: [
    { label: '添加', value: 'add' },
    { label: '编辑', value: 'update' },
    { label: '查看', value: 'look' },
  ],
  schemaKey: `x-component-props.operationType`,
});
