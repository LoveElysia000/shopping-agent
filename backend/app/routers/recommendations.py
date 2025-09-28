from fastapi import APIRouter, HTTPException
from app.models.product import RecommendationRequest, RecommendationResponse
from app.services.intent_parser import IntentParser
from app.services.data_collector import DataCollector
from app.services.recommendation_engine import RecommendationEngine

router = APIRouter()

@router.post("/recommendations", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    """获取产品推荐"""
    try:
        # 1. 解析用户意图
        parser = IntentParser()
        # 将结构化请求转换为自然语言解析
        user_input = f"我想要购买{request.product_type}，预算{request.budget[0]}到{request.budget[1]}元"
        if request.keywords:
            user_input += f"，关键词：{request.keywords}"
        if request.requirements:
            user_input += f"，需求：{', '.join(request.requirements)}"
            
        intent = parser.parse_user_input(user_input)
        
        # 2. 采集产品数据
        collector = DataCollector()
        products = await collector.collect_product_info(intent)
        
        # 3. 生成推荐
        engine = RecommendationEngine()
        recommendation = await engine.generate_recommendation(intent, products)
        
        return RecommendationResponse(**recommendation)
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"推荐生成失败: {str(e)}"
        )