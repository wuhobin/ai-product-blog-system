## Context

前台社区 (aurora-frontend) 基于 Next.js 15 + shadcn/ui 构建，当前仅有首页骨架和微信登录功能。后台已提供完整的文章 API，本设计旨在通过 Mock 数据先行开发前台文章模块，验证 UI/UX 后再对接真实 API。

### 后台 API 概览

| 接口 | 方法 | 说明 | 认证 |
|------|------|------|------|
| `/api/article` | GET | 文章列表（分页、筛选） | 否 |
| `/api/article/{id}` | GET | 文章详情 | 否 |
| `/api/article/hot` | GET | 热门文章 | 否 |
| `/api/article/recommend` | GET | 推荐文章 | 否 |
| `/api/article/user/{userId}` | GET | 用户文章列表 | 否 |
| `/api/article/{id}/like` | POST | 点赞 | @SaUserCheckLogin |
| `/api/article/{id}/like` | DELETE | 取消点赞 | @SaUserCheckLogin |
| `/api/article/{id}/favorite` | POST | 收藏 | @SaUserCheckLogin |
| `/api/article/{id}/favorite` | DELETE | 取消收藏 | @SaUserCheckLogin |

## Goals / Non-Goals

**Goals:**
- 实现文章列表页（分页、分类/标签筛选）
- 实现文章详情页（Markdown 渲染、作者信息、统计）
- 实现侧边栏组件（热门/推荐文章）
- 实现点赞/收藏交互（Mock 状态切换）
- 实现用户文章列表页
- 使用 Mock 数据开发，不依赖后端运行

**Non-Goals:**
- 不实现文章发布/编辑
- 不实现评论功能
- 不实现全文搜索
- 不对接真实 API（后续迭代）

## Decisions

### 1. 数据层：Mock Service + 类型定义

**选择**: 创建独立的 Mock 数据文件和类型定义，与 API 层解耦。

**理由**:
- Mock 数据可独立于后端运行，加速前端开发
- TypeScript 类型定义与后台 VO 保持一致，便于后续对接
- 后续切换真实 API 只需替换数据源

**替代方案**:
- MSW (Mock Service Worker)：对于当前规模过度设计
- 硬编码在组件中：难以维护和复用

### 2. 页面路由设计

**选择**: 采用 Next.js App Router 的文件路由。

```
/articles              → 文章列表页
/article/[id]          → 文章详情页
/user/[id]/articles    → 用户文章列表
```

**理由**:
- 遵循 Next.js 15 最佳实践
- SEO 友好的 URL 结构
- 与现有 `/wechat-login` 路由风格一致

### 3. 组件架构

**选择**: 采用 Container/Presentational 模式。

```
src/
├── components/
│   ├── article/
│   │   ├── ArticleCard.tsx        # 文章卡片（展示）
│   │   ├── ArticleList.tsx        # 文章列表（容器）
│   │   ├── ArticleDetail.tsx      # 文章详情（展示，含 CodePre 组件）
│   │   ├── ArticleSidebar.tsx     # 侧边栏（热门/推荐）
│   │   ├── ArticleInteraction.tsx # 点赞/收藏按钮
│   │   ├── AuthorCard.tsx         # 作者信息卡片
│   │   ├── UserProfileCard.tsx    # 用户信息卡片
│   │   ├── HotArticles.tsx        # 热门文章组件
│   │   ├── RecommendArticles.tsx  # 推荐文章组件
│   │   ├── CategoryFilter.tsx     # 分类筛选组件
│   │   └── TagFilter.tsx          # 标签筛选组件
│   └── ui/                        # shadcn/ui 基础组件
├── app/
│   ├── page.tsx                   # 首页（含文章列表）
│   ├── articles/page.tsx          # 文章列表页
│   ├── article/[id]/page.tsx      # 详情页
│   └── user/[id]/articles/page.tsx # 用户文章列表
├── mock/
│   └── articles.ts                # Mock 数据
└── types/
    └── article.ts                 # 类型定义
```

**理由**:
- 展示组件纯函数，易于测试
- 容器组件处理数据逻辑
- 复用后台 VO 结构作为类型定义

### 4. Markdown 渲染

**选择**: 使用 `react-markdown` + `remark-gfm` + `rehype-highlight`。

**理由**:
- 轻量级，无编辑器依赖
- 支持 GFM（表格、任务列表等）
- rehype-highlight 提供代码语法高亮
- 与 shadcn/ui Tailwind 样式兼容

**代码块样式**:
- 黑色背景 (`#1e1e1e`)，与暗色主题一致
- 自定义 CodePre 组件，提供复制按钮功能
- 悬停时显示复制按钮，点击后显示成功状态

**替代方案**:
- MDX：过度设计，仅用于展示
- 自定义渲染器：重复造轮子

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| Mock 数据结构与后台不一致 | 严格按照后台 VO 定义 TypeScript 类型 |
| 点赞/收藏状态无持久化 | 明确标注为 Mock 实现，后续对接 API |
| Markdown 样式不统一 | 使用 Tailwind Typography 插件 |
| 页面加载性能（Mock 数据量） | Mock 数据仅 10-20 条，模拟分页 |

## Migration Plan

**阶段 1: Mock 开发（当前）**
1. 创建类型定义和 Mock 数据
2. 实现页面和组件
3. 验证 UI/UX

**阶段 2: API 对接（后续）**
1. 创建 API Service 层
2. 替换 Mock 数据源
3. 处理认证状态（点赞/收藏）

**阶段 3: 优化（后续）**
1. 添加缓存策略 (TanStack Query)
2. SSR/SSG 优化
3. 图片懒加载

## Open Questions

1. **文章详情页是否需要 SSR？**
   - 暂定客户端渲染，后续可按需升级

2. **点赞/收藏是否需要乐观更新？**
   - Mock 阶段暂不实现，API 对接时考虑
