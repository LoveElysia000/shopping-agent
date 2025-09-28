import React from 'react'
import { Table, Typography } from 'antd'
import { Product } from '../types'

const { Title } = Typography

interface ComparisonTableProps {
  products: Product[]
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ products }) => {
  const columns = [
    {
      title: '产品名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Product) => (
        <div className="flex items-center">
          <img 
            src={record.imageUrl} 
            alt={record.name}
            className="w-12 h-12 object-cover rounded mr-3"
          />
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-sm text-gray-500">{record.brand}</div>
          </div>
        </div>
      ),
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toLocaleString()}`,
    },
    {
      title: '评分',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => `${rating}/5`,
    },
    {
      title: '评价数',
      dataIndex: 'reviewCount',
      key: 'reviewCount',
      render: (count: number) => count.toLocaleString(),
    },
    {
      title: '购买链接',
      key: 'purchase',
      render: (record: Product) => (
        <a 
          href={record.purchaseUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          查看详情
        </a>
      ),
    },
  ]

  return (
    <div className="mt-8">
      <Title level={3} className="mb-4">详细产品对比</Title>
      <Table 
        dataSource={products} 
        columns={columns} 
        rowKey="id"
        pagination={false}
        className="w-full"
      />
    </div>
  )
}

export default ComparisonTable