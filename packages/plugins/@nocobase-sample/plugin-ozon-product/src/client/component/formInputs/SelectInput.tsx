/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Select } from 'antd';

interface SelectInputProps {
  item: any;
  disabled: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ item, disabled, value, onChange }) => (
  <Select
    mode={item.is_collection ? 'multiple' : undefined}
    showSearch
    allowClear
    placeholder={disabled ? '' : '请选择'}
    optionFilterProp="label"
    options={item.options}
    style={{ maxWidth: '100%' }}
    dropdownStyle={{ textOverflow: 'ellipsis', width: '100px' }}
    value={value}
    onChange={onChange}
  />
);

export default SelectInput;
