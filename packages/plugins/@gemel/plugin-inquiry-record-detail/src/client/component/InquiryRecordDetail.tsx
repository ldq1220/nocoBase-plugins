/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer, useForm } from '@formily/react';
import React, { FC } from 'react';
import { FieldComponentName } from '../constants';
import { InquiryRecordProvider, useInquiryRecord } from '../context/InquiryRecordContext';
import { Spin, Divider } from 'antd';
import InquiryRecordView from './InquiryRecordView';
import MaterialInquiryView from './MaterialInquiryView';

export interface InquiryRecordDetailProps {
  InquiryRecordId?: number | string;
}

export const InquiryRecordDetail: FC<InquiryRecordDetailProps> = observer(
  ({ InquiryRecordId }) => {
    const form = useForm();
    const inquiryRecordId = form.values[InquiryRecordId];

    return (
      <InquiryRecordProvider inquiryRecordId={inquiryRecordId}>
        <InquiryRecordContent />
      </InquiryRecordProvider>
    );
  },
  { displayName: FieldComponentName },
);

// 创建一个子组件来使用共享的数据
const InquiryRecordContent: FC = () => {
  const { loading } = useInquiryRecord();

  if (loading) {
    return <Spin spinning={loading} />;
  }

  return (
    <div>
      <InquiryRecordView />
      <Divider>物料询价记录</Divider>
      <MaterialInquiryView />
    </div>
  );
};
