/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const FieldComponentName = 'OzonProduct';
export const FieldTitle = 'Ozon Product';
export const FieldNameLowercase = 'ozonProduct';

const baseUrl = 'https://api-seller.ozon.ru/v1/';

export const Config = {
  api: {
    category: `${baseUrl}description-category/tree`,
    attribute: `${baseUrl}description-category/attribute`,
    values: `${baseUrl}description-category/attribute/values`,
  },
  language: {
    EN: 'EN',
    ZH: 'ZH_HANS',
  },
  clientId: 2232122,
  apiKey: 'a6756ab9-47d2-40c8-8157-3d10fe5267ad',
  headers: {
    'client-id': 2232122,
    'api-Key': 'a6756ab9-47d2-40c8-8157-3d10fe5267ad',
  },
};
