/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { useMemo, useImperativeHandle, forwardRef } from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import { debounce } from 'lodash';

interface Props {
  ref: any;
  attributeList: any[];
  disabled?: boolean;
  onAttributeListChange: (newList: any[]) => void;
}

const PropertyFormList: React.FC<Props> = forwardRef(({ attributeList, disabled, onAttributeListChange }, ref) => {
  const [form] = Form.useForm();

  const debouncedOnValuesChange = useMemo(
    () =>
      debounce((changedValues, allValues) => {
        const updatedList = attributeList.map((item) => {
          const newValue = allValues.attributes?.[item.id]?.property_value;

          if (newValue !== undefined) {
            return { ...item, property_value: newValue };
          }
          return item;
        });

        onAttributeListChange(updatedList);
      }, 300),
    [attributeList, onAttributeListChange],
  );

  // 暴露验证方法给父组件
  useImperativeHandle(ref, () => ({
    validateFields: () => form.validateFields(),
  }));

  return (
    <Form
      form={form}
      name="propertyForm"
      layout="vertical"
      onValuesChange={debouncedOnValuesChange}
      autoComplete="off"
      style={{ width: '98%' }}
      disabled={disabled}
    >
      <Form.List name="attributes">
        {() =>
          attributeList.map((item) => (
            <Row gutter={12} key={item.id}>
              <Col span={24}>
                <Form.Item
                  label={item.name}
                  name={[item.id, 'property_value']}
                  initialValue={item.property_value}
                  style={{ maxWidth: '100%' }}
                  rules={[
                    {
                      required: item.is_required,
                      message:
                        item.dictionary_id != null && item.dictionary_id > 0
                          ? `请选择【${item.name}】`
                          : `请填写【${item.name}】`,
                    },
                  ]}
                >
                  {item.dictionary_id != null && item.dictionary_id > 0 ? (
                    <Select
                      showSearch
                      placeholder={disabled ? '' : '请选择'}
                      optionFilterProp="label"
                      options={item.options}
                      style={{ maxWidth: '100%' }}
                      dropdownStyle={{ textOverflow: 'ellipsis', width: '100px' }}
                    />
                  ) : (
                    <Input placeholder={disabled ? '' : '请填写'} allowClear />
                  )}
                </Form.Item>
              </Col>
            </Row>
          ))
        }
      </Form.List>
    </Form>
  );
});

export default PropertyFormList;
