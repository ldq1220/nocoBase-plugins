/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC } from 'react';
import { useInquiryRecord } from '../context/InquiryRecordContext';
import { Table, Tag, Popover } from 'antd';
import { supplierInquiryRecordStatusMap } from '../utils';
import type { TableProps } from 'antd';
import ChatMessages from './ChatMessage';
import ChatMessagesIcon from '../assets/svg/chatMessages';

const SupplierInquiryRecordTable: FC<{ dataSource: any[]; tabKey: string }> = ({ dataSource, tabKey }) => {
  const { loading, selectedRecords, setSelectedRecord } = useInquiryRecord();

  const rowSelection: TableProps<any>['rowSelection'] = {
    type: 'radio',
    selectedRowKeys: selectedRecords[tabKey] ? [selectedRecords[tabKey].id] : [],
    onChange: (_, selectedRows) => {
      setSelectedRecord(tabKey, selectedRows[0]);
    },
  };

  // 表格列配置
  const columns: any = [
    {
      title: '供应商',
      align: 'center',
      render: (_, record) => {
        return <span>{record.supplier.company_name}</span>;
      },
    },
    {
      title: '询问状态',
      align: 'center',
      render: (_, record) => {
        const tag = supplierInquiryRecordStatusMap(record.inquiry_status);
        return <Tag color={tag?.color}>{tag?.label}</Tag>;
      },
    },
    {
      title: '价格',
      align: 'center',
      render: (_, record) => {
        return <span>{record.price}</span>;
      },
    },
    {
      title: '是否含税',
      align: 'center',
      render: (_, record) => {
        return (
          <span>
            {record.has_tax_included === 'true' ? <Tag color="green">含税</Tag> : <Tag color="orange">未税</Tag>}
          </span>
        );
      },
    },
    {
      title: '是否采用',
      align: 'center',
      render: (_, record) => {
        return <span>{record.has_adopt === '1' ? <Tag color="purple">已采用</Tag> : <Tag>未采用</Tag>}</span>;
      },
    },
    {
      title: '库存状况',
      align: 'center',
      render: (_, record) => {
        return (
          <span>{record.store_status === '满足' ? <Tag color="green">满足</Tag> : <Tag color="red">不满足</Tag>}</span>
        );
      },
    },
    {
      title: '备注',
      align: 'center',
      render: (_, record) => {
        return <span>{record.remark}</span>;
      },
    },
    {
      title: '聊天记录',
      align: 'center',
      render: (_, record) => {
        return (
          <Popover content={<ChatMessages messages={record.chat_messages || []} />} trigger="hover" placement="left">
            <div style={{ cursor: 'pointer' }}>
              <ChatMessagesIcon />
            </div>
          </Popover>
        );
      },
    },
  ];

  return (
    <div style={{ marginTop: 16 }}>
      <Table
        dataSource={dataSource.map((item: any) => ({
          ...item,
          key: item.id,
        }))}
        rowSelection={{ type: 'radio', ...rowSelection }}
        columns={columns}
        pagination={false}
        loading={loading}
        scroll={{ y: 275 }}
      />
    </div>
  );
};

export default SupplierInquiryRecordTable;
