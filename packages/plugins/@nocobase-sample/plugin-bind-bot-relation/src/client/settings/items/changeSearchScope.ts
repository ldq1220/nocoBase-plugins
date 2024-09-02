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
import { useSearchScopeOptions } from '../../initializer';

export const changeSearchScope = createSelectSchemaSettingsItem({
  name: 'ChangeSearchScope',
  title: tStr('Search scope'),
  useOptions: useSearchScopeOptions,
  schemaKey: `x-component-props.SearchScope`,
});
