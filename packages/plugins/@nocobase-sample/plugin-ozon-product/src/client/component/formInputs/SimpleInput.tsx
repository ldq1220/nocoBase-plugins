/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Input } from 'antd';

interface SimpleInputProps {
  disabled: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SimpleInput: React.FC<SimpleInputProps> = ({ disabled, value, onChange }) => (
  <Input placeholder={disabled ? '' : '请填写'} allowClear value={value} onChange={onChange} />
);

export default SimpleInput;
