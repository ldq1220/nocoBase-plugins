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
import { Tabs } from 'antd';

const MaterialInquiryView: FC = () => {
  const { inquiryMaterialsData } = useInquiryRecord();
  console.log('inquiryMaterialsData', inquiryMaterialsData);

  if (!inquiryMaterialsData) return null;

  return (
    <div style={{ marginTop: 16 }}>
      <Tabs type="card">
        {inquiryMaterialsData.map((material, index) => (
          <Tabs.TabPane key={material.material_code} tab={material.material_code}>
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
