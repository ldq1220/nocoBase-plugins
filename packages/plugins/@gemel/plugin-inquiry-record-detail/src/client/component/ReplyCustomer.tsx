/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC, useState, useEffect, useRef } from 'react';
import { Input, Button, Modal, Flex } from 'antd';
import { useInquiryRecord } from '../context/InquiryRecordContext';

const { TextArea } = Input;

const ReplyCustomer: FC = () => {
  const { inquiryMaterialsData, selectedRecords, setSelectedRecord } = useInquiryRecord();
  const [replyContent, setReplyContent] = useState('');
  const initialized = useRef(false);

  // 仅在组件首次挂载时,自动选中上次采用的参考数据
  useEffect(() => {
    if (inquiryMaterialsData && !initialized.current) {
      inquiryMaterialsData.forEach((material) => {
        material.supplier_inquiry_records?.forEach((record) => {
          if (record.has_adopt == '1') {
            setSelectedRecord(String(material.material_code), record);
          }
        });
      });
      initialized.current = true;
    }
  }, [inquiryMaterialsData]);

  // 根据选中记录生成回复内容
  useEffect(() => {
    const content = Object.entries(selectedRecords)
      .map(([tabKey, record]) => {
        return `物料: ${tabKey} -- 价格: ${record.price || '暂无'} 库存状况: ${record.store_status || '暂无'}`;
      })
      .join('\n');

    setReplyContent(content);
  }, [selectedRecords]);

  const handleReply = () => {
    Modal.confirm({
      title: '确认回复',
      content: '确定要发送这条回复吗？',
      onOk: () => {
        console.log('回复内容:', replyContent);
        console.log('选中记录:', selectedRecords);
      },
    });
  };

  return (
    <Flex vertical gap="middle" style={{ padding: '16px' }}>
      <TextArea
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="请输入回复内容..."
        rows={6}
      />
      <Flex justify="flex-end">
        <Button type="primary" onClick={handleReply}>
          回复客户
        </Button>
      </Flex>
    </Flex>
  );
};

export default ReplyCustomer;
