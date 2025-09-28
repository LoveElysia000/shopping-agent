import React from 'react'
import { Card, Typography, Button } from 'antd'
import { Product } from '../types'
import ProductCard from './ProductCard'

const { Title, Paragraph } = Typography

interface TopRecommendationsProps {
  products: Product[]
}

const TopRecommendations: React.FC<TopRecommendationsProps> = ({ products }) => {
  return (
    <div className="mb-8">
      <Title level={2} className="mb-6 text-center">
        🏆 推荐产品
      </Title>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div key={product.id} className="relative">
            {index === 0 && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-bold">
                🥇 最佳推荐
              </div>
            )}
            {index === 1 && (
              <div className="absolute top-2 left-2 bg-gray-500 text-white px-2 py-1 rounded text-sm font-bold">
                🥈 次选推荐
              </div>
            )}
            {index === 2 && (
              <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold">
                🥉 备选推荐
              </div>
            )}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopRecommendations