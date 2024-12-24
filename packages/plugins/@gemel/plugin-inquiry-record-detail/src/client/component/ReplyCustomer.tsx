/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC, useState, useEffect, useRef } from 'react';
import { Input, Button, Modal, Flex, message } from 'antd';
import { useInquiryRecord } from '../context/InquiryRecordContext';
import { useAPIClient } from '@nocobase/client';
import { updateInquiryRecord, updateSupplierInquiryRecord, updateInquiryMaterial, sendReply } from '../config/api';

const { TextArea } = Input;

const ReplyCustomer: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { inquiryRecordData, inquiryMaterialsData, selectedRecords, setSelectedRecord, setReplayLoading } =
    useInquiryRecord();
  const [replyContent, setReplyContent] = useState('');
  const initialized = useRef(false);

  // 仅在组件首次挂载时,自动选中上次采用的参考数据
  useEffect(() => {
    if (inquiryMaterialsData && !initialized.current) {
      inquiryMaterialsData.forEach((material) => {
        material.supplier_inquiry_records?.forEach((record) => {
          if (record.has_adopt == '1') setSelectedRecord(String(material.material_code), record);
        });
      });
      initialized.current = true;
    }

    if (inquiryRecordData && inquiryRecordData.reply_text) setReplyContent(inquiryRecordData.reply_text);
  }, [inquiryMaterialsData, setSelectedRecord, inquiryRecordData]);

  // 生成回复文案
  const handleGenerateContent = () => {
    if (Object.keys(selectedRecords).length <= 0) return messageApi.error('请先选择参考数据');

    const content = Object.entries(selectedRecords)
      .map(([tabKey, record]) => {
        return `物料: ${tabKey} -- 价格: ${record.price || '暂无'} 库存状况: ${record.store_status || '暂无'}`;
      })
      .join('\n');

    setReplyContent((prev) => (prev ? `${prev}\n\n${content}` : content));
    messageApi.success('回复文案已生成，请检查关键信息。');
  };

  // 回复客户
  /***
   * 1. 将当前询料记录(/inquiry_records:update)
   *        询料状态 设置为 已回复 (inquiry_status = '4')
   *        回复文案 设置为 回复内容 reply_text = replyContent
   * 2. 将当前询料记录下所有的 询料物料（/inquiry_materials:update） 状态设置为 已回复 (inquiry_status = '4')
   * 3. 将当前选中的 供应商询料记录（/supplier_inquiry_records:update） 是否采用 设置为采用 (has_adopt = '1') 剩余的设置为（has_adopt = '0'）
   * 4. 调用机器人 发送回复内容
   */
  const api = useAPIClient();
  const handleReply = async () => {
    if (replyContent.trim() === '') return messageApi.error('回复内容不能为空');
    Modal.confirm({
      title: '确认回复',
      content: '确定要发送这条回复吗？',
      onOk: () => {
        try {
          setReplayLoading(true);

          const inquiryRecordId = inquiryRecordData.id;
          const currentSelectRecordIds = Object.values(selectedRecords).map((record) => record.id);

          // 1. 更新询料记录状态
          updateInquiryRecord(
            api,
            { id: inquiryRecordId, inquiry_status: '4', reply_text: replyContent },
            { filterByTk: inquiryRecordId },
          );

          // 2. 更新询料物料状态
          for (const material of inquiryMaterialsData) {
            updateInquiryMaterial(api, { id: material.id, inquiry_material_status: '5' }, { filterByTk: material.id });
          }

          // 3. 更新供应商询料记录
          for (const material of inquiryMaterialsData) {
            if (!material.supplier_inquiry_records) continue;
            for (const supplierRecord of material.supplier_inquiry_records) {
              updateSupplierInquiryRecord(
                api,
                {
                  id: supplierRecord.id,
                  has_adopt: currentSelectRecordIds.includes(supplierRecord.id) ? '1' : '0',
                },
                {
                  filterByTk: supplierRecord.id,
                },
              );
            }
          }

          // 4. 调用机器人发送回复内容
          sendReply(replyContent, inquiryRecordData);

          setTimeout(() => {
            setReplayLoading(false);
            messageApi.success('回复消息已发送，请手动刷新CRM数据，查看最新询料状态！');
          }, 1000);
        } catch (error) {
          console.error('回复失败:', error);
          messageApi.error('操作失败');
        }
      },
    });
  };

  return (
    <Flex vertical gap="middle" style={{ padding: '16px' }}>
      {contextHolder}
      <TextArea
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="请输入回复内容..."
        rows={6}
      />
      <Flex justify="flex-end" gap="20px">
        <Button type="default" onClick={handleGenerateContent}>
          生成文案
        </Button>
        <Button type="primary" onClick={handleReply}>
          回复客户
        </Button>
      </Flex>
    </Flex>
  );
};

export default ReplyCustomer;
