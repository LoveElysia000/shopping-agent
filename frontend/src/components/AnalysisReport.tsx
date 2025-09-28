import React from 'react'
import { Card, Typography, Rate } from 'antd'

const { Title, Paragraph } = Typography

interface AnalysisReportProps {
  analysis: string
  budgetAdvice: string
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ 
  analysis, 
  budgetAdvice 
}) => {
  return (
    <div className="space-y-6">
      {/* AI分析报告 */}
      <Card>
        <Title level={3}>🤖 AI分析报告</Title>
        <div className="prose max-w-none">
          <Paragraph>
            {analysis}
          </Paragraph>
        </div>
      </Card>

      {/* 预算建议 */}
      <Card>
        <Title level={3}>💰 预算建议</Title>
        <div className="prose max-w-none">
          <Paragraph>
            {budgetAdvice}
          </Paragraph>
        </div>
      </Card>
    </div>
  )
}

export default AnalysisReport