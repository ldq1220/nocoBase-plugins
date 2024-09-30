/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC, useState, useEffect, useRef } from 'react';
import { setTypeId } from '../utils';
import { Flex, Button, message } from 'antd';
import { useForm } from '@formily/react';
import { reqAttributeList, getAttributeValueOptions } from '../api';
import ViewSpin from './ViewSpin';
import ViewError from './ViewError';
import PropertyFormList from './PropertyFormList';

interface Props {
  typeValue: any;
  primaryProperty: string;
  open: boolean;
  onClose: () => void;
}

const AddAndUpdatePropertyContainer: FC<Props> = ({ typeValue, primaryProperty, open, onClose }) => {
  const form = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [attributeList, setAttributeList] = useState([]);
  const [apiError, setApiError] = useState(true);
  const [viewLoading, setLoading] = useState(false);
  const propertyFormRef = useRef(null);

  const { id, parentId } = typeValue ?? { id: undefined, parentId: undefined };
  const typeId = setTypeId(id); // 类型ID

  // 获取类别特征列表
  const getAttributeList = async () => {
    setLoading(true);
    setApiError(false);
    try {
      const jsonData = form.values[primaryProperty];
      let attributeList: any = [];
      if (jsonData) {
        // 如果已经存在了json数据则直接拿json数据来渲染。
        attributeList = await getAttributeValueOptions(jsonData, parentId, typeId);
      } else {
        const data: any = await reqAttributeList(typeId, parentId);
        attributeList = await getAttributeValueOptions(data.result, parentId, typeId);
      }

      setAttributeList(attributeList);
    } catch (error) {
      console.log('error----', error);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  const onAttributeListChange = (updatedList: any[]) => {
    setAttributeList(updatedList);
  };

  useEffect(() => {
    if (open) getAttributeList();
  }, [open]);

  // 保存
  const handleSave = async () => {
    try {
      if (propertyFormRef.current) {
        await propertyFormRef.current.validateFields();
        // 验证通过
        messageApi.success('保存成功');
        const jsonData = attributeList.map((item) => {
          delete item.options;
          return item;
        });
        form.values[primaryProperty] = jsonData;
        onClose();
      }
    } catch (error) {
      messageApi.error('请填写所有必填字段');
    }
  };

  if (apiError) return <ViewError getAttributeList={getAttributeList}></ViewError>;

  return (
    <>
      {contextHolder}
      {viewLoading ? (
        <ViewSpin></ViewSpin>
      ) : (
        <Flex vertical={true} style={{ height: '100%', width: '100%' }}>
          <Flex style={{ flex: 1, overflow: 'auto', width: '100%' }}>
            <PropertyFormList
              attributeList={attributeList}
              onAttributeListChange={onAttributeListChange}
              ref={propertyFormRef}
            />
          </Flex>
          <Flex align="end" style={{ height: '48px', width: '100%' }}>
            <Button type="primary" onClick={handleSave}>
              保存
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default AddAndUpdatePropertyContainer;
