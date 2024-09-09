/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

// 过滤 客户来源
export const filterCustomerSource = (value: string) => {
  const sceneChannelsList = [
    { name: '阿里TM', value: 'alibaba-tm' },
    { name: '微信', value: 'wechat' },
    { name: '企业微信', value: 'wecom' },
    { name: '企点QQ', value: 'qq' },
    { name: 'WhatsApp', value: 'whatsapp-bot' },
    { name: 'TikTok', value: 'tiktok' },
    { name: '小红书', value: 'xhs' },
    { name: '智能客服', value: 'live-customer' },
    { name: '智能独立站', value: 'ai-website' },
  ];

  const sourceName = sceneChannelsList.find((item: { value: string }) => item.value === value)?.name;
  return sourceName;
};

// 隐藏apikey
export const handleMaskKey = (s: string) => {
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
