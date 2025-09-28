import React from 'react'
import { Card, Row, Col } from 'antd'
import ProductCard from './ProductCard'
import { Product } from '../types'

interface PopularProductsProps {
  products: Product[]
}

const PopularProducts: React.FC<PopularProductsProps> = ({ products }) => {
  return (
    <Card title="热门产品推荐" style={{ marginTop: '20px' }}>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default PopularProducts