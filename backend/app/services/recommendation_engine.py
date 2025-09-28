from typing import Dict, List, Optional
import asyncio
from app.models.product import Product, RecommendationRequest, RecommendationResponse

class RecommendationEngine:
    """推荐引擎核心类"""

    async def generate_recommendation(self, intent: Dict, products: List[Product]) -> Dict:
        """生成AI推荐结果"""
        # TODO: 实现AI分析逻辑
        return {
            "top3_recommendations": products[:3],
            "comparison_table": self._build_comparison_table(products[:3]),
            "ai_analysis": self._generate_ai_analysis(intent, products[:3]),
            "budget_advice": self._generate_budget_advice(intent, products)
        }

    def _build_comparison_table(self, products: List[Product]) -> Dict:
        """构建产品对比表格"""
        if not products:
            return {}
        
        comparison_data = {
            "products": [{
                "name": p.name,
                "price": p.price,
                "rating": p.rating,
                "key_specs": p.specs
            } for p in products]
        }
        
        return comparison_data

    def _generate_ai_analysis(self, intent: Dict, products: List[Product]) -> str:
        """生成AI分析报告"""
        if not products:
            return "未找到符合条件的产品"
        
        product_type = intent.get('product_type', '产品')
        requirements = intent.get('key_requirements', [])
        usage_scenario = intent.get('usage_scenario', '日常使用')
        
        analysis = f"根据您的需求(产品类型: {product_type}, 使用场景: {usage_scenario}, 关键需求: {', '.join(requirements)})，为您推荐以下{len(products)}款产品：\n\n"
        
        for i, product in enumerate(products[:3], 1):
            analysis += f"**第{i}推荐: {product.name}**\n"
            analysis += f"• 价格: ¥{product.price}\n"
            analysis += f"• 评分: {product.rating}/5 (基于{product.review_count}条评价)\n"
            analysis += f"• 品牌: {product.brand}\n"
            
            # 根据需求生成针对性建议
            if '高性能' in requirements:
                processor = product.specs.get('处理器', '未知')
                analysis += f"• 性能特点: {processor}处理器，适合高性能需求\n"
            
            if '长续航' in requirements:
                battery = product.specs.get('电池', '未知')
                analysis += f"• 续航能力: {battery}电池，续航表现良好\n"
                
            if '轻薄便携' in requirements:
                analysis += f"• 便携性: {product.specs.get('屏幕', '')}屏幕，设计轻薄便携\n"
            
            analysis += "\n"
        
        analysis += "**AI分析结论:**\n"
        if products[0].price > 8000:
            analysis += "• 推荐产品偏向高端市场，性能和体验优秀\n"
        elif products[0].price < 4000:
            analysis += "• 推荐产品性价比高，适合预算有限用户\n"
        else:
            analysis += "• 推荐产品定位中高端，平衡了性能与价格\n"
            
        return analysis

    def _generate_budget_advice(self, intent: Dict, products: List[Product]) -> str:
        """生成预算建议"""
        if not products:
            return "未找到符合预算的产品"
        
        avg_price = sum(p.price for p in products) / len(products)
        budget_min, budget_max = intent.get("budget_range", [0, float('inf')])
        
        advice = "**预算分析:**\n"
        
        if avg_price < budget_min:
            advice += "• 您的预算范围(¥{}-{})可以购买更高配置的产品\n".format(budget_min, budget_max)
            advice += "• 建议考虑提升配置或选择更高端的产品\n"
        elif avg_price > budget_max:
            advice += "• 推荐产品平均价格(¥{})略高于您的预算(¥{}-{})\n".format(int(avg_price), budget_min, budget_max)
            advice += "• 建议适当增加预算或考虑性价比更高的选择\n"
        else:
            advice += "• 预算范围(¥{}-{})与推荐产品价格匹配\n".format(budget_min, budget_max)
            advice += "• 有多款产品在您的预算范围内可供选择\n"
        
        # 添加具体产品价格建议
        prices = [p.price for p in products]
        min_price, max_price = min(prices), max(prices)
        advice += "• 推荐产品价格范围: ¥{} - ¥{}\n".format(int(min_price), int(max_price))
        advice += "• 平均价格: ¥{}\n".format(int(avg_price))
        
        return advice

    async def search_products(self, query: str = None, category: str = None, budget: str = None) -> List[Product]:
        """搜索产品"""
        # TODO: 实现产品搜索逻辑，暂时返回模拟数据
        mock_products = [
            Product(
                id="1",
                name="iPhone 15 Pro",
                price=7999.0,
                specs={"屏幕": "6.1英寸", "内存": "128GB", "处理器": "A17 Pro"},
                rating=4.8,
                review_count=5000,
                image_url="/images/iphone15.jpg",
                purchase_url="https://www.apple.com",
                category="手机",
                brand="Apple"
            ),
            Product(
                id="2", 
                name="华为 Mate 60 Pro",
                price=6999.0,
                specs={"屏幕": "6.82英寸", "内存": "256GB", "处理器": "麒麟9000S"},
                rating=4.7,
                review_count=3000,
                image_url="/images/mate60.jpg", 
                purchase_url="https://www.huawei.com",
                category="手机",
                brand="华为"
            ),
            Product(
                id="3",
                name="小米 13 Ultra",
                price=5999.0,
                specs={"屏幕": "6.73英寸", "内存": "256GB", "处理器": "骁龙8 Gen 2"},
                rating=4.6,
                review_count=4000,
                image_url="/images/xiaomi13.jpg",
                purchase_url="https://www.mi.com",
                category="手机", 
                brand="小米"
            )
        ]
        
        return mock_products[:3]