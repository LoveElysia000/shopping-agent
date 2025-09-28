import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Typography, Spin, Alert, Image, Descriptions } from 'antd'
import { ArrowLeftOutlined, ShoppingOutlined } from '@ant-design/icons'
import { getProductDetail } from '../api/productApi'
import { Product } from '../types'

const { Title, Text, Paragraph } = Typography

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => getProductDetail(id!),
    enabled: !!id,
  })

  if (error) {
    return (
      <div className="container-lg py-8">
        <Alert
          message="获取产品详情失败"
          description="请稍后重试或检查网络连接"
          type="error"
          showIcon
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-lg py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
            className="mb-4"
          >
            返回
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <Spin size="large" />
            <div className="mt-4">
              <Text>正在加载产品详情...</Text>
            </div>
          </div>
        ) : product ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Image and Basic Info */}
            <Card className="shadow-sm">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-contain mb-4"
                fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlNWU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzk5OSI+5Zu+54mH5Zu+5YOPPC90ZXh0Pjwvc3ZnPg=="
              />
              
              <Title level={2} className="mb-2">{product.name}</Title>
              <div className="flex items-center justify-between mb-4">
                <Text strong className="text-2xl text-red-600">
                  ¥{product.price}
                </Text>
                <div className="flex items-center space-x-2">
                  <Text className="text-yellow-600">⭐ {product.rating}</Text>
                  <Text type="secondary">({product.reviewCount} 评价)</Text>
                </div>
              </div>

              <Button 
                type="primary" 
                icon={<ShoppingOutlined />} 
                size="large"
                className="w-full"
                onClick={() => window.open(product.purchaseUrl, '_blank')}
              >
                前往购买
              </Button>
            </Card>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Specifications */}
              <Card title="规格参数" className="shadow-sm">
                <Descriptions column={1} bordered size="small">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <Descriptions.Item key={key} label={key}>
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </Card>

              {/* AI Analysis */}
              <Card title="产品评价" className="shadow-sm">
                <Paragraph>
                  该产品在同类产品中表现优秀，具有较高的性价比。
                  {product.rating >= 4.5 && ' 用户评价非常高，是值得推荐的选择。'}
                </Paragraph>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProductDetailPage