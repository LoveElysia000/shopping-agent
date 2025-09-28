from fastapi import APIRouter, HTTPException
from typing import Optional
from app.models.product import Product
from app.services.recommendation_engine import RecommendationEngine

router = APIRouter()

@router.get("/")
async def search_products(
    q: Optional[str] = None,
    category: Optional[str] = None,
    budget: Optional[str] = None
):
    """
    搜索产品接口
    """
    try:
        engine = RecommendationEngine()
        products = await engine.search_products(q, category, budget)
        return {"products": products}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"搜索失败: {str(e)}")