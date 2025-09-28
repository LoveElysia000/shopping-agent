from fastapi import APIRouter, HTTPException
from typing import Optional
from app.services.recommendation_engine import RecommendationEngine

router = APIRouter()

@router.get("/products")
async def search_products(
    q: Optional[str] = None,
    category: Optional[str] = None,
    budget: Optional[float] = None
):
    """搜索产品"""
    try:
        engine = RecommendationEngine()
        products = await engine.search_products(q, category, budget)
        return {"products": products}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"搜索失败: {str(e)}")

@router.get("/products/{product_id}")
async def get_product_detail(product_id: str):
    """获取产品详情"""
    try:
        engine = RecommendationEngine()
        products = await engine.search_products()
        product = next((p for p in products if p.id == product_id), None)
        
        if not product:
            raise HTTPException(status_code=404, detail="产品不存在")
        
        return {"product": product}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取产品详情失败: {str(e)}")