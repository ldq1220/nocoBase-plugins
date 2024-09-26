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

const LookPropertyContainer: FC<Props> = ({ typeValue, open }) => {
  const [attributeList, setAttributeList] = useState([]);
  const [viewLoading, setLoading] = useState(false);
  const { id, parentId } = typeValue;
  const typeId = setTypeId(id); // 类型ID
  const { api, headers, language } = Config;

  return (
    <>
      {viewLoading ? (
        <ViewSpin></ViewSpin>
      ) : (
        <>
          <div>Look</div>
        </>
      )}
    </>
  );
};

export default LookPropertyContainer;
