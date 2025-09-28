import React from 'react'
import { Select } from 'antd'
import { ProductType } from '../types'

const { Option } = Select

interface ProductTypeSelectProps {
  value?: ProductType
  onChange?: (value: ProductType) => void
}

const productTypes: { value: ProductType; label: string }[] = [
  { value: 'phone', label: '手机' },
  { value: 'laptop', label: '笔记本' },
  { value: 'tablet', label: '平板' },
  { value: 'accessory', label: '配件' }
]

export const ProductTypeSelect: React.FC<ProductTypeSelectProps> = ({
  value,
  onChange
}) => {
  return (
    <Select
      placeholder="选择产品类型"
      value={value}
      onChange={onChange}
      style={{ width: 120 }}
    >
      {productTypes.map(type => (
        <Option key={type.value} value={type.value}>
          {type.label}
        </Option>
      ))}
    </Select>
  )
}