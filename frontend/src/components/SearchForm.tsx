import React, { useState } from 'react'
import { Form, Input, Select, Slider, Button, Card, Tag, Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { SearchFormData, PRODUCT_TYPES, REQUIREMENT_TAGS } from '../types'

const { Option } = Select
const { TextArea } = Input

interface SearchFormProps {
  onSubmit: (data: SearchFormData) => void
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm()
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([])
  const [budgetRange, setBudgetRange] = useState<[number, number]>([2000, 8000])

  const handleRequirementToggle = (requirement: string) => {
    setSelectedRequirements(prev =>
      prev.includes(requirement)
        ? prev.filter(r => r !== requirement)
        : [...prev, requirement]
    )
  }

  const handleSubmit = (values: any) => {
    const formData: SearchFormData = {
      productType: values.productType,
      budget: budgetRange,
      keywords: values.keywords || '',
      requirements: selectedRequirements,
    }
    onSubmit(formData)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="w-full"
    >
      <Row gutter={[16, 16]}>
        {/* 产品类型 */}
        <Col xs={24} md={8}>
          <Form.Item
            label="产品类型"
            name="productType"
            rules={[{ required: true, message: '请选择产品类型' }]}
          >
            <Select placeholder="请选择产品类型">
              {PRODUCT_TYPES.map(type => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* 预算范围 */}
        <Col xs={24} md={16}>
          <Form.Item label={`预算范围: ¥${budgetRange[0].toLocaleString()} - ¥${budgetRange[1].toLocaleString()}`}>
            <Slider
              range
              min={1000}
              max={20000}
              step={500}
              value={budgetRange}
              onChange={(value: [number, number]) => setBudgetRange(value)}
              tipFormatter={value => `¥${value?.toLocaleString()}`}
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>¥1,000</span>
              <span>¥20,000</span>
            </div>
          </Form.Item>
        </Col>

        {/* 关键词搜索 */}
        <Col xs={24}>
          <Form.Item label="关键词搜索" name="keywords">
            <TextArea
              placeholder="输入您关注的产品特性，如：轻薄、高性能、长续航等"
              rows={2}
            />
          </Form.Item>
        </Col>

        {/* 需求标签 */}
        <Col xs={24}>
          <Form.Item label="需求标签">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {REQUIREMENT_TAGS.map(tag => (
                  <Tag.CheckableTag
                    key={tag}
                    checked={selectedRequirements.includes(tag)}
                    onChange={() => handleRequirementToggle(tag)}
                    className="cursor-pointer px-3 py-1 border rounded-md"
                  >
                    {tag}
                  </Tag.CheckableTag>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                已选择：{selectedRequirements.length} 个标签
              </div>
            </div>
          </Form.Item>
        </Col>

        {/* 提交按钮 */}
        <Col xs={24}>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SearchOutlined />}
              size="large"
              className="w-full"
            >
              开始推荐
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchForm