/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer } from '@formily/react';
import { message, Input, Empty } from 'antd';
import React, { FC, useState, useEffect, useRef } from 'react';
import { useForm } from '@formily/react';
import { FiledComponentName } from '../constants';
import { CompanyList } from './CompanyList';
import axios from 'axios';
import { OpenApiUrl } from '../constants';

export interface SearchDataItem {
  Name: string;
  HitReason: string;
}

type SearchData = {
  code: string;
  message: string;
  result: SearchDataItem[];
};

export const CompanyDetails: FC<{ ApiKey: string }> = observer(
  ({ ApiKey }) => {
    if (!ApiKey) return <div style={{ padding: 20 }}>API秘钥缺失，请完善信息。</div>;

    const form = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [searchResult, setSearchResult] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [curCompanyName, setCurCompanyName] = useState(''); // 当前搜索的公司名称
    const hasRun = useRef(false); // 防止重复运行
    const [searchLoading, setSearchLoading] = useState(false); // 搜索加载状态

    const onSearch = async (value: string) => {
      if (!value || value === '') return;
      // 根据apikey 查企业
      setSearchLoading(true);
      try {
        const { data } = await axios.get<any, { data: SearchData }>(`${OpenApiUrl}/api/copmany/name-search`, {
          params: {
            searchName: value,
          },
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ApiKey,
          },
        });
        if (data.code === '00000' && data.result.length > 0) {
          setSearchResult(data.result.map((v) => v.Name));
        }
      } catch (e) {
        console.error(e);
        messageApi.error('查询失败，请稍后重试。');
      }
      setIsShow(true);
      setSearchLoading(false);
    };

    const onSearchChange = (e: any) => {
      setCurCompanyName(e.target.value);
    };

    if (curCompanyName === '' && hasRun.current === false) {
      const fields: any = form.fields || {};
      for (const key in fields) {
        const name = fields[key].props.name;
        if (name) {
          switch (name) {
            case 'company_name':
              setCurCompanyName(fields[key].value);
              hasRun.current = true;
              break;
          }
        }
      }
    }

    const onClearList = () => {
      setSearchResult([]);
      setIsShow(false);
      messageApi.success('反写成功，请检查表单数据');
    };

    return (
      <>
        {contextHolder}
        <div>
          <div style={{ minHeight: 30, lineHeight: 1.5, paddingBottom: 8, fontSize: 14, fontWeight: 600 }}>
            公司名称查询
          </div>
          <Input.Search
            value={curCompanyName}
            name="search_company_name"
            placeholder="请输入公司名称"
            onSearch={onSearch}
            enterButton
            allowClear
            loading={searchLoading}
            onChange={onSearchChange}
          />
        </div>
        <div style={{ marginTop: 6 }}>
          {isShow ? (
            searchResult.length === 0 ? (
              <Empty description="暂无数据" />
            ) : (
              <CompanyList onClearList={onClearList} tableData={searchResult} apiKey={ApiKey}></CompanyList>
            )
          ) : (
            <div></div>
          )}
        </div>
      </>
    );
  },
  { displayName: FiledComponentName },
);
