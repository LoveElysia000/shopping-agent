import { Product, ProductSearchParams } from '../types'
import { apiClient } from '../services/api'

export const productApi = {
  searchProducts: async (params: ProductSearchParams): Promise<Product[]> => {
    const response = await apiClient.get('/products', { params })
    return response.data
  },

  getProductById: async (id: string): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`)
    return response.data
  },

  getPopularProducts: async (category?: string): Promise<Product[]> => {
    const response = await apiClient.get('/products/popular', {
      params: { category }
    })
    return response.data
  }
}