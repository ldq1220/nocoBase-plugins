/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useState, createContext, useContext, FC, ReactNode } from 'react';
import { useRequest } from '@nocobase/client';
interface InquiryRecordContextType {
  inquiryRecordData: any;
  inquiryMaterialsData: any;
  loading: boolean;
  selectedRecords: Record<string, any>;
  setSelectedRecord: (tabKey: string, record: any) => void;
}

const InquiryRecordContext = createContext<InquiryRecordContextType | undefined>(undefined);

export const InquiryRecordProvider: FC<{
  children: ReactNode;
  inquiryRecordId: string | number;
}> = ({ children, inquiryRecordId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecords, setSelectedRecords] = useState<Record<string, any>>({});

  // 设置选中的记录
  const setSelectedRecord = (tabKey: string, record: any) => {
    setSelectedRecords((prev) => {
      if (record === null) {
        const { [tabKey]: _, ...rest } = prev;
        return rest;
      }

      const newRecords = {
        ...prev,
        [tabKey]: record,
      };

      // 按照记录的id进行排序
      const sortedEntries = Object.entries(newRecords).sort((a, b) => {
        const idA = a[1]?.quiry_material_id ?? 0;
        const idB = b[1]?.quiry_material_id ?? 0;
        return idA - idB;
      });

      return Object.fromEntries(sortedEntries);
    });
  };

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
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  );

  const { data: inquiryMaterialsData } = useRequest<{
    data: any;
  }>(
    {
      url: `inquiry_records/${inquiryRecordId}/inquiry_materials:list?&appends[]=suppliers&appends[]=supplier_inquiry_records&appends[]=supplier_inquiry_records.inquiry_material&appends[]=supplier_inquiry_records.supplier`,
      method: 'get',
    },
    {
      ready: !!inquiryRecordId,
      debounceWait: 300,
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  );

  const data1 = {
    createdAt: '2024-12-12T02:45:24.338Z',
    updatedAt: '2024-12-13T10:29:54.846Z',
    inquiry_date: '2024-12-12 10:45:23',
    origin_inquiry_text: '0402-1K62-1%-1/16W 10000  多少钱？',
    id: 63,
    inquiry_status: '2',
    company_id: 4,
    gather_error: null,
    reply_text: null,
    imName: '记梦',
    imPlatform: 'qq',
    imBotUserId: '2850870416',
    imIsGroup: '好友',
    imUserId: '1582649509',
    imRemark: '',
    createdById: 1,
    updatedById: 1,
    imAvatarUrl: 'https://gemelai.oss-cn-shenzhen.aliyuncs.com/user/4/avatar/39e2ac93-82f1-432c-9c56-7c7dd18b497f.jpg',
    inquiry_materials: [
      {
        createdAt: '2024-12-12T07:02:49.185Z',
        updatedAt: '2024-12-13T10:29:54.780Z',
        inquiry_record_id: 63,
        unit: null,
        manufacturer: '厚声',
        id: 78,
        material_code: '0402WGF1621TCE',
        quantity: 300,
        gather_error: null,
        createdById: 1,
        updatedById: 1,
        inquiry_material_status: '3',
      },
    ],
  };

  const data2 = [
    {
      createdAt: '2024-12-12T07:02:49.185Z',
      updatedAt: '2024-12-13T10:29:54.780Z',
      inquiry_record_id: 63,
      unit: null,
      manufacturer: '厚声',
      id: 78,
      material_code: '0402WGF1621TCE',
      quantity: 300,
      gather_error: null,
      createdById: 1,
      updatedById: 1,
      inquiry_material_status: '3',
      suppliers: [
        {
          createdAt: '2024-11-18T08:21:25.797Z',
          updatedAt: '2024-12-12T06:34:27.416Z',
          id: 24,
          qq_account: ['2927104451'],
          member_years: '6',
          phones: [],
          mobiles: null,
          faxes: null,
          location: null,
          addresses: null,
          company_tag: ['icon_hckc', 'sscp'],
          company_name: '政元供应商-生发分部',
          company_ids: ['4'],
          createdById: 1,
          updatedById: 1,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-12T07:02:49.203Z',
            updatedAt: '2024-12-12T07:02:49.203Z',
            supplier_name: '政元供应商-生发分部',
            inquiry_material_id: 78,
          },
        },
        {
          createdAt: '2024-11-18T08:22:07.891Z',
          updatedAt: '2024-12-12T06:37:26.154Z',
          id: 25,
          qq_account: ['1582649509'],
          member_years: '6',
          phones: [],
          mobiles: null,
          faxes: null,
          location: null,
          addresses: null,
          company_tag: ['sscp'],
          company_name: '政元供应商-电奇分部',
          company_ids: ['2'],
          createdById: 1,
          updatedById: 1,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-12T07:02:49.203Z',
            updatedAt: '2024-12-12T07:02:49.203Z',
            supplier_name: '政元供应商-电奇分部',
            inquiry_material_id: 78,
          },
        },
      ],
      supplier_inquiry_records: [
        {
          createdAt: '2024-12-13T10:25:00.798Z',
          updatedAt: '2024-12-13T10:25:00.818Z',
          supplier_id: 24,
          quiry_material_id: 78,
          has_tax_included: 'false',
          price: null,
          id: 34,
          remark: null,
          chat_messages: null,
          inquiry_status: '1',
          has_adopt: '0',
          createdById: null,
          updatedById: null,
          store_status: '满足',
          inquiry_material: {
            createdAt: '2024-12-12T07:02:49.185Z',
            updatedAt: '2024-12-13T10:29:54.780Z',
            inquiry_record_id: 63,
            unit: null,
            manufacturer: '厚声',
            id: 78,
            material_code: '0402WGF1621TCE',
            quantity: 300,
            gather_error: null,
            createdById: 1,
            updatedById: 1,
            inquiry_material_status: '3',
          },
          supplier: {
            createdAt: '2024-11-18T08:21:25.797Z',
            updatedAt: '2024-12-12T06:34:27.416Z',
            id: 24,
            qq_account: ['2927104451'],
            member_years: '6',
            phones: [],
            mobiles: null,
            faxes: null,
            location: null,
            addresses: null,
            company_tag: ['icon_hckc', 'sscp'],
            company_name: '政元供应商-生发分部',
            company_ids: ['4'],
            createdById: 1,
            updatedById: 1,
          },
        },
        {
          createdAt: '2024-12-13T10:25:02.304Z',
          updatedAt: '2024-12-13T10:28:02.417Z',
          supplier_id: 25,
          quiry_material_id: 78,
          has_tax_included: 'true',
          price: 0.82,
          id: 35,
          remark: '最低起购500',
          chat_messages: [
            {
              speakerRole: 'human',
              createdAt: 1734085682,
              content: '0.82 含税  最低起购500',
            },
            {
              speakerRole: 'ai',
              createdAt: 1734085506,
              content: '你好，0402WGF1621TCE  300 厚声 多少钱',
            },
            {
              speakerRole: 'ai',
              createdAt: 1734069693,
              content: '服务器开小差了~',
            },
            {
              speakerRole: 'human',
              createdAt: 1734069692,
              content: '0.48  22+ 怎么样',
            },
            {
              speakerRole: 'ai',
              createdAt: 1734069588,
              content: '服务器开小差了~',
            },
            {
              speakerRole: 'human',
              createdAt: 1734069588,
              content: '0.48  22+ 如何',
            },
            {
              speakerRole: 'ai',
              createdAt: 1734068924,
              content: '服务器开小差了~',
            },
          ],
          inquiry_status: '2',
          has_adopt: '0',
          createdById: null,
          updatedById: 1,
          store_status: '不满足',
          inquiry_material: {
            createdAt: '2024-12-12T07:02:49.185Z',
            updatedAt: '2024-12-13T10:29:54.780Z',
            inquiry_record_id: 63,
            unit: null,
            manufacturer: '厚声',
            id: 78,
            material_code: '0402WGF1621TCE',
            quantity: 300,
            gather_error: null,
            createdById: 1,
            updatedById: 1,
            inquiry_material_status: '3',
          },
          supplier: {
            createdAt: '2024-11-18T08:22:07.891Z',
            updatedAt: '2024-12-12T06:37:26.154Z',
            id: 25,
            qq_account: ['1582649509'],
            member_years: '6',
            phones: [],
            mobiles: null,
            faxes: null,
            location: null,
            addresses: null,
            company_tag: ['sscp'],
            company_name: '政元供应商-电奇分部',
            company_ids: ['2'],
            createdById: 1,
            updatedById: 1,
          },
        },
      ],
    },
  ];

  return (
    <InquiryRecordContext.Provider
      value={{
        inquiryRecordData: data1 || inquiryRecordData?.data,
        inquiryMaterialsData: data2 || inquiryMaterialsData?.data,
        loading: isLoading,
        selectedRecords,
        setSelectedRecord,
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
    throw new Error('useInquiryRecord must be used within human InquiryRecordProvider');
  }
  return context;
};
