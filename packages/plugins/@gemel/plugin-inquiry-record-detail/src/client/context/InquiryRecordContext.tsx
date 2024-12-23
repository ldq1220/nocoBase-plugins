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
  replayLoading: boolean;
  selectedRecords: Record<string, any>;
  setSelectedRecord: (tabKey: string, record: any) => void;
  setReplayLoading: (loading: boolean) => void;
}

const InquiryRecordContext = createContext<InquiryRecordContextType | undefined>(undefined);

export const InquiryRecordProvider: FC<{
  children: ReactNode;
  inquiryRecordId: string | number;
}> = ({ children, inquiryRecordId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [replayLoading, setReplayLoading] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState<any>({});

  // 设置选中的记录
  const setSelectedRecord = (tabKey: string, record: any) => {
    setSelectedRecords((prev: any) => {
      if (record === null) {
        const { [tabKey]: _, ...rest } = prev;
        return rest;
      }

      const newRecords: any = {
        ...prev,
        [tabKey]: record,
      };

      // 按照记录的id进行排序
      const sortedEntries = Object.entries(newRecords).sort((a, b) => {
        const idA = (a[1] as { quiry_material_id?: number })?.quiry_material_id ?? 0;
        const idB = (b[1] as { quiry_material_id?: number })?.quiry_material_id ?? 0;
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
    createdAt: '2024-12-18T07:56:10.702Z',
    updatedAt: '2024-12-18T10:00:00.357Z',
    inquiry_date: '2024-12-18 15:56:10',
    origin_inquiry_text: '你好，请问这些多少钱\r\nSN74ALVC164245DGGR   600\r\nESD9B5VL-2/TR  2000',
    id: 76,
    inquiry_status: '3',
    imAvatarUrl: null,
    company_id: 4,
    gather_error: null,
    reply_text: '',
    imName: '记梦',
    imPlatform: 'qq',
    imBotUserId: '2850870416',
    imIsGroup: '好友',
    imRemark: null,
    imUserId: '1582649509',
    imGroupId: '',
    createdById: 1,
    updatedById: 1,
    inquiry_materials: [
      {
        createdAt: '2024-12-18T07:56:10.725Z',
        updatedAt: '2024-12-18T11:14:00.615Z',
        inquiry_record_id: 76,
        unit: null,
        manufacturer: '',
        id: 95,
        material_code: 'SN74ALVC164245DGGR',
        quantity: 600,
        gather_error: null,
        inquiry_material_status: '4',
        createdById: 1,
        updatedById: 1,
      },
      {
        createdAt: '2024-12-18T07:56:10.736Z',
        updatedAt: '2024-12-18T11:14:00.250Z',
        inquiry_record_id: 76,
        unit: null,
        manufacturer: '',
        id: 96,
        material_code: 'ESD9B5VL-2/TR',
        quantity: 2000,
        gather_error: null,
        inquiry_material_status: '4',
        createdById: 1,
        updatedById: 1,
      },
    ],
  };

  const data2 = [
    {
      createdAt: '2024-12-18T07:56:10.725Z',
      updatedAt: '2024-12-18T11:14:00.615Z',
      inquiry_record_id: 76,
      unit: null,
      manufacturer: '',
      id: 95,
      material_code: 'SN74ALVC164245DGGR',
      quantity: 600,
      gather_error: null,
      inquiry_material_status: '4',
      createdById: 1,
      updatedById: 1,
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
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-18T07:57:47.900Z',
            updatedAt: '2024-12-18T07:57:47.900Z',
            supplier_name: '圣禾堂（深圳）电子科技有限公司',
            inquiry_material_id: 95,
          },
        },
        {
          createdAt: '2024-11-20T11:51:27.092Z',
          updatedAt: '2024-12-18T07:57:47.793Z',
          id: 94,
          qq_account: ['800858235'],
          member_years: '19',
          phones: ['0755-82730390 彭先生'],
          mobiles: '13699220731',
          faxes: '0755-82730390',
          location: '深圳市  华强广场',
          addresses: '深圳市福田区华强北华强广场一楼外围H1F009（麦当劳往步行街方向50米处）',
          company_tag: ['iccp', 'icon_hckc'],
          company_name: '深圳明嘉瑞科技有限公司',
          company_ids: ['1', '2', '4'],
          createdById: null,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-18T07:57:47.880Z',
            updatedAt: '2024-12-18T07:57:47.880Z',
            supplier_name: '深圳明嘉瑞科技有限公司',
            inquiry_material_id: 95,
          },
        },
        {
          createdAt: '2024-12-03T06:34:50.292Z',
          updatedAt: '2024-12-03T06:34:50.292Z',
          id: 155,
          qq_account: ['800102799'],
          member_years: '10',
          phones: ['0755-23894978 杨先生', '0755-23894678 ', '0755-83225919 ', '18319881765 林先生'],
          mobiles: '13714690201',
          faxes: '0755-82734333',
          location: '深圳市',
          addresses: '深圳市福田区中航路鼎诚国际大厦2706',
          company_tag: ['iccp'],
          company_name: '深圳市安玛科技有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-18T07:57:47.893Z',
            updatedAt: '2024-12-18T07:57:47.893Z',
            supplier_name: '深圳市安玛科技有限公司',
            inquiry_material_id: 95,
          },
        },
        {
          createdAt: '2024-12-03T06:36:27.387Z',
          updatedAt: '2024-12-18T07:57:47.789Z',
          id: 166,
          qq_account: ['2851927397', '2851840398'],
          member_years: '21',
          phones: ['0755-88607789 吴小姐', '0755-83290199 周小姐', '0755-83031108 林先生'],
          mobiles: '15920083008',
          faxes: '0755-83031108',
          location: '深圳市',
          addresses: '深圳市福田区深南中路世纪汇(交通银行大厦)29层2901A',
          company_tag: ['iccp', 'icon_hcjg'],
          company_name: '深圳市讯捷微科技有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-18T07:57:47.908Z',
            updatedAt: '2024-12-18T07:57:47.908Z',
            supplier_name: '深圳市讯捷微科技有限公司',
            inquiry_material_id: 95,
          },
        },
        {
          createdAt: '2024-12-18T07:57:47.692Z',
          updatedAt: '2024-12-18T07:57:47.692Z',
          id: 181,
          qq_account: ['2851174870', '2850975234'],
          member_years: '17',
          phones: ['0755-83265236 黄小姐', '0755-83958443 肖先生', '0755-83265235 黄小姐', '0755-83950854 王小姐'],
          mobiles: '13428995669',
          faxes: '0755-83743026',
          location: '深圳市',
          addresses: '深圳市福田区深南中路3018号交通银行大厦2208',
          company_tag: ['iccp'],
          company_name: '深圳市科翔达电子有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-18T07:57:47.743Z',
            updatedAt: '2024-12-18T07:57:47.743Z',
            supplier_name: '深圳市科翔达电子有限公司',
            inquiry_material_id: 95,
          },
        },
      ],
      supplier_inquiry_records: [
        {
          createdAt: '2024-12-18T08:00:00.391Z',
          updatedAt: '2024-12-18T09:30:00.725Z',
          supplier_id: 93,
          quiry_material_id: 95,
          has_tax_included: 'false',
          price: null,
          id: 56,
          remark: null,
          store_status: '满足',
          chat_messages: null,
          inquiry_status: '1',
          createdById: null,
          updatedById: 1,
          has_adopt: '0',
          inquiry_material: {
            createdAt: '2024-12-18T07:56:10.725Z',
            updatedAt: '2024-12-18T11:14:00.615Z',
            inquiry_record_id: 76,
            unit: null,
            manufacturer: '',
            id: 95,
            material_code: 'SN74ALVC164245DGGR',
            quantity: 600,
            gather_error: null,
            inquiry_material_status: '4',
            createdById: 1,
            updatedById: 1,
          },
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
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-12-18T08:00:00.568Z',
          updatedAt: '2024-12-18T09:30:01.242Z',
          supplier_id: 94,
          quiry_material_id: 95,
          has_tax_included: 'false',
          price: null,
          id: 57,
          remark: null,
          store_status: '满足',
          chat_messages: null,
          inquiry_status: '1',
          createdById: null,
          updatedById: 1,
          has_adopt: '0',
          inquiry_material: {
            createdAt: '2024-12-18T07:56:10.725Z',
            updatedAt: '2024-12-18T11:14:00.615Z',
            inquiry_record_id: 76,
            unit: null,
            manufacturer: '',
            id: 95,
            material_code: 'SN74ALVC164245DGGR',
            quantity: 600,
            gather_error: null,
            inquiry_material_status: '4',
            createdById: 1,
            updatedById: 1,
          },
          supplier: {
            createdAt: '2024-11-20T11:51:27.092Z',
            updatedAt: '2024-12-18T07:57:47.793Z',
            id: 94,
            qq_account: ['800858235'],
            member_years: '19',
            phones: ['0755-82730390 彭先生'],
            mobiles: '13699220731',
            faxes: '0755-82730390',
            location: '深圳市  华强广场',
            addresses: '深圳市福田区华强北华强广场一楼外围H1F009（麦当劳往步行街方向50米处）',
            company_tag: ['iccp', 'icon_hckc'],
            company_name: '深圳明嘉瑞科技有限公司',
            company_ids: ['1', '2', '4'],
            createdById: null,
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-12-18T08:00:01.063Z',
          updatedAt: '2024-12-18T09:06:15.658Z',
          supplier_id: 155,
          quiry_material_id: 95,
          has_tax_included: 'false',
          price: null,
          id: 58,
          remark: null,
          store_status: '满足',
          chat_messages: null,
          inquiry_status: '1',
          createdById: null,
          updatedById: 1,
          has_adopt: '0',
          inquiry_material: {
            createdAt: '2024-12-18T07:56:10.725Z',
            updatedAt: '2024-12-18T11:14:00.615Z',
            inquiry_record_id: 76,
            unit: null,
            manufacturer: '',
            id: 95,
            material_code: 'SN74ALVC164245DGGR',
            quantity: 600,
            gather_error: null,
            inquiry_material_status: '4',
            createdById: 1,
            updatedById: 1,
          },
          supplier: {
            createdAt: '2024-12-03T06:34:50.292Z',
            updatedAt: '2024-12-03T06:34:50.292Z',
            id: 155,
            qq_account: ['800102799'],
            member_years: '10',
            phones: ['0755-23894978 杨先生', '0755-23894678 ', '0755-83225919 ', '18319881765 林先生'],
            mobiles: '13714690201',
            faxes: '0755-82734333',
            location: '深圳市',
            addresses: '深圳市福田区中航路鼎诚国际大厦2706',
            company_tag: ['iccp'],
            company_name: '深圳市安玛科技有限公司',
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-12-18T08:00:01.283Z',
          updatedAt: '2024-12-18T08:56:32.209Z',
          supplier_id: 166,
          quiry_material_id: 95,
          has_tax_included: 'false',
          price: null,
          id: 59,
          remark: '网上数量只有1个',
          store_status: '满足',
          chat_messages: [
            {
              speakerRole: 'human',
              createdAt: 1734512191,
              content: '网上数量\n1个',
            },
            {
              speakerRole: 'ai',
              createdAt: 1734512101,
              content: '你好，SN74ALVC164245DGGR  600 , 多少钱',
            },
          ],
          inquiry_status: '2',
          createdById: null,
          updatedById: 1,
          has_adopt: '0',
          inquiry_material: {
            createdAt: '2024-12-18T07:56:10.725Z',
            updatedAt: '2024-12-18T11:14:00.615Z',
            inquiry_record_id: 76,
            unit: null,
            manufacturer: '',
            id: 95,
            material_code: 'SN74ALVC164245DGGR',
            quantity: 600,
            gather_error: null,
            inquiry_material_status: '4',
            createdById: 1,
            updatedById: 1,
          },
          supplier: {
            createdAt: '2024-12-03T06:36:27.387Z',
            updatedAt: '2024-12-18T07:57:47.789Z',
            id: 166,
            qq_account: ['2851927397', '2851840398'],
            member_years: '21',
            phones: ['0755-88607789 吴小姐', '0755-83290199 周小姐', '0755-83031108 林先生'],
            mobiles: '15920083008',
            faxes: '0755-83031108',
            location: '深圳市',
            addresses: '深圳市福田区深南中路世纪汇(交通银行大厦)29层2901A',
            company_tag: ['iccp', 'icon_hcjg'],
            company_name: '深圳市讯捷微科技有限公司',
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-12-18T08:00:01.453Z',
          updatedAt: '2024-12-18T09:02:20.947Z',
          supplier_id: 181,
          quiry_material_id: 95,
          has_tax_included: 'false',
          price: 2,
          id: 60,
          remark: '24+',
          store_status: '满足',
          chat_messages: [
            {
              speakerRole: 'human',
              createdAt: 1734512540,
              content: 'SN74ALVC164245DGGR  2.0 24+',
            },
            {
              speakerRole: 'ai',
              createdAt: 1734512106,
              content: '你好，SN74ALVC164245DGGR  600 , 多少钱',
            },
          ],
          inquiry_status: '2',
          createdById: null,
          updatedById: 1,
          has_adopt: '0',
          inquiry_material: {
            createdAt: '2024-12-18T07:56:10.725Z',
            updatedAt: '2024-12-18T11:14:00.615Z',
            inquiry_record_id: 76,
            unit: null,
            manufacturer: '',
            id: 95,
            material_code: 'SN74ALVC164245DGGR',
            quantity: 600,
            gather_error: null,
            inquiry_material_status: '4',
            createdById: 1,
            updatedById: 1,
          },
          supplier: {
            createdAt: '2024-12-18T07:57:47.692Z',
            updatedAt: '2024-12-18T07:57:47.692Z',
            id: 181,
            qq_account: ['2851174870', '2850975234'],
            member_years: '17',
            phones: ['0755-83265236 黄小姐', '0755-83958443 肖先生', '0755-83265235 黄小姐', '0755-83950854 王小姐'],
            mobiles: '13428995669',
            faxes: '0755-83743026',
            location: '深圳市',
            addresses: '深圳市福田区深南中路3018号交通银行大厦2208',
            company_tag: ['iccp'],
            company_name: '深圳市科翔达电子有限公司',
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
      ],
    },
    {
      createdAt: '2024-12-18T07:56:10.736Z',
      updatedAt: '2024-12-18T11:14:00.250Z',
      inquiry_record_id: 76,
      unit: null,
      manufacturer: '',
      id: 96,
      material_code: 'ESD9B5VL-2/TR',
      quantity: 2000,
      gather_error: null,
      inquiry_material_status: '4',
      createdById: 1,
      updatedById: 1,
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
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-18T07:58:17.434Z',
            updatedAt: '2024-12-18T07:58:17.434Z',
            supplier_name: '圣禾堂（深圳）电子科技有限公司',
            inquiry_material_id: 96,
          },
        },
        {
          createdAt: '2024-11-20T11:51:27.092Z',
          updatedAt: '2024-12-18T07:57:47.793Z',
          id: 94,
          qq_account: ['800858235'],
          member_years: '19',
          phones: ['0755-82730390 彭先生'],
          mobiles: '13699220731',
          faxes: '0755-82730390',
          location: '深圳市  华强广场',
          addresses: '深圳市福田区华强北华强广场一楼外围H1F009（麦当劳往步行街方向50米处）',
          company_tag: ['iccp', 'icon_hckc'],
          company_name: '深圳明嘉瑞科技有限公司',
          company_ids: ['1', '2', '4'],
          createdById: null,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-18T07:58:17.393Z',
            updatedAt: '2024-12-18T07:58:17.393Z',
            supplier_name: '深圳明嘉瑞科技有限公司',
            inquiry_material_id: 96,
          },
        },
        {
          createdAt: '2024-12-18T07:58:17.219Z',
          updatedAt: '2024-12-18T07:58:17.219Z',
          id: 182,
          qq_account: ['2880987911'],
          member_years: '11',
          phones: ['0755-82544919 谢先生', '0755-83220152 詹小姐'],
          mobiles: '13480889043',
          faxes: '0755-83220152',
          location: '深圳市',
          addresses: '深圳市福田区华强北街道都会100大厦B座13楼13O室',
          company_tag: ['icon_hckc', 'sscp'],
          company_name: '深圳市宏信发科技有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-18T07:58:17.287Z',
            updatedAt: '2024-12-18T07:58:17.287Z',
            supplier_name: '深圳市宏信发科技有限公司',
            inquiry_material_id: 96,
          },
        },
        {
          createdAt: '2024-12-18T07:58:17.224Z',
          updatedAt: '2024-12-18T07:58:17.224Z',
          id: 183,
          qq_account: ['3008047756'],
          member_years: '12',
          phones: ['0755-83294644 张先生'],
          mobiles: '13590290444',
          faxes: '0755-83294644',
          location: '深圳市',
          addresses: '深圳市福田区国利B座836',
          company_tag: ['sscp'],
          company_name: '广东星河微电子有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-18T07:58:17.299Z',
            updatedAt: '2024-12-18T07:58:17.299Z',
            supplier_name: '广东星河微电子有限公司',
            inquiry_material_id: 96,
          },
        },
        {
          createdAt: '2024-12-18T07:58:17.229Z',
          updatedAt: '2024-12-18T07:58:17.229Z',
          id: 184,
          qq_account: ['800009500', '2829209797'],
          member_years: '10',
          phones: ['0755-88999043 白小姐'],
          mobiles: '15814429227',
          faxes: '0755-83294576',
          location: '深圳市',
          addresses: '深圳市福田区新亚洲电子城一期3C037 | 公司：深圳市福田区中航路鼎诚大厦2703A',
          company_tag: ['sscp'],
          company_name: '深圳市汇德信电子科技有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-18T07:58:17.299Z',
            updatedAt: '2024-12-18T07:58:17.299Z',
            supplier_name: '深圳市汇德信电子科技有限公司',
            inquiry_material_id: 96,
          },
        },
      ],
      supplier_inquiry_records: [
        {
          createdAt: '2024-12-18T08:00:01.972Z',
          updatedAt: '2024-12-18T08:00:01.991Z',
          supplier_id: 93,
          quiry_material_id: 96,
          has_tax_included: 'false',
          price: null,
          id: 61,
          remark: null,
          store_status: '满足',
          chat_messages: null,
          inquiry_status: '1',
          createdById: null,
          updatedById: 1,
          has_adopt: '0',
          inquiry_material: {
            createdAt: '2024-12-18T07:56:10.736Z',
            updatedAt: '2024-12-18T11:14:00.250Z',
            inquiry_record_id: 76,
            unit: null,
            manufacturer: '',
            id: 96,
            material_code: 'ESD9B5VL-2/TR',
            quantity: 2000,
            gather_error: null,
            inquiry_material_status: '4',
            createdById: 1,
            updatedById: 1,
          },
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
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-12-18T08:00:02.530Z',
          updatedAt: '2024-12-18T09:06:11.066Z',
          supplier_id: 94,
          quiry_material_id: 96,
          has_tax_included: 'true',
          price: 200,
          id: 62,
          remark: '',
          store_status: '满足',
          chat_messages: [
            {
              speakerRole: 'human',
              createdAt: 1734509252,
              content: '但是这个我这没货了',
            },
            {
              speakerRole: 'ai',
              createdAt: 1734509229,
              content: '',
            },
            {
              speakerRole: 'human',
              createdAt: 1734509229,
              content: '含税200',
            },
            {
              speakerRole: 'ai',
              createdAt: 1734508809,
              content: '你好，ESD9B5VL-2/TR  2000 , 多少钱',
            },
            {
              speakerRole: 'ai',
              createdAt: 1734429341,
              content: '',
            },
            {
              speakerRole: 'human',
              createdAt: 1734429341,
              content: '200 含税',
            },
            {
              speakerRole: 'ai',
              createdAt: 1734429005,
              content: '你好，MC34072G-S08-R  2000  多少钱',
            },
          ],
          inquiry_status: '2',
          createdById: null,
          updatedById: 1,
          has_adopt: '0',
          inquiry_material: {
            createdAt: '2024-12-18T07:56:10.736Z',
            updatedAt: '2024-12-18T11:14:00.250Z',
            inquiry_record_id: 76,
            unit: null,
            manufacturer: '',
            id: 96,
            material_code: 'ESD9B5VL-2/TR',
            quantity: 2000,
            gather_error: null,
            inquiry_material_status: '4',
            createdById: 1,
            updatedById: 1,
          },
          supplier: {
            createdAt: '2024-11-20T11:51:27.092Z',
            updatedAt: '2024-12-18T07:57:47.793Z',
            id: 94,
            qq_account: ['800858235'],
            member_years: '19',
            phones: ['0755-82730390 彭先生'],
            mobiles: '13699220731',
            faxes: '0755-82730390',
            location: '深圳市  华强广场',
            addresses: '深圳市福田区华强北华强广场一楼外围H1F009（麦当劳往步行街方向50米处）',
            company_tag: ['iccp', 'icon_hckc'],
            company_name: '深圳明嘉瑞科技有限公司',
            company_ids: ['1', '2', '4'],
            createdById: null,
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-12-18T08:00:02.749Z',
          updatedAt: '2024-12-18T08:55:02.447Z',
          supplier_id: 182,
          quiry_material_id: 96,
          has_tax_included: 'false',
          price: null,
          id: 63,
          remark: null,
          store_status: '满足',
          chat_messages: null,
          inquiry_status: '1',
          createdById: null,
          updatedById: 1,
          has_adopt: '0',
          inquiry_material: {
            createdAt: '2024-12-18T07:56:10.736Z',
            updatedAt: '2024-12-18T11:14:00.250Z',
            inquiry_record_id: 76,
            unit: null,
            manufacturer: '',
            id: 96,
            material_code: 'ESD9B5VL-2/TR',
            quantity: 2000,
            gather_error: null,
            inquiry_material_status: '4',
            createdById: 1,
            updatedById: 1,
          },
          supplier: {
            createdAt: '2024-12-18T07:58:17.219Z',
            updatedAt: '2024-12-18T07:58:17.219Z',
            id: 182,
            qq_account: ['2880987911'],
            member_years: '11',
            phones: ['0755-82544919 谢先生', '0755-83220152 詹小姐'],
            mobiles: '13480889043',
            faxes: '0755-83220152',
            location: '深圳市',
            addresses: '深圳市福田区华强北街道都会100大厦B座13楼13O室',
            company_tag: ['icon_hckc', 'sscp'],
            company_name: '深圳市宏信发科技有限公司',
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-12-18T08:00:02.919Z',
          updatedAt: '2024-12-18T08:59:33.890Z',
          supplier_id: 183,
          quiry_material_id: 96,
          has_tax_included: 'false',
          price: 0.02,
          id: 64,
          remark: '',
          store_status: '满足',
          chat_messages: [
            {
              speakerRole: 'human',
              createdAt: 1734512373,
              content: '你好，  0.02',
            },
            {
              speakerRole: 'ai',
              createdAt: 1734512114,
              content: '你好，ESD9B5VL-2/TR  2000 , 多少钱',
            },
          ],
          inquiry_status: '2',
          createdById: null,
          updatedById: 1,
          has_adopt: '0',
          inquiry_material: {
            createdAt: '2024-12-18T07:56:10.736Z',
            updatedAt: '2024-12-18T11:14:00.250Z',
            inquiry_record_id: 76,
            unit: null,
            manufacturer: '',
            id: 96,
            material_code: 'ESD9B5VL-2/TR',
            quantity: 2000,
            gather_error: null,
            inquiry_material_status: '4',
            createdById: 1,
            updatedById: 1,
          },
          supplier: {
            createdAt: '2024-12-18T07:58:17.224Z',
            updatedAt: '2024-12-18T07:58:17.224Z',
            id: 183,
            qq_account: ['3008047756'],
            member_years: '12',
            phones: ['0755-83294644 张先生'],
            mobiles: '13590290444',
            faxes: '0755-83294644',
            location: '深圳市',
            addresses: '深圳市福田区国利B座836',
            company_tag: ['sscp'],
            company_name: '广东星河微电子有限公司',
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-12-18T08:00:03.088Z',
          updatedAt: '2024-12-18T08:55:03.513Z',
          supplier_id: 184,
          quiry_material_id: 96,
          has_tax_included: 'false',
          price: null,
          id: 65,
          remark: null,
          store_status: '满足',
          chat_messages: null,
          inquiry_status: '1',
          createdById: null,
          updatedById: 1,
          has_adopt: '0',
          inquiry_material: {
            createdAt: '2024-12-18T07:56:10.736Z',
            updatedAt: '2024-12-18T11:14:00.250Z',
            inquiry_record_id: 76,
            unit: null,
            manufacturer: '',
            id: 96,
            material_code: 'ESD9B5VL-2/TR',
            quantity: 2000,
            gather_error: null,
            inquiry_material_status: '4',
            createdById: 1,
            updatedById: 1,
          },
          supplier: {
            createdAt: '2024-12-18T07:58:17.229Z',
            updatedAt: '2024-12-18T07:58:17.229Z',
            id: 184,
            qq_account: ['800009500', '2829209797'],
            member_years: '10',
            phones: ['0755-88999043 白小姐'],
            mobiles: '15814429227',
            faxes: '0755-83294576',
            location: '深圳市',
            addresses: '深圳市福田区新亚洲电子城一期3C037 | 公司：深圳市福田区中航路鼎诚大厦2703A',
            company_tag: ['sscp'],
            company_name: '深圳市汇德信电子科技有限公司',
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
      ],
    },
  ];

  return (
    <InquiryRecordContext.Provider
      value={{
        inquiryRecordData: inquiryRecordData?.data,
        inquiryMaterialsData: inquiryMaterialsData?.data,
        loading: isLoading,
        replayLoading: replayLoading,
        selectedRecords,
        setSelectedRecord,
        setReplayLoading,
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
