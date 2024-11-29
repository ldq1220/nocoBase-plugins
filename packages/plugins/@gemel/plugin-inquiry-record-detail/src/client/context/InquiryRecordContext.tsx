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

  const setSelectedRecord = (tabKey: string, record: any) => {
    setSelectedRecords((prev) => {
      if (record === null) {
        // 如果要清除选中,则删除该tab的记录
        const { [tabKey]: _, ...rest } = prev;
        return rest;
      }
      // 保留其他tab的记录,只更新当前tab
      return {
        ...prev,
        [tabKey]: record,
      };
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

  const data2 = [
    {
      createdAt: '2024-11-26T10:49:33.651Z',
      updatedAt: '2024-11-26T11:40:37.129Z',
      id: 45,
      material_code: 'SGM2203-3.3YK3G/TR',
      inquiry_material_status: '2',
      createdById: 1,
      updatedById: 1,
      inquiry_record_id: 46,
      gather_error: null,
      suppliers: [
        {
          createdAt: '2024-11-20T11:50:57.390Z',
          updatedAt: '2024-11-27T02:16:17.759Z',
          id: 93,
          qq_account: ['800875998'],
          member_years: '13',
          phones: ['0755-82724810 圣禾堂'],
          mobiles: '19925288932',
          faxes: '',
          location: '深圳市  龙岗区',
          addresses: '深圳市龙岗区坂田街道新天下工业城百瑞达大厦A座3楼',
          company_tag: ['iccp'],
          company_name: '圣禾堂（深圳）电子科技有限公司',
          company_ids: ['1', '2', '4'],
          createdById: null,
          updatedById: 7,
          inquiry_materials_suppliers: {
            createdAt: '2024-11-26T11:40:37.588Z',
            updatedAt: '2024-11-26T11:40:37.588Z',
            inquiry_material_id: 45,
            supplier_name: '圣禾堂（深圳）电子科技有限公司',
          },
        },
        {
          createdAt: '2024-11-26T11:40:37.267Z',
          updatedAt: '2024-11-27T02:20:16.094Z',
          id: 106,
          qq_account: ['2881542792', '2881542749'],
          member_years: '4',
          phones: ['0755-83997694 郭先生', '0755-83997584 陈先生'],
          mobiles: '15712166684',
          faxes: '0755-83997584',
          location: '深圳市',
          addresses: '深圳市福田区华强北路现代之窗A座2088室',
          company_tag: ['sscp'],
          company_name: '深圳市小张科技有限公司',
          company_ids: ['1', '4'],
          createdById: 5,
          updatedById: 7,
          inquiry_materials_suppliers: {
            createdAt: '2024-11-26T11:40:37.314Z',
            updatedAt: '2024-11-26T11:40:37.314Z',
            inquiry_material_id: 45,
            supplier_name: '深圳市小张科技有限公司',
          },
        },
        {
          createdAt: '2024-11-26T11:40:37.288Z',
          updatedAt: '2024-11-27T02:20:16.092Z',
          id: 107,
          qq_account: ['2355537532', '2881996961'],
          member_years: '13',
          phones: [
            '0755-82868046-722 小雪',
            '0755-82868046-733 珊珊',
            '0755-82868046-766 小燕',
            '0755-82868045-788 丹琼',
          ],
          mobiles: '13424325001',
          faxes: '',
          location: '深圳市  世纪汇广场',
          addresses: '深圳市福田区华强北世纪汇广场（交通银行大厦）2701C',
          company_tag: ['sscp'],
          company_name: '深圳市费迪南科技有限公司',
          company_ids: ['1', '4'],
          createdById: 5,
          updatedById: 7,
          inquiry_materials_suppliers: {
            createdAt: '2024-11-26T11:40:37.355Z',
            updatedAt: '2024-11-26T11:40:37.355Z',
            inquiry_material_id: 45,
            supplier_name: '深圳市费迪南科技有限公司',
          },
        },
      ],
      supplier_inquiry_records: [
        {
          createdAt: '2024-11-29T01:47:37.092Z',
          updatedAt: '2024-11-29T07:28:44.465Z',
          supplier_id: 93,
          quiry_material_id: 45,
          price: 20.8,
          id: 13,
          store_status: '满足',
          chat_messages: [
            {
              q: '你好',
              a: '我不好',
            },
          ],
          inquiry_status: '2',
          createdById: 1,
          updatedById: 1,
          has_adopt: '0',
          supplier: {
            createdAt: '2024-11-20T11:50:57.390Z',
            updatedAt: '2024-11-27T02:16:17.759Z',
            id: 93,
            qq_account: ['800875998'],
            member_years: '13',
            phones: ['0755-82724810 圣禾堂'],
            mobiles: '19925288932',
            faxes: '',
            location: '深圳市  龙岗区',
            addresses: '深圳市龙岗区坂田街道新天下工业城百瑞达大厦A座3楼',
            company_tag: ['iccp'],
            company_name: '圣禾堂（深圳）电子科技有限公司',
            company_ids: ['1', '2', '4'],
            createdById: null,
            updatedById: 7,
          },
        },
        {
          createdAt: '2024-11-29T01:47:37.118Z',
          updatedAt: '2024-11-29T07:28:58.686Z',
          supplier_id: 106,
          quiry_material_id: 45,
          price: null,
          id: 14,
          store_status: null,
          chat_messages: [
            {
              q: '你好',
            },
          ],
          inquiry_status: '1',
          createdById: 1,
          updatedById: 1,
          has_adopt: '0',
          supplier: {
            createdAt: '2024-11-26T11:40:37.267Z',
            updatedAt: '2024-11-27T02:20:16.094Z',
            id: 106,
            qq_account: ['2881542792', '2881542749'],
            member_years: '4',
            phones: ['0755-83997694 郭先生', '0755-83997584 陈先生'],
            mobiles: '15712166684',
            faxes: '0755-83997584',
            location: '深圳市',
            addresses: '深圳市福田区华强北路现代之窗A座2088室',
            company_tag: ['sscp'],
            company_name: '深圳市小张科技有限公司',
            company_ids: ['1', '4'],
            createdById: 5,
            updatedById: 7,
          },
        },
        {
          createdAt: '2024-11-29T01:47:37.143Z',
          updatedAt: '2024-11-29T07:29:01.923Z',
          supplier_id: 107,
          quiry_material_id: 45,
          price: null,
          id: 15,
          store_status: null,
          chat_messages: null,
          inquiry_status: '0',
          createdById: 1,
          updatedById: 1,
          has_adopt: '0',
          supplier: {
            createdAt: '2024-11-26T11:40:37.288Z',
            updatedAt: '2024-11-27T02:20:16.092Z',
            id: 107,
            qq_account: ['2355537532', '2881996961'],
            member_years: '13',
            phones: [
              '0755-82868046-722 小雪',
              '0755-82868046-733 珊珊',
              '0755-82868046-766 小燕',
              '0755-82868045-788 丹琼',
            ],
            mobiles: '13424325001',
            faxes: '',
            location: '深圳市  世纪汇广场',
            addresses: '深圳市福田区华强北世纪汇广场（交通银行大厦）2701C',
            company_tag: ['sscp'],
            company_name: '深圳市费迪南科技有限公司',
            company_ids: ['1', '4'],
            createdById: 5,
            updatedById: 7,
          },
        },
      ],
    },
    {
      createdAt: '2024-11-26T10:49:33.660Z',
      updatedAt: '2024-11-26T11:42:01.126Z',
      id: 46,
      material_code: 'MM74HC4050N',
      inquiry_material_status: '2',
      createdById: 1,
      updatedById: 1,
      inquiry_record_id: 46,
      gather_error: null,
      suppliers: [
        {
          createdAt: '2024-11-26T11:42:01.257Z',
          updatedAt: '2024-11-26T11:42:01.257Z',
          id: 108,
          qq_account: ['3750349850'],
          member_years: '1',
          phones: [],
          mobiles: '17825672023',
          faxes: '',
          location: '汕头市',
          addresses: '汕头市潮阳区贵屿镇湄洲村东区三路6号',
          company_tag: [],
          company_name: '汕头市嘉源捷电子元器件商行',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-11-26T11:42:01.321Z',
            updatedAt: '2024-11-26T11:42:01.321Z',
            inquiry_material_id: 46,
            supplier_name: '汕头市嘉源捷电子元器件商行',
          },
        },
        {
          createdAt: '2024-11-26T11:42:01.279Z',
          updatedAt: '2024-11-27T02:20:44.875Z',
          id: 109,
          qq_account: ['83434317'],
          member_years: '14',
          phones: ['0755-83291041 '],
          mobiles: '13714096955',
          faxes: '',
          location: '深圳市  华强电子世界',
          addresses: '深圳市华强电子世界华强三店（佳和大厦）2C047室',
          company_tag: [],
          company_name: '深圳市新易天电子',
          company_ids: ['1', '4'],
          createdById: 5,
          updatedById: 7,
          inquiry_materials_suppliers: {
            createdAt: '2024-11-26T11:42:01.353Z',
            updatedAt: '2024-11-26T11:42:01.353Z',
            inquiry_material_id: 46,
            supplier_name: '深圳市新易天电子',
          },
        },
        {
          createdAt: '2024-11-26T11:42:01.293Z',
          updatedAt: '2024-11-26T11:42:01.293Z',
          id: 110,
          qq_account: ['2885406049'],
          member_years: '15',
          phones: ['0755-83041867 罗小姐', '0755-82565052 null'],
          mobiles: '13316913687',
          faxes: '0755-83041867',
          location: '深圳市  华强北路华强广场',
          addresses: '深圳市福田区新华强六楼Q6E1090房间',
          company_tag: [],
          company_name: '深圳市通达盈科电子经营部',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-11-26T11:42:01.368Z',
            updatedAt: '2024-11-26T11:42:01.368Z',
            inquiry_material_id: 46,
            supplier_name: '深圳市通达盈科电子经营部',
          },
        },
      ],
      supplier_inquiry_records: [
        {
          createdAt: '2024-11-29T01:52:29.830Z',
          updatedAt: '2024-11-29T08:24:43.257Z',
          supplier_id: 108,
          quiry_material_id: 46,
          price: 8.8,
          id: 16,
          store_status: '不满足',
          chat_messages: [
            {
              q: '在不在',
              a: '不在，你们公司被我们拉黑了',
            },
          ],
          inquiry_status: '2',
          createdById: 1,
          updatedById: 1,
          has_adopt: '0',
          supplier: {
            createdAt: '2024-11-26T11:42:01.257Z',
            updatedAt: '2024-11-26T11:42:01.257Z',
            id: 108,
            qq_account: ['3750349850'],
            member_years: '1',
            phones: [],
            mobiles: '17825672023',
            faxes: '',
            location: '汕头市',
            addresses: '汕头市潮阳区贵屿镇湄洲村东区三路6号',
            company_tag: [],
            company_name: '汕头市嘉源捷电子元器件商行',
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-11-29T08:24:43.265Z',
          updatedAt: '2024-11-29T08:24:43.281Z',
          supplier_id: 109,
          quiry_material_id: 46,
          price: 9.2,
          id: 18,
          store_status: '满足',
          chat_messages: [
            {
              q: 'MM74HC4050N 多少钱',
              a: '9.20 有现货',
            },
          ],
          inquiry_status: '2',
          createdById: 1,
          updatedById: 1,
          has_adopt: '1',
          supplier: {
            createdAt: '2024-11-26T11:42:01.279Z',
            updatedAt: '2024-11-27T02:20:44.875Z',
            id: 109,
            qq_account: ['83434317'],
            member_years: '14',
            phones: ['0755-83291041 '],
            mobiles: '13714096955',
            faxes: '',
            location: '深圳市  华强电子世界',
            addresses: '深圳市华强电子世界华强三店（佳和大厦）2C047室',
            company_tag: [],
            company_name: '深圳市新易天电子',
            company_ids: ['1', '4'],
            createdById: 5,
            updatedById: 7,
          },
        },
      ],
    },
  ];

  return (
    <InquiryRecordContext.Provider
      value={{
        inquiryRecordData: inquiryRecordData?.data,
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
    throw new Error('useInquiryRecord must be used within a InquiryRecordProvider');
  }
  return context;
};
