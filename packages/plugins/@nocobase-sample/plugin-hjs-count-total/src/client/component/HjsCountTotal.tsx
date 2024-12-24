/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { observer } from '@formily/react';
import { Button, message } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useForm } from '@formily/react';
import { FieldComponentName } from '../constants';
import NP from 'number-precision';
import axios from 'axios';

export interface HjsCountTotalProps {
  totalField: string;
  materialField: string;
  customerField: string;
}

export const HjsCountTotal: FC<HjsCountTotalProps> = observer(
  ({ totalField, materialField, customerField }) => {
    const form = useForm();
    const [messageApi, messageContextHolder] = message.useMessage();
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);

    const materialData = form.values[materialField] || []; // 物料数据
    const materialTypeData = materialData.map((item: { type: any }) => item.type).filter((item) => item); // 物料型号数据
    const customerInfo = form.values[customerField]; // 所属客户名称

    const handleCheckMaterial = async () => {
      if (!customerInfo) return messageApi.warning('请添加所属客户。');
      if (materialTypeData.length === 0) return messageApi.warning('请添加物料。');

      try {
        setLoading(true);
        const checkMaterialText = materialTypeData.join(' \n ');
        const { data } = await axios({
          url: 'https://tk04dul26h.gzg.sealos.run/hjs/getMaterialMain',
          method: 'POST',
          data: {
            logicFlowAppId: 1164,
            userInput: checkMaterialText,
            companyName: customerInfo.company_name,
            type: 'text',
            autoBill: false,
          },
        });

        const { finalInventoryData, priceData } = data;
        const finalInventoryCodeData = finalInventoryData
          .map((item: { code: any }) => item.code)
          .filter((item: any) => item);

        materialData.forEach((materialItem: { type: string; price: number; inventory: number }) => {
          materialItem.inventory = finalInventoryCodeData.includes(materialItem.type)
            ? finalInventoryData.find((item: { code: string }) => item.code.includes(materialItem.type))?.qty || 0
            : 0;

          materialItem.price = priceData.length
            ? priceData.find((item: { code: string }) => item.code.includes(materialItem.type))?.price || null
            : null;
        });

        priceData.length === 0
          ? messageApi.warning(
              `所属客户：${customerInfo.company_name} 单价异常，请核对客户信息重新查料或手动输入单价。`,
            )
          : message.success('查料成功,请核对物料信息。');
      } finally {
        setLoading(false);
      }
    };

    const handleCountTotal = () => {
      let total = 0;
      materialData.forEach((item: { price: string | number; quantity: string | number }) => {
        if (item.price && item.quantity) total = NP.plus(total, NP.times(item.price, item.quantity));
      });
      form.values[totalField] = total;
    };

    useEffect(() => {
      if (!customerInfo) return;
      if (isMounted) {
        handleCountTotal();
      } else {
        setIsMounted(true);
      }
    }, [...materialData.map((item) => item.price), ...materialData.map((item) => item.quantity)]);

    useEffect(() => {
      if (!customerInfo) return;
      if (isMounted) {
        message.warning('所属客户已更改，请重新查料。');
        materialData.forEach((item) => (item.price = null));
      } else {
        setIsMounted(true);
      }
    }, [customerInfo]);

    return (
      <div>
        {messageContextHolder}
        <Button
          type="primary"
          loading={loading}
          icon={<SearchOutlined />}
          style={{ transform: 'translateY(6px)' }}
          onClick={handleCheckMaterial}
        >
          一键查料
        </Button>
      </div>
    );
  },
  { displayName: FieldComponentName },
);
