/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useState, useEffect } from 'react';
import { useCollection, useRequest } from '@nocobase/client';
import { Table, Avatar, Flex, Space, Button, message, Popconfirm } from 'antd';
import type { TableColumnsType } from 'antd';
import { filterCustomerSource } from '../utils';
import { ImIcon } from './ImIcon';
import { useForm } from '@formily/react';
import { FriendIcon, GroupIcon } from '../svg';
interface DataItem {
  key: React.Key;
  id: number;
  platform: string;
  bindId: string;
  botUserId: string;
  groupName?: string;
  avatarUrl?: string;
  nickName?: string;
  userId?: string;
  groupId?: string;
  remark: string;
}

/**
 *
 * @param data 表格数据
 * @param UnBindWorkFlowsKey 解绑工作流key
 * @param handleUnbind 解绑 触发数据重新请求
 * @returns
 */

export const TableView = ({ data, UnBindWorkFlowsKey, handleUnbind }) => {
  const form = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [customerBinId, setCustomerBindId] = useState(null);

  const { name } = useCollection(); // 当前数据表 名

  const columns: TableColumnsType<DataItem> = [
    {
      title: 'IM平台',
      dataIndex: 'platform',
      width: 120,
      render: (_, record) => {
        return (
          <Flex align="center" justify="center">
            <ImIcon im={record.platform} />
            <span style={{ marginLeft: '8px' }}>{filterCustomerSource(record.platform)}</span>
          </Flex>
        );
      },
      align: 'center',
    },
    {
      title: '群/好友名称',
      dataIndex: 'groupName',
      width: 150,
      render: (_, record) => {
        if (record.groupName) {
          return (
            <Flex justify="center" align="center">
              <GroupIcon />
              <span style={{ margin: '0 8px' }}>{record.groupName}</span>
            </Flex>
          );
        }
        if (record.nickName) {
          return (
            <Flex justify="center" align="center">
              <FriendIcon />
              {record.avatarUrl ? <Avatar src={record.avatarUrl} style={{ marginLeft: '8px' }} /> : <></>}
              <span style={{ margin: '0 8px' }}>{record.nickName}</span>
            </Flex>
          );
        }
      },
      align: 'center',
    },
    {
      title: '群/好友id',
      dataIndex: 'userId',
      width: 150,
      render: (_, record) => {
        if (record.groupId) {
          return <span>{record.groupId}</span>;
        }
        if (record.userId) {
          return <span>{record.userId}</span>;
        }
      },
      align: 'center',
    },
    {
      title: '备注',
      width: 150,
      dataIndex: 'remark',
      align: 'center',
    },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      align: 'center',
      render: (_, record) => (
        <Space>
          {!record.bindId ? (
            <Button type="primary" onClick={() => SaveBind(record)}>
              绑定
            </Button>
          ) : (
            <Popconfirm
              title="提示"
              description="您确定要解除该客户与机器人的绑定关系吗?"
              onConfirm={() => UnBind(record)}
              okText="确定"
              cancelText="取消"
              placement="topRight"
            >
              <Button danger disabled={!UnBindWorkFlowsKey}>
                解绑
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const SaveBind = (record: DataItem) => {
    const fields: any = form.fields || {};
    const { platform, groupId, userId, avatarUrl, groupName, nickName, remark, botUserId } = record;

    for (const key in fields) {
      const name = fields[key].props.name;
      if (name) {
        switch (name) {
          case 'imName':
            fields[key].value = groupName || nickName;
            break;
          case 'imPlatform':
            fields[key].value = platform;
            break;
          case 'imBotUserId':
            fields[key].value = botUserId;
            break;
          case 'imIsGroup':
            fields[key].value = groupName ? '群' : '好友';
            break;
          case 'imUserId':
            fields[key].value = groupId || userId;
            break;
          case 'imAvatarUrl':
            fields[key].value = avatarUrl;
            break;
          case 'imRemark':
            fields[key].value = remark;
            break;
        }
      }
    }

    messageApi.success(`绑定成功，请检查对应信息。`);
  };

  const UnBind = (record: DataItem) => {
    const { bindId } = record;
    if (!bindId) return;
    setCustomerBindId(bindId);
  };

  const { data: unBindData, loading } = useRequest<{ data: any }>(
    {
      url: `/${name}:update?filterByTk=${customerBinId}&triggerWorkflows=${UnBindWorkFlowsKey}`,
      method: 'POST',
    },
    {
      ready: !!customerBinId,
      refreshDeps: [customerBinId],
    },
  );

  useEffect(() => {
    // 当 unBindData 存在且请求不再处于加载状态时，调用 handleUnbind
    if (!loading && unBindData) {
      handleUnbind();
    }
  }, [loading, unBindData]);

  return (
    <>
      {contextHolder}
      <Table
        dataSource={data.map((item: any) => ({
          ...item,
          key: item.id,
        }))}
        columns={columns}
        bordered
        scroll={{ y: '260px' }}
        pagination={false}
        style={{ padding: '0 20px' }}
      />
    </>
  );
};
