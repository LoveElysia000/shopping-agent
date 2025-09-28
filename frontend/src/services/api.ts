import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface RecommendationRequest {
  product_type: string
  budget: [number, number]
  keywords?: string
  requirements?: string[]
}

export interface Product {
  id: string
  name: string
  price: number
  specs: Record<string, string>
  rating: number
  review_count: number
  image_url: string
  purchase_url: string
}

export interface RecommendationResponse {
  top3_recommendations: Product[]
  comparison_table: Record<string, any>
  ai_analysis: string
  budget_advice: string
}

export const recommendationApi = {
  async getRecommendations(data: RecommendationRequest): Promise<RecommendationResponse> {
    const response = await api.post('/api/v1/recommendations', data)
    return response.data
  },

  async searchProducts(query: string, category?: string, budget?: number) {
    const params = new URLSearchParams()
    params.append('q', query)
    if (category) params.append('category', category)
    if (budget) params.append('budget', budget.toString())
    
    const response = await api.get(`/api/v1/products?${params.toString()}`)
    return response.data
  },

  async getProductDetail(id: string) {
    const response = await api.get(`/api/v1/products/${id}`)
    return response.data
  },

  async submitFeedback(recommendationId: string, helpful: boolean, feedback: string) {
    const response = await api.post('/api/v1/feedback', {
      recommendation_id: recommendationId,
      helpful,
      feedback,
    })
    return response.data
  },
}

export default api