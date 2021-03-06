import React from 'react';
import {Select} from 'antd';
/**
 * 下拉菜单元件
 */
export default ({form, name, dict, formFieldOptions = {}, record, initialValue, rules, onChange, ...otherProps}) => {
  const { getFieldDecorator } = form;

  // 如果存在初始值
  if (record && record[name] || initialValue) {
    formFieldOptions.initialValue = record && record[name] || initialValue;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof otherProps.onChange === "function") {
    formFieldOptions.onChange = value => otherProps.onChange(form, value); // form, value
  }

  return getFieldDecorator(name, formFieldOptions)(
    <Select {...otherProps}>
      {
        dict.map((dic, i) =>
          <Select.Option key={dic.code} value={dic.code} title={dic.codeName}>{dic.codeName}</Select.Option>
        )
      }
    </Select>
  );
};