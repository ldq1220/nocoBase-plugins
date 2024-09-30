/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import axios from 'axios';
import { Config } from '../constants';

const { api, headers, language } = Config;

// 获取类别特征列表
/**
 *
 * @param typeId 商品类型ID
 * @param description_category_id 类别ID。
 * @param language 语言
 * @returns
 */
export const reqAttributeList = async (typeId: number, parentId: number) => {
  const { data } = await axios({
    url: api.attribute,
    method: 'POST',
    headers: headers,
    data: {
      type_id: typeId,
      language: language.ZH,
      description_category_id: parentId,
    },
  });

  return data;
};

// 获取特征值指南
/**
 *
 * @param attribute_id 特征ID
 * @param description_category_id 类别ID
 * @param language 语言
 * @param type_id 商品类型ID
 * @param last_value_id 启动响应的指南 ID。 如果last_value_id为 10，则响应将包含从第十一个开始的指南。
 * @param limit 响应中值的数量：
 * @returns
 */
export const reqAttributeValueList = async (attribute_id: number, parentId: number, typeId: number) => {
  const { data } = await axios({
    url: api.values,
    method: 'POST',
    headers: headers,
    data: {
      attribute_id: attribute_id,
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
