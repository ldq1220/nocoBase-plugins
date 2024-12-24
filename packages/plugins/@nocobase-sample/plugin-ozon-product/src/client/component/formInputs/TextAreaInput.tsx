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

const { TextArea } = Input;

interface TextAreaInputProps {
  disabled: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ disabled, value, onChange }) => (
  <TextArea
    placeholder={disabled ? '' : '请填写'}
    allowClear
    autoSize={{ minRows: 3, maxRows: 14 }}
    value={value}
    onChange={onChange}
  />
);

export default TextAreaInput;
