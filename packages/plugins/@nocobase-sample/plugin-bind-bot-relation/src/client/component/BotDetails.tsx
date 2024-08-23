/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer } from '@formily/react';
import { Spin, Empty, Typography } from 'antd';
import React, { FC } from 'react';
import { useForm } from '@formily/react';
import { FieldComponentName } from '../constants';
import { useRequest } from '@nocobase/client';
import { TableView } from './TableView';
import axios from 'axios';

export interface BotDetailsProps {
  BotField?: string;
}

export const BotDetails: FC<BotDetailsProps> = observer(
  ({ BotField }) => {
    const form = useForm();
    const value = BotField ? form.values[BotField] : undefined;
    if (!BotField) return <div style={{ padding: 20 }}>请选择绑定字段</div>;

    let xAppApiKey = null;
    let associationId = null;
    const baseUrl = 'http://192.168.11.124:4000/api/';
    const associationUrl = '/association:get/';
    // const baseUrl = 'https://api.gemelai.com/api/';
    // const associationUrl = '/business_association:get/';

    // 查个人信息 获取所属协会id
    const { data } = useRequest<{ data: any }>({ url: '/auth:check' });
    associationId = data?.data.f_business_association_id || data?.data.f_belong_association_id;
    // 查商会表 获取该协会信息
    const { data: associationData } = useRequest<{ data: any }>(
      { url: associationUrl + associationId },
      {
        ready: !!associationId, // 只有在 associationId 有值时才触发请求
      },
    );
    xAppApiKey = associationData?.data['api-key'] || associationData?.data['api_key'];

    localStorage.setItem(
      'PLUGIN-BIND-BOT-RELATION',
      JSON.stringify({
        baseUrl,
        associationUrl,
        xAppApiKey,
      }),
    );

    // 根据apikey 查企业大脑对应的绑定关系
    const {
      data: groupData,
      loading: groupLoading,
      error,
    } = useRequest<{ data: any; error: any }>(
      () =>
        axios.post(
          `${baseUrl}open/bot/bind-groups`,
          {
            keyword: value,
            limit: 2,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-app-api-key': xAppApiKey,
            },
          },
        ),
      {
        ready: !!value && !!xAppApiKey,
        refreshDeps: [BotField, value],
        debounceWait: 300,
      },
    );
    const { data: friendData, loading: friendLoading } = useRequest<{ data: any }>(
      () =>
        axios.post(
          `${baseUrl}open/bot/bind-friends`,
          {
            keyword: value,
            limit: 2,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-app-api-key': xAppApiKey,
            },
          },
        ),
      {
        ready: !!value && !!xAppApiKey,
        refreshDeps: [BotField, value],
        debounceWait: 300,
      },
    );
    const Error: any = error;

    if (Error || !xAppApiKey) {
      return !value ? (
        <Empty description="暂无数据" />
      ) : !xAppApiKey ? (
        <Empty description="API秘钥缺失，请完善信息。" />
      ) : (
        <Empty description={<Typography.Text>{Error?.response?.data?.message}</Typography.Text>} />
      );
    }

    if (groupLoading || friendLoading) {
      return (
        <div style={{ textAlign: 'center', height: 200 }}>
          <Spin />
        </div>
      );
    }

    const groupDataResult = groupData ? groupData.data?.result : [];
    const friendDataResult = friendData ? friendData.data?.result : [];
    if (groupDataResult.length === 0 && friendDataResult.length === 0) return <Empty description="暂无数据" />;

    return <TableView data={[...groupDataResult, ...friendDataResult]} />;
  },
  { displayName: FieldComponentName },
);
