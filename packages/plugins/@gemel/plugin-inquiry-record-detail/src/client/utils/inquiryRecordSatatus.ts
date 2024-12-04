/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const inquiryRecordMap = (status: string) => {
  const map = {
    '0': { label: '待采集', color: 'lime' },
    '1': { label: '待询价', color: 'magenta' },
    '2': { label: '询价中', color: 'blue' },
    '3': { label: '待回复', color: 'gold' },
    '4': { label: '已回复', color: 'purple' },
  };
  return map[status];
};

export const inquiryRecordMaterialMap = (status: string) => {
  const map = {
    '0': { label: '待采集', color: 'lime' },
    '1': { label: '采集失败', color: 'red' },
    '2': { label: '待询价', color: 'magenta' },
    '3': { label: '询价中', color: 'blue' },
    '4': { label: '已回复', color: 'purple' },
  };
  return map[status];
};

export const supplierInquiryRecordStatusMap = (status: string) => {
  const map = {
    '0': { label: '待询问', color: 'default' },
    '1': { label: '询问中', color: 'processing' },
    '2': { label: '已回复', color: 'success' },
  };
  return map[status];
};
