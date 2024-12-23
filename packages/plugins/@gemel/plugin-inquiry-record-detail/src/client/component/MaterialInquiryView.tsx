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
import SupplierInquiryRecordTable from './SupplierInquiryRecordTable';
import { Tabs, Tag, Space, Typography } from 'antd';
import { inquiryRecordMaterialMap } from '../utils/inquiryRecordSatatus';

const MaterialInquiryView: FC = () => {
  const { inquiryMaterialsData } = useInquiryRecord();
  if (!inquiryMaterialsData) return null;

  const joinSupplierName = (suppliers: any[]) => {
    return suppliers.map((supplier: any) => supplier.company_name).join(' 、 ');
  };

  return (
    <div style={{ marginTop: 16 }}>
      <Tabs type="card">
        {inquiryMaterialsData.map((material: any) => (
          <Tabs.TabPane key={material.material_code} tab={material.material_code}>
            <Space size={14} wrap style={{ padding: '0 20px' }}>
              <Space>
                <Typography.Text type="secondary">状态:</Typography.Text>
                <Tag color={inquiryRecordMaterialMap(material.inquiry_material_status)?.color}>
                  {inquiryRecordMaterialMap(material.inquiry_material_status)?.label}
                </Tag>
              </Space>
              {material.gather_error && (
                <Space>
                  <Typography.Text type="secondary">采集失败原因:</Typography.Text>
                  <Typography.Text>{material.gather_error}</Typography.Text>
                </Space>
              )}
              <Space>
                <Typography.Text type="secondary">需求数量:</Typography.Text>
                <Typography.Text>{material.quantity}</Typography.Text>
              </Space>
              <Space>
                <Typography.Text type="secondary">需求品牌:</Typography.Text>
                <Typography.Text>{material.manufacturer}</Typography.Text>
              </Space>
            </Space>

            <SupplierInquiryRecordTable
              dataSource={material.supplier_inquiry_records}
              tabKey={material.material_code}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default MaterialInquiryView;
