/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC } from 'react';
import { Descriptions, Tag } from 'antd';
import { useInquiryRecord } from '../context/InquiryRecordContext';
import { inquiryRecordMap } from '../utils';
import dayjs from 'dayjs';

const InquiryRecordView: FC = () => {
  const { inquiryRecordData } = useInquiryRecord();

  return (
    <>
      <Descriptions
        bordered
        column={{ xxl: 4, xl: 4, lg: 4, md: 2, sm: 1, xs: 1 }}
        labelStyle={{ width: '140px' }}
        size="middle"
      >
        <Descriptions.Item label="原始询料文案" span={24}>
          {inquiryRecordData?.origin_inquiry_text}
        </Descriptions.Item>

        <Descriptions.Item label="询料时间">
          {inquiryRecordData?.createdAt && dayjs(inquiryRecordData.createdAt).format('YYYY-MM-DD HH:mm:ss')}
        </Descriptions.Item>

        <Descriptions.Item label="询料状态">
          <Tag color={inquiryRecordMap(inquiryRecordData?.inquiry_status).color}>
            {inquiryRecordMap(inquiryRecordData?.inquiry_status).label}
          </Tag>
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default InquiryRecordView;
