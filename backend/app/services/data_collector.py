from typing import List, Dict
import aiohttp
import asyncio
from app.models.product import Product

class DataCollector:
    """数据采集器"""

    async def collect_product_info(self, intent: Dict) -> List[Product]:
        """多源头数据采集"""
        sources = [
            self._jd_api_search(intent),
            self._mock_product_data(),  # 使用模拟数据替代真实API
        ]
        
        results = await asyncio.gather(*sources, return_exceptions=True)
        
        # 合并并过滤结果
        all_products = []
        for result in results:
            if isinstance(result, list):
                all_products.extend(result)
        
        return all_products

    async def _jd_api_search(self, intent: Dict) -> List[Product]:
        """京东API搜索（模拟）"""
        # TODO: 实现真实的京东API调用
        await asyncio.sleep(0.1)  # 模拟网络延迟
        return []

    async def _mock_product_data(self) -> List[Product]:
        """生成模拟产品数据"""
        return [
            Product(
                id=f"p{i}",
                name=f"{brand} {model}",
                price=price,
                specs={
                    "屏幕": screen,
                    "内存": memory,
                    "处理器": processor,
                    "电池": battery
                },
                rating=rating,
                review_count=review_count,
                image_url=f"/images/product{i}.jpg",
                purchase_url=f"https://example.com/product{i}",
                category="手机",
                brand=brand
            )
            for i, (brand, model, price, screen, memory, processor, battery, rating, review_count) in enumerate([
                ("Apple", "iPhone 15 Pro", 7999, "6.1英寸", "128GB", "A17 Pro", "3279mAh", 4.8, 5000),
                ("华为", "Mate 60 Pro", 6999, "6.82英寸", "256GB", "麒麟9000S", "5000mAh", 4.7, 3000),
                ("小米", "13 Ultra", 5999, "6.73英寸", "256GB", "骁龙8 Gen 2", "5000mAh", 4.6, 4000),
                ("荣耀", "Magic5 Pro", 5499, "6.81英寸", "256GB", "骁龙8 Gen 2", "5450mAh", 4.5, 2000),
                ("OPPO", "Find X6 Pro", 5999, "6.82英寸", "256GB", "骁龙8 Gen 2", "5000mAh", 4.6, 1500),
            ], 1)
        ]