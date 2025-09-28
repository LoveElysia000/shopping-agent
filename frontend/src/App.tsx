import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import HomePage from './pages/HomePage'
import RecommendationPage from './pages/RecommendationPage'
import ProductDetailPage from './pages/ProductDetailPage'
import './index.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3b82f6',
            borderRadius: 6,
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recommendations" element={<RecommendationPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App