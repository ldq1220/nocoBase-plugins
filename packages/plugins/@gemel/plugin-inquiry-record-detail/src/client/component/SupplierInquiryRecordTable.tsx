/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC, useState } from 'react';
import { useInquiryRecord } from '../context/InquiryRecordContext';
import { Table, Tag, Divider } from 'antd';
import { supplierInquiryRecordStatusMap } from '../utils';
import type { TableProps } from 'antd';
import ReplyCustomer from './ReplyCustomer';

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
  const columns = [
    {
      title: '供应商',
      render: (_, record) => {
        return <span>{record.supplier.company_name}</span>;
      },
    },
    {
      title: '询问状态',
      render: (_, record) => {
        const tag = supplierInquiryRecordStatusMap(record.inquiry_status);
        return <Tag color={tag.color}>{tag.label}</Tag>;
      },
    },
    {
      title: '价格',
      render: (_, record) => {
        return <span>{record.price}</span>;
      },
    },
    {
      title: '库存状况',
      render: (_, record) => {
        return <span>{record.store_status}</span>;
      },
    },
    {
      title: '聊天记录',
      render: (_, record) => {
        return <span>{JSON.stringify(record.chat_messages)}</span>;
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
      <Divider>回复客户</Divider>
      <ReplyCustomer />
    </div>
  );
};

export default SupplierInquiryRecordTable;
