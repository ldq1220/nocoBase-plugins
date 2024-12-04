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
    createdAt: '2024-12-03T06:31:53.545Z',
    updatedAt: '2024-12-03T06:35:02.757Z',
    inquiry_date: '2024-12-03 14:31:52',
    origin_inquiry_text:
      'SGM2203-3.3YK3G/TR SGMICRO 100只*0.3含税   \\n LD1117S33CTR ST/意法 1000个   \\n   BAV74LT1G 4000 onsemi(安森美)',
    id: 56,
    inquiry_status: '4',
    company_id: 4,
    gather_error: null,
    createdById: 1,
    updatedById: 5,
    reply_text: null,
    imName: 'pre_groupName',
    imPlatform: 'qq',
    imBotUserId: 'pre_botUserId',
    imIsGroup: '群',
    imUserId: 'pre_groupId',
    imAvatarUrl: 'pre_avatarUrl',
    imRemark: 'pre_senderRemark',
    company: {
      createdAt: '2024-11-20T08:03:36.843Z',
      updatedAt: '2024-11-20T08:11:50.185Z',
      name: '电奇测试集团',
      admin_user_id: 5,
      id: 4,
      createdById: 1,
      updatedById: 1,
      brain_api_key: null,
    },
  };

  const data2 = [
    {
      createdAt: '2024-12-03T06:31:53.564Z',
      updatedAt: '2024-12-03T06:49:30.145Z',
      id: 64,
      material_code: 'SGM2203-3.3YK3G/TR',
      inquiry_material_status: '4',
      createdById: 1,
      updatedById: 1,
      inquiry_record_id: 56,
      gather_error: null,
      unit: null,
      manufacturer: 'SGMICRO',
      quantity: 100,
      suppliers: [
        {
          createdAt: '2024-12-03T06:35:09.988Z',
          updatedAt: '2024-12-03T06:35:09.988Z',
          id: 158,
          qq_account: ['2881996960', '2881996965'],
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
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:35:10.008Z',
            updatedAt: '2024-12-03T06:35:10.008Z',
            inquiry_material_id: 64,
            supplier_name: '深圳市费迪南科技有限公司',
          },
        },
        {
          createdAt: '2024-12-03T06:35:10.019Z',
          updatedAt: '2024-12-03T06:35:10.019Z',
          id: 159,
          qq_account: ['2853323137'],
          member_years: '7',
          phones: ['0755-83953235 杨先生'],
          mobiles: '13828717163',
          faxes: '',
          location: '深圳市',
          addresses: '深圳市福田区华强北路1002号赛格广场22楼2202AB',
          company_tag: ['icon_hcjg', 'sscp'],
          company_name: '深圳华创仕达电子有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:35:10.039Z',
            updatedAt: '2024-12-03T06:35:10.039Z',
            inquiry_material_id: 64,
            supplier_name: '深圳华创仕达电子有限公司',
          },
        },
        {
          createdAt: '2024-12-03T06:35:10.022Z',
          updatedAt: '2024-12-03T06:35:10.022Z',
          id: 160,
          qq_account: ['2881542792', '2881542749'],
          member_years: '4',
          phones: ['0755-83997694 郭先生', '0755-83997584 陈先生'],
          mobiles: '15712166684',
          faxes: '0755-83997584',
          location: '深圳市',
          addresses: '深圳市福田区华强北路现代之窗A座2088室',
          company_tag: ['sscp'],
          company_name: '深圳市小张科技有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:35:10.042Z',
            updatedAt: '2024-12-03T06:35:10.042Z',
            inquiry_material_id: 64,
            supplier_name: '深圳市小张科技有限公司',
          },
        },
        {
          createdAt: '2024-12-03T06:35:10.036Z',
          updatedAt: '2024-12-03T06:35:10.036Z',
          id: 161,
          qq_account: ['2881304825'],
          member_years: '15',
          phones: ['0755-83294944 陈小姐', '13723705052 苏小姐'],
          mobiles: '13723705052',
          faxes: '0755-83294948',
          location: '深圳市  新亚洲电子商城一期',
          addresses: '深圳市福田区中航路新亚洲电子商城一期4楼4B005室',
          company_tag: ['sscp'],
          company_name: '深圳市佳兴创达科技有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:35:10.053Z',
            updatedAt: '2024-12-03T06:35:10.053Z',
            inquiry_material_id: 64,
            supplier_name: '深圳市佳兴创达科技有限公司',
          },
        },
        {
          createdAt: '2024-12-03T06:35:10.038Z',
          updatedAt: '2024-12-03T06:35:10.038Z',
          id: 162,
          qq_account: ['3004240616'],
          member_years: '1',
          phones: ['0755-82788369 林小姐'],
          mobiles: '13923770977',
          faxes: '',
          location: '深圳市',
          addresses: '深圳市福田区华强北街道华航社区深南中路3006号佳和华强大厦3层3C251',
          company_tag: ['sscp'],
          company_name: '盛林微（深圳）电子有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:35:10.056Z',
            updatedAt: '2024-12-03T06:35:10.056Z',
            inquiry_material_id: 64,
            supplier_name: '盛林微（深圳）电子有限公司',
          },
        },
      ],
      supplier_inquiry_records: [
        {
          createdAt: '2024-12-03T06:47:20.299Z',
          updatedAt: '2024-12-03T06:47:20.321Z',
          supplier_id: 158,
          quiry_material_id: 64,
          price: 9.8,
          id: 19,
          store_status: '满足',
          chat_messages: [
            {
              speakerRole: 'ai',
              content: 'SGM2203-3.3YK3G/TR SGMICRO 100只*0.3含税',
            },
            {
              speakerRole: 'human',
              content: '9.8 有现货',
            },
          ],
          inquiry_status: '2',
          createdById: 1,
          updatedById: 1,
          has_adopt: '0',
          has_tax_included: 'false',
          remark: null,
          supplier: {
            createdAt: '2024-12-03T06:35:09.988Z',
            updatedAt: '2024-12-03T06:35:09.988Z',
            id: 158,
            qq_account: ['2881996960', '2881996965'],
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
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-12-03T06:47:20.330Z',
          updatedAt: '2024-12-03T06:47:20.347Z',
          supplier_id: 159,
          quiry_material_id: 64,
          price: 11.4,
          id: 20,
          store_status: '满足',
          chat_messages: [
            {
              speakerRole: 'ai',
              content: 'SGM2203-3.3YK3G/TR SGMICRO 100只*0.3含税',
            },
            {
              speakerRole: 'human',
              content: '11.4 24+',
            },
          ],
          inquiry_status: '2',
          createdById: 1,
          updatedById: 1,
          has_adopt: '0',
          has_tax_included: 'true',
          remark: null,
          supplier: {
            createdAt: '2024-12-03T06:35:10.019Z',
            updatedAt: '2024-12-03T06:35:10.019Z',
            id: 159,
            qq_account: ['2853323137'],
            member_years: '7',
            phones: ['0755-83953235 杨先生'],
            mobiles: '13828717163',
            faxes: '',
            location: '深圳市',
            addresses: '深圳市福田区华强北路1002号赛格广场22楼2202AB',
            company_tag: ['icon_hcjg', 'sscp'],
            company_name: '深圳华创仕达电子有限公司',
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-12-03T06:47:20.355Z',
          updatedAt: '2024-12-03T06:47:20.373Z',
          supplier_id: 162,
          quiry_material_id: 64,
          price: null,
          id: 21,
          store_status: null,
          chat_messages: [
            {
              speakerRole: 'ai',
              content: 'SGM2203-3.3YK3G/TR SGMICRO 100只*0.3含税',
            },
          ],
          inquiry_status: '1',
          createdById: 1,
          updatedById: 1,
          has_adopt: '0',
          has_tax_included: 'false',
          remark: null,
          supplier: {
            createdAt: '2024-12-03T06:35:10.038Z',
            updatedAt: '2024-12-03T06:35:10.038Z',
            id: 162,
            qq_account: ['3004240616'],
            member_years: '1',
            phones: ['0755-82788369 林小姐'],
            mobiles: '13923770977',
            faxes: '',
            location: '深圳市',
            addresses: '深圳市福田区华强北街道华航社区深南中路3006号佳和华强大厦3层3C251',
            company_tag: ['sscp'],
            company_name: '盛林微（深圳）电子有限公司',
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
      ],
    },
    {
      createdAt: '2024-12-03T06:31:53.574Z',
      updatedAt: '2024-12-03T06:35:56.767Z',
      id: 65,
      material_code: 'LD1117S33CTR',
      inquiry_material_status: '2',
      createdById: 1,
      updatedById: 1,
      inquiry_record_id: 56,
      gather_error: null,
      unit: null,
      manufacturer: 'ST',
      quantity: 1000,
      suppliers: [
        {
          createdAt: '2024-12-03T06:34:50.289Z',
          updatedAt: '2024-12-03T06:34:50.289Z',
          id: 154,
          qq_account: ['800803666', '85814245'],
          member_years: '14',
          phones: ['0755-82807525 杨小姐'],
          mobiles: '19866050955',
          faxes: '0755-83953773',
          location: '深圳市  现代之窗',
          addresses: '深圳市福田区华强北路1058号现代之窗A座1188',
          company_tag: ['iccp', 'icon_hckc'],
          company_name: '深圳市四方联达科技有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:35:57.014Z',
            updatedAt: '2024-12-03T06:35:57.014Z',
            inquiry_material_id: 65,
            supplier_name: '深圳市四方联达科技有限公司',
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
            createdAt: '2024-12-03T06:35:57.005Z',
            updatedAt: '2024-12-03T06:35:57.005Z',
            inquiry_material_id: 65,
            supplier_name: '深圳市安玛科技有限公司',
          },
        },
        {
          createdAt: '2024-12-03T06:35:56.927Z',
          updatedAt: '2024-12-03T06:35:56.927Z',
          id: 163,
          qq_account: ['800033588'],
          member_years: '21',
          phones: ['0755-83685222 连先生', '0755-82709166 张小姐', '0755-82709099 欧阳小姐'],
          mobiles: '13823696501',
          faxes: '',
          location: '深圳市  新亚洲电子城二期',
          addresses: '深圳市福田区华强北路国利大厦B座5楼 | 福田区新亚洲电子商城二期N1C368A房间',
          company_tag: ['iccp'],
          company_name: '深圳市英特翎电子有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:35:56.947Z',
            updatedAt: '2024-12-03T06:35:56.947Z',
            inquiry_material_id: 65,
            supplier_name: '深圳市英特翎电子有限公司',
          },
        },
        {
          createdAt: '2024-12-03T06:35:56.931Z',
          updatedAt: '2024-12-03T06:35:56.931Z',
          id: 164,
          qq_account: ['2355759926', '2355759916'],
          member_years: '16',
          phones: ['0755-82811666 张小姐'],
          mobiles: '18825554538',
          faxes: '0755-83677488',
          location: '深圳市',
          addresses: '深圳市福田区深南中路3031号汉国中心大厦41楼4102-4106',
          company_tag: ['iccp'],
          company_name: '深圳市中盛大恒科技有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:35:56.951Z',
            updatedAt: '2024-12-03T06:35:56.951Z',
            inquiry_material_id: 65,
            supplier_name: '深圳市中盛大恒科技有限公司',
          },
        },
        {
          createdAt: '2024-12-03T06:35:56.944Z',
          updatedAt: '2024-12-03T06:35:56.944Z',
          id: 165,
          qq_account: ['2851656532', '800009605'],
          member_years: '18',
          phones: ['0755-82814185 钟先生', '0755-82814195 钟小姐', '0755-83993709 李先生'],
          mobiles: '13332979803',
          faxes: '0755-83993709',
          location: '深圳市  华强广场',
          addresses: '深圳市福田区华强北路1019号华强广场A座8D',
          company_tag: ['iccp'],
          company_name: '深圳市腾飞展业科技有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:35:56.961Z',
            updatedAt: '2024-12-03T06:35:56.961Z',
            inquiry_material_id: 65,
            supplier_name: '深圳市腾飞展业科技有限公司',
          },
        },
      ],
      supplier_inquiry_records: [
        {
          createdAt: '2024-12-03T06:48:28.493Z',
          updatedAt: '2024-12-03T06:48:50.951Z',
          supplier_id: 164,
          quiry_material_id: 65,
          price: 4.3,
          id: 22,
          store_status: '不满足',
          chat_messages: [
            {
              speakerRole: 'ai',
              content: 'LD1117S33CTR ST/意法 1000个',
            },
            {
              speakerRole: 'human',
              content: '4.3 这个暂时没有现货哦',
            },
          ],
          inquiry_status: '2',
          createdById: 1,
          updatedById: 1,
          has_adopt: '0',
          has_tax_included: 'false',
          remark: null,
          supplier: {
            createdAt: '2024-12-03T06:35:56.931Z',
            updatedAt: '2024-12-03T06:35:56.931Z',
            id: 164,
            qq_account: ['2355759926', '2355759916'],
            member_years: '16',
            phones: ['0755-82811666 张小姐'],
            mobiles: '18825554538',
            faxes: '0755-83677488',
            location: '深圳市',
            addresses: '深圳市福田区深南中路3031号汉国中心大厦41楼4102-4106',
            company_tag: ['iccp'],
            company_name: '深圳市中盛大恒科技有限公司',
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
        {
          createdAt: '2024-12-03T06:48:50.959Z',
          updatedAt: '2024-12-03T06:48:50.977Z',
          supplier_id: 163,
          quiry_material_id: 65,
          price: null,
          id: 23,
          store_status: null,
          chat_messages: null,
          inquiry_status: '0',
          createdById: 1,
          updatedById: 1,
          has_adopt: '0',
          has_tax_included: 'false',
          remark: null,
          supplier: {
            createdAt: '2024-12-03T06:35:56.927Z',
            updatedAt: '2024-12-03T06:35:56.927Z',
            id: 163,
            qq_account: ['800033588'],
            member_years: '21',
            phones: ['0755-83685222 连先生', '0755-82709166 张小姐', '0755-82709099 欧阳小姐'],
            mobiles: '13823696501',
            faxes: '',
            location: '深圳市  新亚洲电子城二期',
            addresses: '深圳市福田区华强北路国利大厦B座5楼 | 福田区新亚洲电子商城二期N1C368A房间',
            company_tag: ['iccp'],
            company_name: '深圳市英特翎电子有限公司',
            company_ids: ['4'],
            createdById: 5,
            updatedById: 5,
          },
        },
      ],
    },
    {
      createdAt: '2024-12-03T06:31:53.584Z',
      updatedAt: '2024-12-03T06:36:27.066Z',
      id: 66,
      material_code: 'BAV74LT1G',
      inquiry_material_status: '2',
      createdById: 1,
      updatedById: 1,
      inquiry_record_id: 56,
      gather_error: null,
      unit: null,
      manufacturer: 'ON Semiconductor',
      quantity: 4000,
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
            createdAt: '2024-12-03T06:36:27.423Z',
            updatedAt: '2024-12-03T06:36:27.423Z',
            inquiry_material_id: 66,
            supplier_name: '圣禾堂（深圳）电子科技有限公司',
          },
        },
        {
          createdAt: '2024-11-20T11:51:27.092Z',
          updatedAt: '2024-12-03T06:36:27.398Z',
          id: 94,
          qq_account: ['800858235'],
          member_years: '19',
          phones: ['0755-82730390 彭先生'],
          mobiles: '13699220731',
          faxes: '0755-82730390',
          location: '深圳市  华强广场',
          addresses: '深圳市福田区华强北华强广场一楼外围H1F009（麦当劳往步行街方向50米处）',
          company_tag: ['iccp'],
          company_name: '深圳明嘉瑞科技有限公司',
          company_ids: ['1', '2', '4'],
          createdById: null,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:36:27.416Z',
            updatedAt: '2024-12-03T06:36:27.416Z',
            inquiry_material_id: 66,
            supplier_name: '深圳明嘉瑞科技有限公司',
          },
        },
        {
          createdAt: '2024-12-03T06:34:50.322Z',
          updatedAt: '2024-12-03T06:34:50.322Z',
          id: 157,
          qq_account: ['3003532706'],
          member_years: '9',
          phones: ['0755-83524748 谢小姐'],
          mobiles: '13410213481',
          faxes: '',
          location: '深圳市',
          addresses: '深圳市福田区深南中路3006号佳和大厦A座一楼1C063-1C066房间',
          company_tag: ['iccp'],
          company_name: '深圳市凯新达科技有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:36:27.416Z',
            updatedAt: '2024-12-03T06:36:27.416Z',
            inquiry_material_id: 66,
            supplier_name: '深圳市凯新达科技有限公司',
          },
        },
        {
          createdAt: '2024-12-03T06:36:27.387Z',
          updatedAt: '2024-12-03T06:36:27.387Z',
          id: 166,
          qq_account: ['2851927397', '2851840398'],
          member_years: '21',
          phones: ['0755-88607789 吴小姐', '0755-83290199 周小姐', '0755-83031108 林先生'],
          mobiles: '15920083008',
          faxes: '0755-83031108',
          location: '深圳市',
          addresses: '深圳市福田区深南中路世纪汇(交通银行大厦)29层2901A',
          company_tag: ['iccp', 'icon_hckc'],
          company_name: '深圳市讯捷微科技有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:36:27.406Z',
            updatedAt: '2024-12-03T06:36:27.406Z',
            inquiry_material_id: 66,
            supplier_name: '深圳市讯捷微科技有限公司',
          },
        },
        {
          createdAt: '2024-12-03T06:36:27.393Z',
          updatedAt: '2024-12-03T06:36:27.393Z',
          id: 167,
          qq_account: ['800180928', '2355795741'],
          member_years: '6',
          phones: ['0755-82811525 周小姐', '19128451749 蒋斯勤', '18128820175 龙帆', '18128821167 罗贤方'],
          mobiles: '18128821167',
          faxes: '',
          location: '深圳市',
          addresses: '深圳市龙岗区布吉街道长龙社区铁西路9号壹都汇大厦1栋2001',
          company_tag: ['iccp', 'icon_hckc'],
          company_name: '深圳南电森美电子有限公司',
          company_ids: ['4'],
          createdById: 5,
          updatedById: 5,
          inquiry_materials_suppliers: {
            createdAt: '2024-12-03T06:36:27.410Z',
            updatedAt: '2024-12-03T06:36:27.410Z',
            inquiry_material_id: 66,
            supplier_name: '深圳南电森美电子有限公司',
          },
        },
      ],
      supplier_inquiry_records: [
        {
          createdAt: '2024-12-03T06:49:23.704Z',
          updatedAt: '2024-12-03T06:49:23.720Z',
          supplier_id: 94,
          quiry_material_id: 66,
          price: null,
          id: 24,
          store_status: null,
          chat_messages: [
            {
              speakerRole: 'ai',
              content: ' BAV74LT1G 4000 onsemi(安森美)',
            },
          ],
          inquiry_status: '1',
          createdById: 1,
          updatedById: 1,
          has_adopt: '0',
          has_tax_included: 'false',
          remark: null,
          supplier: {
            createdAt: '2024-11-20T11:51:27.092Z',
            updatedAt: '2024-12-03T06:36:27.398Z',
            id: 94,
            qq_account: ['800858235'],
            member_years: '19',
            phones: ['0755-82730390 彭先生'],
            mobiles: '13699220731',
            faxes: '0755-82730390',
            location: '深圳市  华强广场',
            addresses: '深圳市福田区华强北华强广场一楼外围H1F009（麦当劳往步行街方向50米处）',
            company_tag: ['iccp'],
            company_name: '深圳明嘉瑞科技有限公司',
            company_ids: ['1', '2', '4'],
            createdById: null,
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
