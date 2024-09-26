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
import ViewSpin from './ViewSpin';
import axios from 'axios';

interface Props {
  typeValue: any;
  open: boolean;
}

const UpdatePropertyContainer: FC<Props> = ({ typeValue, open }) => {
  const [attributeList, setAttributeList] = useState([]);
  const [viewLoading, setLoading] = useState(false);
  const { id, parentId } = typeValue;
  const typeId = setTypeId(id); // 类型ID
  const { api, headers, language } = Config;

  // 获取类别特征列表
  const getAttributeList = async () => {
    setLoading(true);

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

      const updatedAttributeList = await Promise.all(
        data.result.map(async (item: any) => {
          const { dictionary_id } = item;
          if (dictionary_id) {
            const options = await getAttributeOpeitons(item);
            return { ...item, property_value: '', options };
          }
          return item;
        }),
      );

      // 将 is_required 为 true 的项排在前面
      const sortedAttributeList = updatedAttributeList.sort((a: any, b: any) => {
        if (a.is_required && !b.is_required) return -1;
        if (!a.is_required && b.is_required) return 1;
        return 0;
      });

      console.log('sortedAttributeList----', sortedAttributeList);

      setAttributeList(sortedAttributeList);
    } catch (error) {
      console.error('获取属性列表时出错:', error);
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
        id: item.id,
        value: item.value,
      };
    });
  };

  useEffect(() => {
    if (open) getAttributeList();
  }, [open]);

  return (
    <>
      {viewLoading ? (
        <ViewSpin></ViewSpin>
      ) : (
        <>
          <code>
            <pre>{JSON.stringify(typeValue, null, 2)}</pre>
          </code>
          <code>
            <pre>{JSON.stringify(attributeList, null, 2)}</pre>
          </code>
        </>
      )}
    </>
  );
};

export default UpdatePropertyContainer;
