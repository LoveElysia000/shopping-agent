from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from datetime import datetime


class Product(BaseModel):
    """产品数据模型"""
    id: str = Field(..., description="产品唯一标识")
    name: str = Field(..., description="产品名称")
    price: float = Field(..., description="产品价格")
    specs: Dict[str, str] = Field(default_factory=dict, description="产品规格参数")
    rating: float = Field(default=0.0, ge=0.0, le=5.0, description="产品评分")
    review_count: int = Field(default=0, description="评价数量")
    image_url: str = Field(..., description="产品图片URL")
    purchase_url: str = Field(..., description="购买链接")
    category: str = Field(..., description="产品分类")
    brand: str = Field(..., description="品牌")
    release_date: Optional[str] = Field(None, description="发布日期")


class RecommendationRequest(BaseModel):
    """推荐请求模型"""
    product_type: str = Field(..., description="产品类型")
    budget: List[float] = Field(..., description="预算范围")
    keywords: Optional[str] = Field(None, description="关键词")
    requirements: Optional[List[str]] = Field(default_factory=list, description="需求标签")


class RecommendationResponse(BaseModel):
    """推荐响应模型"""
    top3_recommendations: List[Product] = Field(..., description="推荐产品列表")
    comparison_table: Dict[str, any] = Field(..., description="产品对比数据")
    ai_analysis: str = Field(..., description="AI分析报告")
    budget_advice: str = Field(..., description="预算建议")


class FeedbackRequest(BaseModel):
    """反馈请求模型"""
    recommendation_id: str = Field(..., description="推荐ID")
    helpful: bool = Field(..., description="是否帮助")
    feedback: Optional[str] = Field(None, description="具体反馈")


class SearchQuery(BaseModel):
    """搜索查询模型"""
    q: str = Field(..., description="搜索关键词")
    category: Optional[str] = Field(None, description="产品分类")
    budget: Optional[float] = Field(None, description="预算")
    limit: int = Field(default=20, le=100, description="返回数量限制")