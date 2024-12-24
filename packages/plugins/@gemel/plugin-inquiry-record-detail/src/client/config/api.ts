/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import axios from 'axios';
import config from '../config';
import { APIClient } from '@nocobase/client';

// 更新询料记录的函数
export const updateInquiryRecord = async (
  api: APIClient,
  data: { id: number; inquiry_status: string; reply_text: string },
  params: { filterByTk: number },
) => {
  return api.request({
    url: '/inquiry_records:update',
    method: 'POST',
    data,
    params,
  });
};

// 更新询料物料状态
export const updateInquiryMaterial = async (
  api: APIClient,
  data: { id: number; inquiry_material_status: string },
  params: { filterByTk: number },
) => {
  return api.request({
    url: '/inquiry_materials:update',
    method: 'POST',
    data,
    params,
  });
};

// 更新供应商询料记录的函数
export const updateSupplierInquiryRecord = async (
  api: APIClient,
  data: { id: number; has_adopt: string },
  params: { filterByTk: number },
) => {
  return api.request({
    url: '/supplier_inquiry_records:update',
    method: 'POST',
    data,
    params,
  });
};

// 发送回复的函数
export const sendReply = async (
  replyContent: string,
  inquiryRecordData: {
    imGroupId: any;
    imPlatform: string;
    imBotUserId: string;
    imIsGroup: string;
    imUserId: string;
  },
) => {
  return axios.post(
    `${config.brainBaseUrl}/open/chat/send`,
    {
      batchId: 'replay_customer',
      platform: inquiryRecordData.imPlatform,
      fromUserId: inquiryRecordData.imBotUserId,
      type: inquiryRecordData.imIsGroup === '好友' ? 'private_message' : 'group_message',
      groupId: inquiryRecordData.imGroupId ? inquiryRecordData.imGroupId : undefined,
      toUserIds: [inquiryRecordData.imUserId],
      messages: [
        {
          contentType: 'text',
          content: replyContent,
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-app-api-key': config.gemelAiApiKey,
      },
    },
  );
};
