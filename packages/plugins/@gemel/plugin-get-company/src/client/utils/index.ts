/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

// 隐藏apikey
export const handleMaskKey = (s: string) => {
  if (s.length <= 11) return s;
  // 获取前五位和后五位
  const prefix = s.slice(0, 5);
  const suffix = s.slice(-5);

  // 计算中间需要替换的星号数量
  const middleLength = s.length - prefix.length - suffix.length;
  // 创建星号数组并将其转换为字符串
  const maskedMiddle = '*'.repeat(middleLength);
  // 合并结果
  const result = prefix + maskedMiddle + suffix;

  return result;
};
