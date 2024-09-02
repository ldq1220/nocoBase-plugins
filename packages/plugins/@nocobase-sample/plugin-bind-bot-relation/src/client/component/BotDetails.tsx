/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Spin, Empty, Typography } from 'antd';
import React, { FC, useState } from 'react';
import { observer, useForm } from '@formily/react';
import { FieldComponentName } from '../constants';
import { useRequest } from '@nocobase/client';
import { TableView } from './TableView';
import { brainBaseUrl } from '../constants';
import axios from 'axios';

export interface BotDetailsProps {
  BotField: string;
  SearchScope: number;
  UnBindWorkFlowsKey: string;
}

// 查个人信息 获取所属协会信息
const useGetSxhApikey = () => {
  const associationUrl = '/business_association:get/'; // 商协会存放apikey的位置
  // const associationUrl = '/association:get/'; // 本地测试 存放apikey的位置

  let associationId = null;
  const { data } = useRequest<{ data: any }>({ url: '/auth:check' });
  associationId = data?.data.f_business_association_id || data?.data.f_belong_association_id;
  // 查商会表 获取该协会信息
  const { data: associationData } = useRequest<{ data: any }>(
    { url: associationUrl + associationId },
    {
      ready: !!associationId, // 只有在 associationId 有值时才触发请求
    },
  );
  const apiKey = associationData?.data['api-key'] || associationData?.data['api_key'];
  return { apiKey };
};

// 外综服
const useGetWzfApikey = () => {
  const associationUrl = '/sys_paras:get'; // 商协会存放apikey的位置
  const { data: associationData } = useRequest<{ data: any }>({ url: associationUrl });
  const apiKey = associationData?.data['api-key'] || associationData?.data['api_key'];
  return { apiKey };
};

export const BotDetails: FC<BotDetailsProps> = observer(
  ({ BotField, SearchScope, UnBindWorkFlowsKey }) => {
    const form = useForm();
    const value = BotField ? form.values[BotField] : undefined;
    const [unBindFlag, setUnBindFlag] = useState(true); // 解绑标记
    const handleUnbind = () => setUnBindFlag(!unBindFlag);
    if (!BotField) return <div style={{ padding: 20 }}>请选择绑定字段</div>;

    let xAppApiKey = null;
    const searchGroup = [1, 3].includes(SearchScope);
    const searchFriend = [2, 3].includes(SearchScope);

    const { apiKey } = useGetSxhApikey(); // 商协会 获取apiKey
    // const { apiKey } = useGetWzfApikey(); // 外综服 获取apiKey
    xAppApiKey = apiKey;

    // 根据apikey 查企业大脑对应的绑定关系
    const {
      data: groupData,
      loading: groupLoading,
      error: groupError,
    } = useRequest<{ data: any; error: any }>(
      () =>
        axios.post(
          `${brainBaseUrl}open/bot/bind-groups`,
          {
            keyword: value,
            limit: 3,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-app-api-key': xAppApiKey,
            },
          },
        ),
      {
        ready: !!value && !!xAppApiKey && searchGroup,
        refreshDeps: [BotField, value, unBindFlag],
        debounceWait: 300,
      },
    );
    const {
      data: friendData,
      loading: friendLoading,
      error: friendError,
    } = useRequest<{ data: any; error: any }>(
      () =>
        axios.post(
          `${brainBaseUrl}open/bot/bind-friends`,
          {
            keyword: value,
            limit: 3,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-app-api-key': xAppApiKey,
            },
          },
        ),
      {
        ready: !!value && !!xAppApiKey && searchFriend,
        refreshDeps: [BotField, value, unBindFlag],
        debounceWait: 300,
      },
    );
    const Error: any = groupError || friendError;

    if (!value) return <Empty description="暂无数据" />;
    if (!xAppApiKey) return <Empty description="API秘钥缺失，请完善信息。" />;
    if (Error) return <Empty description={<Typography.Text>{Error?.response?.data?.message}</Typography.Text>} />;

    if (groupLoading || friendLoading) {
      return (
        <div style={{ textAlign: 'center', height: 200 }}>
          <Spin />
        </div>
      );
    }

    const groupDataResult = groupData && searchGroup ? groupData.data?.result : [];
    const friendDataResult = friendData && searchFriend ? friendData.data?.result : [];
    if (groupDataResult.length === 0 && friendDataResult.length === 0) return <Empty description="暂无数据" />;

    return (
      <TableView
        data={[...groupDataResult, ...friendDataResult]}
        UnBindWorkFlowsKey={UnBindWorkFlowsKey}
        handleUnbind={handleUnbind}
      />
    );
  },
  { displayName: FieldComponentName },
);
