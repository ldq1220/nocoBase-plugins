import { observer } from '@formily/react';
import { Spin, Button, message } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useForm, useFieldSchema } from '@formily/react';
import { FieldComponentName } from '../constants';
import { useRequest, useCollection } from '@nocobase/client';
import axios from 'axios';

export interface HjsCheckMaterialsProps {
  material?: string;
}

export const HjsCheckMaterials: FC<HjsCheckMaterialsProps> = observer(
  ({ material }) => {
    const form = useForm();
    const schema = useFieldSchema();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const customerId = 'customer_id'; // 当前客户表字段
    const currentFormCustomer = form.values[customerId] ? form.values[customerId].customerName : ''; // 当前表单的客户名称
    const materialDetailName = schema.parent.parent.parent.name; // 当前表单 物料表格字段 order_detail_id

    // 获取当前行的索引
    const getCurrentRowIndex = (e) => {
      const buttonElement = e.currentTarget; // 获取按钮的 DOM 元素
      const trElement = buttonElement.closest('tr'); // 获取最近的 <tr> 父元素
      const tableElement = trElement.closest('table'); // 获取最近的 <table> 父元素
      const allTrElements = tableElement.querySelectorAll('tr'); // 获取所有 <tr> 元素
      const dataRowKeys = Array.from(allTrElements)
        .map((tr: any) => tr.getAttribute('data-row-key'))
        .filter((key) => key); // 获取所有 <tr> 的 data-row-key 属性
      const currentRowKey = trElement.getAttribute('data-row-key'); // 获取当前 <tr> 的 data-row-key
      const rowIndex = dataRowKeys.indexOf(currentRowKey); // 找到当前 button 存在数据中的索引
      return rowIndex;
    };

    // 查料
    const handleCheckMaterial = async (e) => {
      const rowIndex = getCurrentRowIndex(e); // 获取当前行的索引
      const rowMaterial = form.values[materialDetailName][rowIndex][material]; // 当前行的物料编码

      console.log('form.values----', form.values);
      console.log('form----', form);
      console.log('materialDetailName----', materialDetailName, material);

      if (!currentFormCustomer) return messageApi.warning('请先选择客户');
      if (!rowMaterial) return messageApi.warning('请先选择关联物料');

      setLoading(true);
      try {
        const res = await axios({
          url: 'https://tk04dul26h.gzg.sealos.run/hjs/getMaterialMain',
          method: 'POST',
          data: {
            logicFlowAppId: 1164,
            userInput: rowMaterial.type,
            companyName: currentFormCustomer,
            type: 'text',
            autoBill: false,
          },
        });

        let currentMaterialQty = null;
        let currentMaterialPrice = null;

        const { finalInventoryData, priceData } = res.data;
        const hasQty = finalInventoryData && finalInventoryData[0];
        const hasPrice = priceData && priceData[0];
        hasQty
          ? (currentMaterialQty = finalInventoryData[0].qty)
          : message.warning(`物料：${rowMaterial.type}，暂无可用库存。`);

        hasPrice
          ? (currentMaterialPrice = priceData[0].price)
          : message.warning(`物料：${rowMaterial.type}，暂无单价。`);

        form.values[materialDetailName][rowIndex].price = currentMaterialPrice;
        form.values[materialDetailName][rowIndex].quantity = currentMaterialQty;
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (isMounted) {
        form.values[materialDetailName].forEach((item) => {
          item.price = null;
          item.quantity = null;
        });
      } else {
        setIsMounted(true);
      }
    }, [currentFormCustomer]);

    return (
      <>
        {contextHolder}
        <Button
          type="primary"
          loading={loading}
          onClick={handleCheckMaterial}
          style={{ display: 'flex', margin: '0 auto' }}
        >
          查料
        </Button>
      </>
    );
  },
  { displayName: FieldComponentName },
);
