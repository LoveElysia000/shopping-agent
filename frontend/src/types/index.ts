export interface Product {
  id: string;
  name: string;
  price: number;
  specs: Record<string, any>;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  purchaseUrl: string;
  category: string;
  brand: string;
  releaseDate?: string;
}

export interface ProductSearchParams {
  q?: string;
  category?: string;
  budgetMin?: number;
  budgetMax?: number;
  requirements?: string[];
}

export interface RecommendationRequest {
  productType: string;
  budget: [number, number];
  keywords?: string;
  requirements: string[];
}

export interface RecommendationResponse {
  top3Recommendations: Product[];
  comparisonTable: Record<string, any>;
  aiAnalysis: string;
  budgetAdvice: string;
}

export interface SearchFormData {
  productType: string;
  budget: [number, number];
  keywords: string;
  requirements: string[];
}

export type ProductType = 'phone' | 'laptop' | 'tablet' | 'accessory';

export const PRODUCT_TYPES = [
  { value: 'phone', label: '手机' },
  { value: 'laptop', label: '笔记本' },
  { value: 'tablet', label: '平板' },
  { value: 'accessory', label: '配件' },
] as const;

export const REQUIREMENT_TAGS = [
  '高性能', '轻薄便携', '长续航', '性价比高', '游戏性能',
  '办公学习', '影像拍摄', '创作设计', '学生适用', '商务办公'
] as const;