/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer, useForm } from '@formily/react';
import React, { FC, useState } from 'react';
import { FieldComponentName } from '../constants';
import { useRequest } from '@nocobase/client';

export interface InquiryRecordDetailProps {
  InquiryRecordId?: number | string;
}

export const InquiryRecordDetail: FC<InquiryRecordDetailProps> = observer(
  ({ InquiryRecordId }) => {
    const form = useForm();
    const inquiryRecordId = form.values[InquiryRecordId];
    const [pageSize, setPageSize] = useState(1);

    console.log('InquiryRecordDetail', InquiryRecordId);
    console.log('useForm', useForm(), form.values, InquiryRecordId, inquiryRecordId);

    const { data: inquiryRecordData } = useRequest<{
      data: any;
    }>(
      {
        url: `inquiry_records:get?filter[id]=${inquiryRecordId}&appends=inquiry_materials`,
        method: 'get',
      },
      {
        ready: !!inquiryRecordId,
        debounceWait: 300,
      },
    );

    const { data: inquiryMaterialsData } = useRequest<{
      data: any;
    }>(
      {
        url: `inquiry_records/${inquiryRecordId}/inquiry_materials:list?pageSize=${pageSize}&appends[]=suppliers&appends[]=supplier_inquiry_records&appends[]=supplier_inquiry_records.inquiry_material&appends[]=supplier_inquiry_records.supplier`,
        method: 'get',
      },
      {
        ready: !!inquiryRecordId,
        debounceWait: 300,
      },
    );

    console.log('inquiryRecordData', inquiryRecordData);
    console.log('inquiryMaterialsData', inquiryMaterialsData);

    return <div>InquiryRecordDetail {InquiryRecordId} </div>;
  },
  { displayName: FieldComponentName },
);
