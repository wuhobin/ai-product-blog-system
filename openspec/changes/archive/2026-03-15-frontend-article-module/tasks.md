## 1. 基础设施

- [x] 1.1 创建文章相关类型定义 (`src/types/article.ts`) - ArticleListVO, ArticleDetailVO, CategoryVO, TagVO
- [x] 1.2 创建 Mock 数据文件 (`src/mock/articles.ts`) - 包含 15-20 条文章数据
- [x] 1.3 安装 Markdown 渲染依赖 (`react-markdown`, `remark-gfm`, `rehype-highlight`)

## 2. 文章列表页

- [x] 2.1 创建文章卡片组件 (`src/components/article/ArticleCard.tsx`)
- [x] 2.2 创建文章列表组件 (`src/components/article/ArticleList.tsx`) - 支持分页
- [x] 2.3 创建文章列表页面 (`src/app/articles/page.tsx`)
- [x] 2.4 添加分类筛选组件 (`src/components/article/CategoryFilter.tsx`)
- [x] 2.5 添加标签筛选组件 (`src/components/article/TagFilter.tsx`)
- [x] 2.6 优化文章卡片为横向布局（文字左、封面图右）
- [x] 2.7 首页文章列表添加容器样式（max-width、背景、圆角）

## 3. 文章详情页

- [x] 3.1 创建文章详情组件 (`src/components/article/ArticleDetail.tsx`) - Markdown 渲染
- [x] 3.2 创建作者信息卡片组件 (`src/components/article/AuthorCard.tsx`)
- [x] 3.3 创建文章详情页面 (`src/app/article/[id]/page.tsx`)
- [x] 3.4 添加返回列表导航
- [x] 3.5 配置 Tailwind Typography 插件样式
- [x] 3.6 实现代码块复制功能 (CodePre 组件)
- [x] 3.7 配置代码块黑色背景样式 (`globals.css`)
## 4. 侧边栏组件

- [x] 4.1 创建热门文章组件 (`src/components/article/HotArticles.tsx`)
- [x] 4.2 创建推荐文章组件 (`src/components/article/RecommendArticles.tsx`)
- [x] 4.3 创建侧边栏容器组件 (`src/components/article/ArticleSidebar.tsx`)
- [x] 4.4 添加骨架屏加载状态

## 5. 文章互动功能

- [x] 5.1 创建点赞按钮组件 (`src/components/article/LikeButton.tsx`)
- [x] 5.2 创建收藏按钮组件 (`src/components/article/FavoriteButton.tsx`)
- [x] 5.3 创建互动按钮组 (`src/components/article/ArticleInteraction.tsx`)
- [x] 5.4 实现未登录用户点击时的登录提示

## 6. 用户文章列表

- [x] 6.1 创建用户信息卡片组件 (`src/components/article/UserProfileCard.tsx`)
- [x] 6.2 创建用户文章列表页面 (`src/app/user/[id]/articles/page.tsx`)
- [x] 6.3 在作者卡片添加跳转用户文章页的链接

## 7. 首页集成

- [x] 7.1 在首页添加文章列表入口
- [x] 7.2 更新导航栏链接指向 `/articles`
- [x] 7.3 在首页展示最新/热门文章预览

## 8. 验证与优化

- [x] 8.1 验证所有页面在移动端的响应式布局
- [x] 8.2 验证 Markdown 渲染样式（代码高亮、表格、图片)
- [x] 8.3 验证分页功能
- [x] 8.4 验证筛选功能
- [x] 8.5 验证点赞/收藏状态切换
