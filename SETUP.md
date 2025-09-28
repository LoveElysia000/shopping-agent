# 🚀 AI智能购物推荐系统 - 安装和启动指南

## 📋 项目概述
这是一个基于AI的智能购物推荐系统，提供数码产品的个性化购买建议。

## 🛠️ 技术栈
- **前端**: React 18 + TypeScript + Vite + Tailwind CSS + Ant Design
- **后端**: Python + FastAPI + Pydantic
- **AI引擎**: 自定义推荐算法 + 模拟AI分析
- **数据存储**: 内存存储（可扩展为PostgreSQL）

## 📦 安装依赖

### 后端依赖
```bash
cd backend

# 安装Python依赖
pip3 install fastapi==0.104.1
pip3 install uvicorn==0.24.0
pip3 install python-multipart==0.0.6
pip3 install python-dotenv==1.0.0
pip3 install pydantic==2.5.0
pip3 install aiohttp==3.9.1
pip3 install beautifulsoup4==4.12.2
```

### 前端依赖
```bash
cd frontend

# 安装Node.js依赖
npm install
```

## 🚀 启动项目

### 启动后端服务
```bash
cd backend
python3 main.py
```
后端服务将在 http://localhost:8000 启动
API文档: http://localhost:8000/docs

### 启动前端服务
```bash
cd frontend
npm run dev
```
前端服务将在 http://localhost:3000 启动

## 📊 API接口

### 1. 推荐接口
```bash
POST /api/v1/recommendations
Content-Type: application/json

{
  "product_type": "phone",
  "budget": [5000, 8000],
  "keywords": "编程 轻薄",
  "requirements": ["便携", "长续航"]
}
```

### 2. 产品搜索接口
```bash
GET /api/v1/products?q=iPhone&category=phone&budget=5000-8000
```

### 3. 反馈接口
```bash
POST /api/v1/feedback
Content-Type: application/json

{
  "recommendation_id": "xxx",
  "helpful": true,
  "feedback": "具体反馈"
}
```

## 🎯 功能特性

### ✅ 已实现功能
- [x] 智能搜索首页
- [x] 推荐结果页面
- [x] 产品详情页面
- [x] AI分析报告生成
- [x] 预算优化建议
- [x] 产品对比功能
- [x] 响应式设计

### 🔄 待实现功能
- [ ] 多数据源集成（京东、淘宝API）
- [ ] 真实AI集成（OpenAI GPT）
- [ ] 数据库持久化
- [ ] 用户反馈系统
- [ ] 实时价格监控

## 🐛 常见问题

### Q: 后端服务启动失败
A: 检查Python依赖是否安装正确，确保安装了所有requirements.txt中的包

### Q: 前端编译错误
A: 确保Node.js版本 >= 16，运行 `npm install` 安装所有依赖

### Q: CORS错误
A: 检查后端CORS配置，确保允许前端域名（默认localhost:3000）

## 📝 开发说明

### 项目结构
```
shopping/
├── frontend/                 # 前端代码
│   ├── src/
│   │   ├── components/      # 组件
│   │   ├── pages/           # 页面
│   │   ├── api/            # API服务
│   │   └── types/          # 类型定义
│   └── package.json
├── backend/                 # 后端代码
│   ├── app/
│   │   ├── api/            # API路由
│   │   ├── models/         # 数据模型
│   │   ├── services/       # 业务逻辑
│   │   └── core/           # 核心配置
│   └── main.py
├── docker-compose.yml       # Docker配置
└── README.md               # 项目说明
```

### 数据流
1. 用户在前端填写搜索条件
2. 前端调用后端推荐API
3. 后端解析用户意图
4. 采集产品数据（当前为模拟数据）
5. AI引擎生成推荐和分析
6. 返回推荐结果给前端
7. 前端展示推荐结果

## 🔧 自定义配置

### 环境变量
创建 `.env` 文件：
```bash
# 后端配置
ALLOWED_ORIGINS=http://localhost:3000
API_PORT=8000

# AI配置  
OPENAI_API_KEY=your_openai_key
```

### 修改模拟数据
编辑 `backend/app/services/recommendation_engine.py` 中的 `search_products` 方法

## 📞 技术支持
如有问题，请检查：
1. 依赖是否安装完整
2. 端口是否被占用
3. 环境变量配置是否正确