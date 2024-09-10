/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Spin, Empty, Typography } from 'antd';
import React, { FC, useState, useEffect } from 'react';
import { observer, useForm } from '@formily/react';
import { FieldComponentName } from '../constants';
import { useRequest, isVariable, useVariables, useLocalVariables } from '@nocobase/client';
import { TableView } from './TableView';
import { brainBaseUrl } from '../constants';
import axios from 'axios';

export interface BotDetailsProps {
  BotField: string;
  SearchScope: number;
  UnBindWorkFlowsKey: string;
  ApiKey: string;
}

export const BotDetails: FC<BotDetailsProps> = observer(
  ({ BotField, SearchScope, ApiKey, UnBindWorkFlowsKey }) => {
    const form = useForm();
    const value = BotField ? form.values[BotField] : undefined;
    const [unBindFlag, setUnBindFlag] = useState(true); // 解绑标记
    const [xAppApiKey, setXAppApiKey] = useState(null); // 用于存储异步获取的 API key
    const handleUnbind = () => setUnBindFlag(!unBindFlag);
    if (!BotField) return <div style={{ padding: 20 }}>请选择绑定字段</div>;

    const searchGroup = [1, 3].includes(SearchScope);
    const searchFriend = [2, 3].includes(SearchScope);
    const limit = SearchScope === 3 ? 3 : 6;

    const variables = useVariables();
    const localVariables = useLocalVariables();

    useEffect(() => {
      const fetchApiKey = async () => {
        if (isVariable(ApiKey)) {
          const result = await variables?.parseVariable(ApiKey, localVariables);
          setXAppApiKey(result.value);
        } else {
          setXAppApiKey(ApiKey);
        }
      };

      fetchApiKey();
    }, [ApiKey, variables, localVariables]);

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
            limit,
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
        refreshDeps: [BotField, value, unBindFlag, SearchScope],
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
            limit,
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
        refreshDeps: [BotField, value, unBindFlag, SearchScope],
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
