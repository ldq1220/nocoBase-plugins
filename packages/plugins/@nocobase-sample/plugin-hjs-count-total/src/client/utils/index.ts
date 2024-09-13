/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

export const findDuplicates = (arr: string | any[]) => {
  const result = []; // 存储重复项及其索引位置
  const visited = new Set(); // 用于避免重复输出

  for (let i = 0; i < arr.length; i++) {
    const positions = [i + 1]; // 记录当前项的位置 (1 基索引)

    for (let j = 0; j < arr.length; j++) {
      // 如果 i 和 j 项不相同，并且存在包含关系
      if (i !== j && (arr[j].includes(arr[i]) || arr[i].includes(arr[j]))) {
        positions.push(j + 1); // 将 j 项的位置也加入
      }
    }

    // 只有当有重复项，且当前项还未被记录时，才加入结果
    const uniquePositions = [...new Set(positions)];
    if (uniquePositions.length > 1) {
      const key = uniquePositions.sort((a, b) => a - b).join('-'); // 按顺序存储键值
      if (!visited.has(key)) {
        result.push(`第 ${uniquePositions.join(' ')} 行物料：${arr[i]} 重复出现`);
        visited.add(key);
      }
    }
  }

  return result.length > 0 ? { code: 500, result } : { code: 200, result: ['没有重复项'] };
};
