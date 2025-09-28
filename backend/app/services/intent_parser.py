from typing import Dict, List, Tuple
import re

class IntentParser:
    """用户意图解析器"""

    def parse_user_input(self, user_message: str) -> Dict:
        """解析用户输入，提取关键信息"""
        product_type = self._extract_product_type(user_message)
        budget_range = self._extract_budget_range(user_message)
        key_requirements = self._extract_requirements(user_message)
        usage_scenario = self._extract_usage_scenario(user_message)

        return {
            'product_type': product_type,
            'budget_range': budget_range,
            'key_requirements': key_requirements,
            'usage_scenario': usage_scenario
        }

    def _extract_product_type(self, text: str) -> str:
        """提取产品类型"""
        product_keywords = {
            '手机': ['手机', '智能手机', 'iphone', 'android'],
            '笔记本': ['笔记本', '笔记本电脑', 'laptop', 'macbook', 'thinkpad'],
            '平板': ['平板', '平板电脑', 'ipad', 'tablet'],
            '配件': ['配件', '耳机', '手表', '充电器', '保护壳']
        }

        for product_type, keywords in product_keywords.items():
            if any(keyword.lower() in text.lower() for keyword in keywords):
                return product_type
        
        return '手机'  # 默认返回手机类型

    def _extract_budget_range(self, text: str) -> Tuple[float, float]:
        """提取预算范围"""
        # 正则表达式匹配预算信息
        budget_patterns = [
            r'(\d+)[\s\-到至]+(\d+)元?',
            r'(\d+)[千万]+左右',
            r'预算.*?(\d+)',
            r'价格.*?(\d+)'
        ]

        for pattern in budget_patterns:
            matches = re.findall(pattern, text)
            if matches:
                if len(matches[0]) == 2:
                    min_budget, max_budget = map(float, matches[0])
                    return min_budget, max_budget
                else:
                    budget = float(matches[0])
                    return budget * 0.8, budget * 1.2  # 默认浮动范围

        # 默认预算范围
        return 2000.0, 8000.0

    def _extract_requirements(self, text: str) -> List[str]:
        """提取关键需求"""
        requirement_keywords = {
            '高性能': ['性能', '速度', '流畅', '快速'],
            '轻薄便携': ['轻薄', '便携', '重量', '厚度'],
            '长续航': ['续航', '电池', '待机', '充电'],
            '性价比高': ['性价比', '便宜', '实惠', '经济'],
            '游戏性能': ['游戏', '电竞', 'fps', '显卡'],
            '办公学习': ['办公', '学习', '文档', '会议'],
            '影像拍摄': ['拍照', '摄像', '摄影', '相机'],
            '创作设计': ['创作', '设计', '绘画', '剪辑']
        }

        requirements = []
        for req_name, keywords in requirement_keywords.items():
            if any(keyword in text for keyword in keywords):
                requirements.append(req_name)

        return requirements

    def _extract_usage_scenario(self, text: str) -> str:
        """提取使用场景"""
        scenario_keywords = {
            '日常使用': ['日常', '一般', '普通'],
            '商务办公': ['商务', '办公', '工作', '会议'],
            '游戏娱乐': ['游戏', '娱乐', '影音', '视频'],
            '学习创作': ['学习', '创作', '设计', '编程']
        }

        for scenario, keywords in scenario_keywords.items():
            if any(keyword in text for keyword in keywords):
                return scenario

        return '日常使用'