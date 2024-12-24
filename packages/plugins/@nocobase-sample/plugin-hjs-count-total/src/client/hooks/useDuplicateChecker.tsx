/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { useCallback } from 'react';
import { notification } from 'antd';
import { findDuplicates } from '../utils';
import React from 'react';

export const useDuplicateChecker = () => {
  const [notificationApi, notificationContextHolder] = notification.useNotification();

  const checkForDuplicates = useCallback(
    (data) => {
      const { code, result } = findDuplicates(data);
      if (code === 500) {
        notificationApi.warning({
          message: '物料型号重复',
          description: (
            <>
              {result.map((item) => (
                <p key={item}>{item}</p>
              ))}
              <p style={{ color: '#ff4d4f', fontWeight: 700 }}>请删除或修改重复物料！</p>
            </>
          ),
          placement: 'topRight',
          style: {
            width: 500,
          },
        });
        return false;
      }
      return true;
    },
    [notificationApi],
  );

  return {
    checkForDuplicates,
    notificationContextHolder,
  };
};
