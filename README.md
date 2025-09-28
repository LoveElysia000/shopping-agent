# AI智能购物推荐系统

一个基于人工智能的智能购物推荐系统，专门针对数码产品提供个性化的购买建议。

## 项目架构

### 前端技术栈
- React 18 + TypeScript
- Tailwind CSS + Ant Design
- Zustand (状态管理)
- React Query + Axios (数据获取)
- Vite (构建工具)

### 后端技术栈
- Python + FastAPI
- LangChain + OpenAI GPT
- PostgreSQL + Redis
- Celery + Redis (任务队列)

## 快速开始

### 环境准备
```bash
# 安装依赖
npm run install:all

# 启动开发环境
npm run dev
```

前端将运行在 `http://localhost:3000`
后端将运行在 `http://localhost:8000`

### 目录结构
```
├── frontend/           # 前端项目
├── backend/           # 后端项目  
├── database/          # 数据库相关
├── docs/             # 文档
└── package.json      # 项目管理
```

## 功能模块

### 前端页面
- 智能搜索首页 (`/`)
- 推荐结果页 (`/recommendations`)
- 产品详情页 (`/products/:id`)

### 后端API
- 推荐接口 (`POST /api/v1/recommendations`)
- 产品搜索接口 (`GET /api/v1/products`)
- 反馈收集接口 (`POST /api/v1/feedback`)

## 开发计划

### 第一阶段 MVP (2-3周)
- [ ] 基础前端界面
- [ ] 后端API框架搭建
- [ ] 单一数据源接入
- [ ] 基础AI推荐逻辑

### 第二阶段 功能完善 (4-6周)
- [ ] 多数据源接入
- [ ] 高级AI分析能力
- [ ] 用户反馈系统

## 部署说明

### 开发环境
- 前端: localhost:3000 (Vite Dev Server)
- 后端: localhost:8000 (FastAPI)
- 数据库: PostgreSQL + Redis (Docker)

### 生产环境
- 前端: Vercel/Netlify
- 后端: AWS EC2/Docker
- 数据库: AWS RDS + ElastiCache