/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useState, useEffect } from 'react';
import { List, Flex, Space, Button, message } from 'antd';
import { useForm } from '@formily/react';
import axios from 'axios';
import { OpenApiUrl } from '../constants';
import { CompanyDetails, CompanyDetailsResult } from './type';
import './style.css';

/**
 * @param tableData 表格数据
 * @returns
 */
export const CompanyList = ({ tableData, apiKey, onClearList }) => {
  const form = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const SaveBind = (record: CompanyDetails) => {
    const fields: any = form.fields || {};

    for (const key in fields) {
      const name = fields[key].props.name;
      if (name) {
        switch (name) {
          case 'company_name':
            fields[key].value = record?.Name || '';
            break;
          case 'legal':
            fields[key].value = record?.OperName || '';
            break;
          case 's_date':
            console.log('fields[key]', fields[key]);
            if (record?.TermStart != '') {
              fields[key].setValue(new Date(record.TermStart || ''.replace(' ', 'T') + 'Z').toISOString());
            } else {
              fields[key].setValue(null);
            }
            break;
          case 'e_date':
            if (record?.TermEnd != '') {
              fields[key].setValue(new Date(record.TermEnd || ''.replace(' ', 'T') + 'Z').toISOString());
            } else {
              fields[key].setValue(null);
            }
            break;
          case 'regist_status':
            // 检测record.Status 字符串中是否存在（）,如果存在则去掉
            if (record?.Status && record.Status.includes('（')) {
              record.Status = record.Status.split('（')[0].trim();
            }
            fields[key].value = record?.Status || '';
            break;
          case 'social_credit_code':
            fields[key].value = record?.CreditCode || '';
            break;
          case 'regist_capi':
            fields[key].value = record?.RegistCapi || '';
            break;
          case 'type':
            fields[key].value = record?.EconKind || '';
            break;
          case 'address':
            fields[key].value = record?.Address || '';
            break;
          case 'scope':
            fields[key].value = record?.Scope || '';
            break;
        }
      }
    }
    // 清空列表
    onClearList();
  };

  const onClickItem = async (companyName: string) => {
    setLoading(true);
    try {
      const { data: res } = await axios.get<
        any,
        {
          data: CompanyDetailsResult;
        }
      >(`${OpenApiUrl}/api/company/basic-details`, {
        params: {
          keyword: companyName,
        },
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });
      if (res.code === '00000') {
        SaveBind(res.result);
      }
    } catch (err) {
      messageApi.error('请求公司详情失败，请重试。');
    }
    setLoading(false);
  };

  return (
    <>
      {contextHolder}
      <List
        size="large"
        bordered
        loading={loading}
        dataSource={tableData}
        renderItem={(item) => (
          <List.Item className={'hover-box'} onClick={() => onClickItem(item as string)}>
            <div style={{ width: '100%' }}>{item}</div>
          </List.Item>
        )}
      />
    </>
  );
};
