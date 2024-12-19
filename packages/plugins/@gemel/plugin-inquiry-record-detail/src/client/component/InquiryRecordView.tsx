/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC } from 'react';
import { Descriptions, Tag, Space, Avatar, Image } from 'antd';
import { useInquiryRecord } from '../context/InquiryRecordContext';
import { inquiryRecordMap } from '../utils';
import dayjs from 'dayjs';

const InquiryRecordView: FC = () => {
  const { inquiryRecordData } = useInquiryRecord();

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Descriptions
          bordered
          column={{ xxl: 4, xl: 4, lg: 4, md: 2, sm: 1, xs: 1 }}
          labelStyle={{ width: '128px', padding: '12px' }}
          size="middle"
        >
          <Descriptions.Item label="原始询料文案" span={24}>
            {inquiryRecordData?.origin_inquiry_text}
          </Descriptions.Item>

          <Descriptions.Item label="询料时间" span={1}>
            {inquiryRecordData?.createdAt && dayjs(inquiryRecordData.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>

          <Descriptions.Item label="询料状态" span={1}>
            <Tag color={inquiryRecordMap(inquiryRecordData?.inquiry_status)?.color}>
              {inquiryRecordMap(inquiryRecordData?.inquiry_status)?.label}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="IM客户(群)名称" span={1}>
            {inquiryRecordData?.imName}
          </Descriptions.Item>
          <Descriptions.Item label="IM平台" span={1}>
            {inquiryRecordData?.imPlatform ? <Tag color="volcano">{inquiryRecordData?.imPlatform}</Tag> : <></>}
          </Descriptions.Item>
          <Descriptions.Item label="群/好友标识" span={1}>
            {inquiryRecordData?.imIsGroup ? <Tag color="volcano">{inquiryRecordData?.imIsGroup}</Tag> : <></>}
          </Descriptions.Item>
          <Descriptions.Item label="机器人ID" span={1}>
            {inquiryRecordData?.imBotUserId}
          </Descriptions.Item>
          <Descriptions.Item label="IM客户ID" span={1}>
            {inquiryRecordData?.imUserId}
          </Descriptions.Item>
          <Descriptions.Item label="IM群ID" span={1}>
            {inquiryRecordData?.imGroupId}
          </Descriptions.Item>
          <Descriptions.Item label="IM客户(群)头像" span={1}>
            {inquiryRecordData?.imAvatarUrl ? (
              <Image
                src={inquiryRecordData.imAvatarUrl}
                width={32}
                style={{ borderRadius: '50%' }}
                preview={{
                  src: inquiryRecordData.imAvatarUrl,
                }}
              />
            ) : (
              <Avatar size={32}></Avatar>
            )}
          </Descriptions.Item>

          <Descriptions.Item label="IM客户(群)备注" span={1}>
            {inquiryRecordData?.imRemark}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </>
  );
};

export default InquiryRecordView;
