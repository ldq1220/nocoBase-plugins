/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Button, Flex } from 'antd';

interface Props {
  attributeList: any;
}

const BottonGroup = ({ attributeList }) => {
  const handleSave = () => {
    console.log('保存数据---attributeList', attributeList);
  };

  return (
    <Flex justify="center" style={{ width: '100%' }}>
      <Button type="primary" onClick={handleSave}>
        保存
      </Button>
    </Flex>
  );
};

export default BottonGroup;
