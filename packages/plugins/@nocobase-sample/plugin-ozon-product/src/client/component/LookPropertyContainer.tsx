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
import { Flex, Empty, Typography } from 'antd';
import { useForm } from '@formily/react';
import { getAttributeValueOptions } from '../api';
import ViewSpin from './ViewSpin';
import ViewError from './ViewError';
import PropertyFormList from './PropertyFormList';

interface Props {
  typeValue: any;
  primaryProperty: string;
  open: boolean;
  onClose: () => void;
}

const LookPropertyContainer: FC<Props> = ({ typeValue, primaryProperty, open, onClose }) => {
  const form = useForm();

  const [attributeList, setAttributeList] = useState([]);
  const [apiError, setApiError] = useState(true);
  const [viewLoading, setLoading] = useState(false);
  const propertyFormRef = useRef(null);

  const { ozon_id, ozon_parent_id } = typeValue ?? { ozon_id: undefined, ozon_parent_id: undefined };
  const typeId = setTypeId(ozon_id); // 类型ID
  const jsonData = form.values[primaryProperty];

  // 获取类别特征列表
  const getAttributeList = async () => {
    setLoading(true);
    setApiError(false);
    try {
      let attributeList: any = [];
      if (jsonData) {
        // 如果已经存在了json数据则直接拿json数据来渲染。
        attributeList = await getAttributeValueOptions(jsonData, ozon_parent_id, typeId);
        setAttributeList(attributeList);
      }
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

  if (!jsonData)
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
        description={<Typography.Text>暂无配置基础属性。</Typography.Text>}
      ></Empty>
    );
  if (apiError) return <ViewError getAttributeList={getAttributeList}></ViewError>;

  return (
    <>
      {viewLoading ? (
        <ViewSpin></ViewSpin>
      ) : (
        <Flex vertical={true} style={{ height: '100%', width: '100%' }}>
          <Flex style={{ flex: 1, overflow: 'auto', width: '100%' }}>
            <PropertyFormList
              attributeList={attributeList}
              disabled={true}
              onAttributeListChange={onAttributeListChange}
              ref={propertyFormRef}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default LookPropertyContainer;
