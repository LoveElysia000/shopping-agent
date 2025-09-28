import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Typography, Spin, Alert } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { SearchFormData, RecommendationResponse } from '../types'
import { getRecommendations } from '../api/recommendationApi'
import ProductCard from '../components/ProductCard'

const { Title, Text } = Typography

const RecommendationPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = location.state?.searchParams as SearchFormData

  const { data, isLoading, error } = useQuery<RecommendationResponse>({
    queryKey: ['recommendations', searchParams],
    queryFn: () => getRecommendations(searchParams),
    enabled: !!searchParams,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  if (!searchParams) {
    return (
      <div className="container-lg py-8">
        <Alert
          message="请先进行搜索"
          description="您需要先填写搜索条件才能查看推荐结果"
          type="warning"
          showIcon
          action={
            <Button type="primary" onClick={() => navigate('/')}>
              返回首页
            </Button>
          }
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-lg py-8">
        <Alert
          message="获取推荐失败"
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
            onClick={() => navigate('/')}
            className="mb-4"
          >
            返回搜索
          </Button>
          <Title level={2}>推荐结果</Title>
          <Text type="secondary">
            基于您的需求：{searchParams.productType} 
            | 预算：¥{searchParams.budget[0]}-{searchParams.budget[1]}
          </Text>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <Spin size="large" />
            <div className="mt-4">
              <Text>AI正在为您分析产品并生成推荐...</Text>
            </div>
          </div>
        ) : data ? (
          <div className="space-y-8">
            {/* Top Recommendations */}
            <Card title="热门推荐" className="shadow-sm">
              <div className="grid md:grid-cols-3 gap-6">
                {data.top3Recommendations.map((product, index) => (
                  <ProductCard key={product.id} product={product} rank={index + 1} />
                ))}
              </div>
            </Card>

            {/* AI Analysis */}
            <Card title="AI分析报告" className="shadow-sm">
              <div className="prose max-w-none">
                <p>{data.aiAnalysis}</p>
              </div>
            </Card>

            {/* Budget Advice */}
            <Card title="预算建议" className="shadow-sm">
              <div className="prose max-w-none">
                <p>{data.budgetAdvice}</p>
              </div>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default RecommendationPage