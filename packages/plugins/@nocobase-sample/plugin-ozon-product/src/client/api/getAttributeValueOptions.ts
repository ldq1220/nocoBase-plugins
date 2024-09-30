/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { reqAttributeValueList } from './index';

// 获取特征值指南
export const getAttributeValueOptions = async (data: any, parentId: number, typeId: number) => {
  // 延迟
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const attributeList: any = await Promise.all(
    data.map(async (item: any, index: number) => {
      const { dictionary_id } = item;
      const property_value = item.property_value ? item.property_value : '';
      if (dictionary_id) {
        // 添加 100ms 延迟，避免频繁调用接口
        await sleep(50 * index); // 每个请求的延迟是上一个请求的 50ms 之后
        const options = await reqAttributeValueList(item.id, parentId, typeId); // 获取特征值指南
        return { ...item, property_value, options };
      }

      return { ...item, property_value };
    }),
  );

  // 将 is_required 为 true 的项排在前面
  const sortedAttributeList: any = attributeList.sort((a: any, b: any) => {
    if (a.is_required && !b.is_required) return -1;
    if (!a.is_required && b.is_required) return 1;
    return 0;
  });

  return sortedAttributeList;
};
