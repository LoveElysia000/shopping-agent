# 🛍️ AI智能购物推荐系统

一个基于人工智能的智能购物推荐系统，专门针对数码产品提供个性化的购买建议和分析。

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org)

## ✨ 核心特性

- 🤖 **AI驱动的智能推荐** - 基于用户需求和预算的个性化产品匹配
- 💰 **预算优化分析** - 智能价格范围匹配和性价比分析
- 📊 **产品对比功能** - 详细的规格参数横向对比
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🔍 **多维度搜索** - 产品类型、关键词、需求的灵活搜索组合
- 🚀 **高性能架构** - 前后端分离，模块化设计

## 🏗️ 技术架构

### 前端技术栈
| 技术 | 用途 | 版本 |
|------|------|------|
| React 18 | UI框架 | 18+ |
| TypeScript | 类型安全 | 5+ |
| Tailwind CSS | 样式框架 | 3+ |
| Ant Design | UI组件库 | 5+ |
| Vite | 构建工具 | 4+ |
| React Query | 数据管理 | 3+ |
| Axios | HTTP客户端 | 1+ |

### 后端技术栈
| 技术 | 用途 | 版本 |
|------|------|------|
| Python | 后端语言 | 3.9+ |
| FastAPI | Web框架 | 0.104+ |
| Pydantic | 数据验证 | 2.5+ |
| Uvicorn | ASGI服务器 | 0.24+ |
| PostgreSQL | 数据库 | 14+ |
| Redis | 缓存/队列 | 7+ |

## 🚀 快速开始

### 环境要求
- Node.js 16+
- Python 3.9+
- Docker & Docker Compose（用于数据库）

### 一键安装和启动
```bash
# 安装所有依赖
npm run install:all

# 启动数据库服务（需要Docker）
docker-compose up -d

# 启动开发环境（前端 + 后端）
npm run dev
```

### 手动启动（可选）
```bash
# 单独启动后端
npm run dev:backend
# 访问 http://localhost:8000/docs 查看API文档

# 单独启动前端
npm run dev:frontend  
# 访问 http://localhost:3000 使用系统
```

## 📁 项目结构

```
ai-shopping-recommendation/
├── frontend/                 # React前端应用
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   ├── pages/           # 页面组件
│   │   ├── api/            # API服务
│   │   ├── types/          # TypeScript类型定义
│   │   └── utils/          # 工具函数
│   └── package.json
├── backend/                 # FastAPI后端应用
│   ├── app/
│   │   ├── api/            # API路由
│   │   ├── models/         # 数据模型
│   │   ├── services/       # 业务逻辑
│   │   └── core/           # 核心配置
│   ├── requirements.txt
│   └── main.py            # 应用入口
├── database/               # 数据库配置
│   ├── init.sql           # 数据库初始化脚本
│   └── migrations/        # 数据库迁移文件
├── docs/                  # 项目文档
├── docker-compose.yml     # Docker编排配置
└── package.json          # 项目管理配置
```

## 📡 API接口文档

### 主要API端点

#### 1. 获取推荐产品
```http
POST /api/v1/recommendations
Content-Type: application/json

{
  "product_type": "手机",
  "budget": [5000, 8000],
  "keywords": "编程 轻薄",
  "requirements": ["便携", "长续航", "高性能"]
}
```

#### 2. 搜索产品
```http
GET /api/v1/products?q=iPhone&category=phone&budget=5000-8000
```

#### 3. 提交反馈
```http
POST /api/v1/feedback
Content-Type: application/json

{
  "recommendation_id": "xxx",
  "helpful": true,
  "feedback": "推荐很准确，性价比不错"
}
```

### 访问API文档
启动后端服务后，访问 `http://localhost:8000/docs` 查看完整的API文档和交互式测试界面。

## 🎯 功能模块

### 📄 页面功能
- **智能搜索首页** (`/`) - 用户输入搜索条件
- **推荐结果页** (`/recommendations`) - 展示AI推荐的产品列表
- **产品详情页** (`/products/:id`) - 详细的产品信息和对比

### 🔧 核心组件
- **搜索表单** - 多维度搜索条件输入
- **产品卡片** - 产品信息可视化展示
- **对比表格** - 产品规格横向对比
- **AI分析报告** - 智能化推荐理由分析

## 🛠️ 开发指南

### 环境配置
创建 `.env` 文件进行环境配置：
```bash
# 后端配置
ALLOWED_ORIGINS=http://localhost:3000
API_PORT=8000
DEBUG=true

# 数据库配置
DATABASE_URL=postgresql://user:pass@localhost:5432/shopping
REDIS_URL=redis://localhost:6379

# AI配置（预留）
OPENAI_API_KEY=your_openai_key_here
```

### 代码标准
- 前端使用ESLint + Prettier进行代码格式化
- 后端使用Black + isort进行代码格式化
- 提交前运行代码检查和测试

## 🤝 贡献指南

我们欢迎各种形式的贡献！请查看 [CONTRIBUTING.md](docs/CONTRIBUTING.md) 了解如何参与开发。

### 开发流程
1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📋 开发路线图

### ✅ 已完成
- [x] 项目基础架构搭建
- [x] 前端页面组件开发
- [x] 后端API服务实现
- [x] AI推荐引擎核心逻辑
- [x] 数据库设计和初始化

### 🔄 进行中
- [ ] 集成真实电商API数据
- [ ] 连接OpenAI GPT增强推荐
- [ ] 用户反馈系统优化

### 📅 计划中  
- [ ] 多品类产品支持扩展
- [ ] 移动端APP开发
- [ ] 实时价格监控
- [ ] 个性化推荐算法优化

## 🐛 问题排查

### 常见问题

**Q: 后端服务启动失败**  
A: 检查Python依赖是否正确安装，确保PostgreSQL和Redis服务正在运行

**Q: 前端编译错误**  
A: 确认Node.js版本≥16，运行 `npm install` 重装依赖

**Q: CORS错误**  
A: 检查后端CORS配置，确保允许前端域名访问

**Q: 数据库连接失败**  
A: 确认Docker容器正常运行，检查数据库连接字符串

### 获取帮助
- 查看详细文档：[SETUP.md](SETUP.md)
- 查看项目总结：[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- 提交Issue报告问题

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

**项目状态**: 🟢 生产就绪 - 基础功能完整，可扩展性强