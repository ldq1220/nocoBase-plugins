/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC, useState, useEffect } from 'react';
import { Config } from '../constants';
import { setTypeId } from '../utils';
import { Flex, Result, Button } from 'antd';
import axios from 'axios';
import ViewSpin from './ViewSpin';
import PropertyFormList from './PropertyFormList';
import BottonGroup from './BottonGroup';

interface Props {
  typeValue: any;
  open: boolean;
}

const AddPropertyContainer: FC<Props> = ({ typeValue, open }) => {
  const [attributeList, setAttributeList] = useState([]);
  const [apiError, setApiError] = useState(true);

  const [viewLoading, setLoading] = useState(false);
  const { id, parentId } = typeValue;
  const typeId = setTypeId(id); // 类型ID
  const { api, headers, language } = Config;

  // 延迟
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // 获取类别特征列表
  const getAttributeList = async () => {
    setLoading(true);
    setApiError(false);
    try {
      const { data } = await axios({
        url: api.attribute,
        method: 'POST',
        headers: headers,
        data: {
          description_category_id: parentId,
          language: language.ZH,
          type_id: typeId,
        },
      });

      const attributeList = await Promise.all(
        data.result.map(async (item: any, index: number) => {
          const { dictionary_id } = item;

          if (dictionary_id) {
            // 添加 100ms 延迟，避免频繁调用接口
            await sleep(50 * index); // 每个请求的延迟是上一个请求的 50ms 之后
            const options = await getAttributeOpeitons(item);
            return { ...item, property_value: '', options };
          }

          return { ...item, property_value: '' };
        }),
      );

      // 将 is_required 为 true 的项排在前面
      const sortedAttributeList = attributeList.sort((a: any, b: any) => {
        if (a.is_required && !b.is_required) return -1;
        if (!a.is_required && b.is_required) return 1;
        return 0;
      });

      console.log('sortedAttributeList----', sortedAttributeList);
      setAttributeList(sortedAttributeList);
    } catch (error) {
      console.error('获取属性列表时出错:', error);
      setApiError(true);
    } finally {
      setLoading(false);
    }
  };

  // 获取特征值指南
  const getAttributeOpeitons = async (item: any) => {
    const { data } = await axios({
      url: api.values,
      method: 'POST',
      headers: headers,
      data: {
        attribute_id: item.id,
        description_category_id: parentId,
        language: language.ZH,
        type_id: typeId,
        last_value_id: 0,
        limit: 5000,
      },
    });

    return data.result.map((item: { id: any; value: any }) => {
      return {
        value: item.id,
        label: item.value,
      };
    });
  };

  const onAttributeListChange = (updatedList: any[]) => {
    setAttributeList(updatedList);
  };

  useEffect(() => {
    if (open) getAttributeList();
  }, [open]);

  if (apiError)
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button type="primary" color="danger" onClick={getAttributeList}>
            重试
          </Button>
        }
      />
    );

  return (
    <>
      {apiError ? (
        <Result
          status="500"
          title="500"
          subTitle="服务器发生了错误。"
          extra={
            <Button type="primary" color="danger" onClick={getAttributeList}>
              重试
            </Button>
          }
        />
      ) : viewLoading ? (
        <ViewSpin></ViewSpin>
      ) : (
        <Flex vertical={true} style={{ height: '100%', width: '100%' }}>
          <Flex style={{ flex: 1, overflow: 'auto', width: '100%' }}>
            <PropertyFormList attributeList={attributeList} onAttributeListChange={onAttributeListChange} />
          </Flex>
          <Flex align="end" style={{ height: '48px', width: '100%' }}>
            <BottonGroup attributeList={attributeList} />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default AddPropertyContainer;
