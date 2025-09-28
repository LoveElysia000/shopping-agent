import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Card, Typography } from 'antd'
import SearchForm from '../components/SearchForm'
import { SearchFormData } from '../types'

const { Title, Paragraph } = Typography

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleSearch = async (formData: SearchFormData) => {
    await queryClient.invalidateQueries({ queryKey: ['recommendations'] })
    navigate('/recommendations', { state: { searchParams: formData } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container-lg py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Title level={1} className="mb-4 text-4xl font-bold text-gray-900">
            AI智能购物推荐助手
          </Title>
          <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
            基于人工智能技术，为您提供专业、客观的数码产品购买建议。
            输入您的需求，马上获得个性化的产品推荐！
          </Paragraph>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <SearchForm onSubmit={handleSearch} />
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <div className="text-blue-600 text-3xl mb-4">🔍</div>
            <Title level={3}>智能分析</Title>
            <Paragraph>
              基于AI技术分析产品性能、价格趋势和用户评价
            </Paragraph>
          </Card>
          
          <Card className="text-center">
            <div className="text-green-600 text-3xl mb-4">⚡</div>
            <Title level={3}>快速推荐</Title>
            <Paragraph>
              整合多平台数据，快速为您选出最适合的产品
            </Paragraph>
          </Card>
          
          <Card className="text-center">
            <div className="text-purple-600 text-3xl mb-4">💰</div>
            <Title level={3}>预算优化</Title>
            <Paragraph>
              根据您的预算范围，推荐最具性价比的选择
            </Paragraph>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HomePage