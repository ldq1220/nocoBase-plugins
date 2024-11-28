/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { createContext, useContext, FC, ReactNode } from 'react';
import { useRequest } from '@nocobase/client';

interface InquiryRecordContextType {
  inquiryRecordData: any;
  inquiryMaterialsData: any;
  loading: boolean;
}

const InquiryRecordContext = createContext<InquiryRecordContextType | undefined>(undefined);

export const InquiryRecordProvider: FC<{
  children: ReactNode;
  inquiryRecordId: string | number;
  pageSize?: number;
}> = ({ children, inquiryRecordId, pageSize = 1 }) => {
  const { data: inquiryRecordData, loading: recordLoading } = useRequest<{
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

  const { data: inquiryMaterialsData, loading: materialsLoading } = useRequest<{
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

  return (
    <InquiryRecordContext.Provider
      value={{
        inquiryRecordData,
        inquiryMaterialsData,
        loading: recordLoading || materialsLoading,
      }}
    >
      {children}
    </InquiryRecordContext.Provider>
  );
};

// 创建一个自定义 Hook 来使用这个 Context
export const useInquiryRecord = () => {
  const context = useContext(InquiryRecordContext);
  if (context === undefined) {
    throw new Error('useInquiryRecord must be used within a InquiryRecordProvider');
  }
  return context;
};
