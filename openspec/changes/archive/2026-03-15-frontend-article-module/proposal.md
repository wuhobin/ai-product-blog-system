## Why

前台社区首页目前仅为占位页面，缺少核心的文章展示功能。用户登录后无法浏览、阅读、搜索文章，无法完成技术社区的核心体验闭环。后台已提供完整的文章 API（列表、详情、热门、推荐、点赞、收藏等），前台需要对接这些接口构建文章模块。

## What Changes

- 首页直接展示文章列表（非预览，可浏览完整内容）
- 新增文章列表页面，支持分页、分类/标签筛选
- 新增文章详情页面，展示 Markdown 渲染内容（含代码块复制功能）
- 新增热门文章、推荐文章侧边栏组件
- 新增文章点赞、收藏交互功能（需登录）
- 新增用户文章列表页面（个人主页入口）
- 代码块黑色背景 + 语法高亮 + 一键复制
- 使用 Mock 数据先行开发，后续对接真实 API

## Capabilities

### New Capabilities

- `article-list`: 文章列表展示与筛选（首页/分类/标签）
- `article-detail`: 文章详情页（Markdown 渲染、作者信息、统计数据）
- `article-sidebar`: 侧边栏组件（热门文章、推荐文章）
- `article-interaction`: 文章互动（点赞、收藏，@SaUserCheckLogin）
- `user-articles`: 用户文章列表（个人主页文章 Tab）

### Modified Capabilities

无（前台文章模块为全新功能）

## Impact

| 范围 | 影响 |
|------|------|
| **前台 (aurora-frontend)** | 新增页面、组件、Mock 数据、类型定义 |
| **后端 (aurora-api)** | 无变更，复用现有接口 |
| **认证** | 点赞/收藏需前台用户登录（@SaUserCheckLogin） |
| **路由** | 新增 `/articles`, `/article/[id]`, `/user/[id]/articles` |

## Non-Goals

- 不实现文章发布/编辑功能（属于用户中心，后续迭代）
- 不实现评论功能（独立模块，后续迭代）
- 不实现搜索功能（需要 ES，后续迭代）
- 不实现真实 API 对接（本阶段仅 Mock 数据验证 UI）
