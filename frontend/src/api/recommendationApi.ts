import axios from 'axios'
import { SearchFormData, RecommendationResponse } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getRecommendations = async (formData: SearchFormData): Promise<RecommendationResponse> => {
  const payload = {
    product_type: formData.productType,
    budget: formData.budget,
    keywords: formData.keywords,
    requirements: formData.requirements,
  }

  const response = await api.post('/api/v1/recommendations', payload)
  return response.data
}

export const searchProducts = async (query: string, category?: string, budget?: number) => {
  const params = new URLSearchParams()
  params.append('q', query)
  if (category) params.append('category', category)
  if (budget) params.append('budget', budget.toString())
  
  const response = await api.get(`/api/v1/products?${params.toString()}`)
  return response.data.products
}

export const getProductDetail = async (id: string) => {
  const response = await api.get(`/api/v1/products/${id}`)
  return response.data.product
}

export const submitFeedback = async (recommendationId: string, helpful: boolean, feedback?: string) => {
  const response = await api.post('/api/v1/feedback', {
    recommendation_id: recommendationId,
    helpful,
    feedback,
  })
  return response.data
}