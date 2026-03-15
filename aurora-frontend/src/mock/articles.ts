/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章 Mock 数据
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import type { ArticleListVO, ArticleDetailVO, Category, Tag, PageResponse } from "@/types/article"

// ═══════════════════════════════════════════
// Mock 分类数据
// ═══════════════════════════════════════════

export const mockCategories: Category[] = [
  { id: 1, name: "前端开发", icon: "code", sort: 1, articleCount: 8 },
  { id: 2, name: "后端技术", icon: "server", sort: 2, articleCount: 6 },
  { id: 3, name: "架构设计", icon: "sitemap", sort: 3, articleCount: 4 },
  { id: 4, name: "DevOps", icon: "cogs", sort: 4, articleCount: 3 },
  { id: 5, name: "人工智能", icon: "brain", sort: 5, articleCount: 5 },
]

// ═══════════════════════════════════════════
// Mock 标签数据
// ═══════════════════════════════════════════

export const mockTags: Tag[] = [
  { id: 1, name: "React", color: "#61DAFB", articleCount: 5 },
  { id: 2, name: "Vue", color: "#42B883", articleCount: 4 },
  { id: 3, name: "TypeScript", color: "#3178C6", articleCount: 6 },
  { id: 4, name: "Java", color: "#ED8B00", articleCount: 5 },
  { id: 5, name: "Spring Boot", color: "#6DB33F", articleCount: 4 },
  { id: 6, name: "Node.js", color: "#339933", articleCount: 3 },
  { id: 7, name: "Docker", color: "#2496ED", articleCount: 3 },
  { id: 8, name: "Kubernetes", color: "#326CE5", articleCount: 2 },
  { id: 9, name: "微服务", color: "#FF6B6B", articleCount: 4 },
  { id: 10, name: "AI", color: "#FF4F81", articleCount: 5 },
]

// ═══════════════════════════════════════════
// Mock 文章列表数据
// ═══════════════════════════════════════════

export const mockArticles: ArticleListVO[] = [
  {
    id: 1,
    title: "深入理解 React 18 并发特性",
    summary: "React 18 引入了并发特性，包括 Suspense、Transitions 和自动批处理。本文将深入探讨这些新特性的工作原理和最佳实践。",
    coverImage: "https://picsum.photos/seed/react18/800/400",
    authorId: 1,
    authorName: "张三",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=zhang",
    categories: [mockCategories[0]],
    tags: [mockTags[0], mockTags[2]],
    viewCount: 2847,
    likeCount: 186,
    commentCount: 42,
    favoriteCount: 95,
    isTop: 1,
    isRecommend: 1,
    createTime: "2024-03-15 10:30:00",
  },
  {
    id: 2,
    title: "Spring Boot 3.0 新特性详解",
    summary: "Spring Boot 3.0 基于 Spring Framework 6.0 构建，带来了对 Java 17 的最低要求、原生编译支持和新的可观测性 API。",
    coverImage: "https://picsum.photos/seed/spring3/800/400",
    authorId: 2,
    authorName: "李四",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=li",
    categories: [mockCategories[1]],
    tags: [mockTags[3], mockTags[4]],
    viewCount: 3156,
    likeCount: 234,
    commentCount: 56,
    favoriteCount: 128,
    isTop: 1,
    isRecommend: 1,
    createTime: "2024-03-14 14:20:00",
  },
  {
    id: 3,
    title: "TypeScript 5.0 类型体操进阶",
    summary: "掌握 TypeScript 高级类型技巧，包括条件类型、映射类型、模板字面量类型等，让你的代码更加类型安全。",
    coverImage: "https://picsum.photos/seed/ts5/800/400",
    authorId: 1,
    authorName: "张三",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=zhang",
    categories: [mockCategories[0]],
    tags: [mockTags[2]],
    viewCount: 1923,
    likeCount: 145,
    commentCount: 38,
    favoriteCount: 76,
    isTop: 0,
    isRecommend: 1,
    createTime: "2024-03-13 09:15:00",
  },
  {
    id: 4,
    title: "微服务架构设计模式",
    summary: "探索微服务架构中的常见设计模式，包括服务发现、API 网关、熔断器、链路追踪等核心概念。",
    coverImage: "https://picsum.photos/seed/microservice/800/400",
    authorId: 3,
    authorName: "王五",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=wang",
    categories: [mockCategories[2]],
    tags: [mockTags[8], mockTags[4]],
    viewCount: 2567,
    likeCount: 198,
    commentCount: 64,
    favoriteCount: 112,
    isTop: 0,
    isRecommend: 1,
    createTime: "2024-03-12 16:45:00",
  },
  {
    id: 5,
    title: "Docker 容器化最佳实践",
    summary: "从 Dockerfile 编写到多阶段构建，从镜像优化到安全加固，全面掌握 Docker 容器化的最佳实践。",
    coverImage: "https://picsum.photos/seed/docker/800/400",
    authorId: 2,
    authorName: "李四",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=li",
    categories: [mockCategories[3]],
    tags: [mockTags[6]],
    viewCount: 1834,
    likeCount: 132,
    commentCount: 29,
    favoriteCount: 87,
    isTop: 0,
    isRecommend: 0,
    createTime: "2024-03-11 11:30:00",
  },
  {
    id: 6,
    title: "Vue 3 Composition API 实战指南",
    summary: "深入学习 Vue 3 的 Composition API，掌握 setup 函数、响应式 API 和生命周期钩子的使用方法。",
    coverImage: "https://picsum.photos/seed/vue3/800/400",
    authorId: 1,
    authorName: "张三",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=zhang",
    categories: [mockCategories[0]],
    tags: [mockTags[1]],
    viewCount: 2156,
    likeCount: 167,
    commentCount: 45,
    favoriteCount: 93,
    isTop: 0,
    isRecommend: 1,
    createTime: "2024-03-10 15:20:00",
  },
  {
    id: 7,
    title: "Kubernetes 入门到实践",
    summary: "从 Pod、Service 到 Deployment，从 ConfigMap 到 Ingress，带你快速入门 Kubernetes 容器编排。",
    coverImage: "https://picsum.photos/seed/k8s/800/400",
    authorId: 3,
    authorName: "王五",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=wang",
    categories: [mockCategories[3]],
    tags: [mockTags[7], mockTags[6]],
    viewCount: 1678,
    likeCount: 123,
    commentCount: 31,
    favoriteCount: 68,
    isTop: 0,
    isRecommend: 0,
    createTime: "2024-03-09 10:00:00",
  },
  {
    id: 8,
    title: "GPT 与大语言模型原理浅析",
    summary: "深入了解 GPT 系列模型的架构原理，从 Transformer 到注意力机制，理解大语言模型的核心技术。",
    coverImage: "https://picsum.photos/seed/gpt/800/400",
    authorId: 2,
    authorName: "李四",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=li",
    categories: [mockCategories[4]],
    tags: [mockTags[9]],
    viewCount: 3421,
    likeCount: 289,
    commentCount: 78,
    favoriteCount: 156,
    isTop: 0,
    isRecommend: 1,
    createTime: "2024-03-08 14:30:00",
  },
  {
    id: 9,
    title: "Node.js 性能优化实战",
    summary: "从内存管理到事件循环，从异步编程到集群部署，全面提升 Node.js 应用的性能表现。",
    coverImage: "https://picsum.photos/seed/nodejs/800/400",
    authorId: 1,
    authorName: "张三",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=zhang",
    categories: [mockCategories[0]],
    tags: [mockTags[5]],
    viewCount: 1456,
    likeCount: 98,
    commentCount: 23,
    favoriteCount: 54,
    isTop: 0,
    isRecommend: 0,
    createTime: "2024-03-07 09:45:00",
  },
  {
    id: 10,
    title: "分布式系统设计原理",
    summary: "CAP 理论、BASE 理论、分布式事务、一致性协议，构建分布式系统的理论基础与实践经验。",
    coverImage: "https://picsum.photos/seed/distributed/800/400",
    authorId: 3,
    authorName: "王五",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=wang",
    categories: [mockCategories[2]],
    tags: [mockTags[8], mockTags[3]],
    viewCount: 2234,
    likeCount: 178,
    commentCount: 52,
    favoriteCount: 98,
    isTop: 0,
    isRecommend: 1,
    createTime: "2024-03-06 13:15:00",
  },
  {
    id: 11,
    title: "前端工程化实践：从 0 到 1",
    summary: "搭建现代化前端工程体系，包括构建工具选择、代码规范、CI/CD 流程、自动化测试等。",
    coverImage: "https://picsum.photos/seed/frontend-eng/800/400",
    authorId: 1,
    authorName: "张三",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=zhang",
    categories: [mockCategories[0]],
    tags: [mockTags[2], mockTags[0]],
    viewCount: 1876,
    likeCount: 142,
    commentCount: 36,
    favoriteCount: 81,
    isTop: 0,
    isRecommend: 0,
    createTime: "2024-03-05 16:30:00",
  },
  {
    id: 12,
    title: "Java 并发编程深度解析",
    summary: "深入理解 Java 内存模型、锁机制、线程池、并发容器，编写高性能的并发程序。",
    coverImage: "https://picsum.photos/seed/java-concurrent/800/400",
    authorId: 2,
    authorName: "李四",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=li",
    categories: [mockCategories[1]],
    tags: [mockTags[3]],
    viewCount: 2543,
    likeCount: 201,
    commentCount: 58,
    favoriteCount: 117,
    isTop: 0,
    isRecommend: 1,
    createTime: "2024-03-04 10:45:00",
  },
  {
    id: 13,
    title: "RAG 检索增强生成技术详解",
    summary: "了解 RAG 技术如何结合检索和生成，提升大语言模型的知识覆盖和准确性。",
    coverImage: "https://picsum.photos/seed/rag/800/400",
    authorId: 3,
    authorName: "王五",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=wang",
    categories: [mockCategories[4]],
    tags: [mockTags[9]],
    viewCount: 2867,
    likeCount: 234,
    commentCount: 67,
    favoriteCount: 134,
    isTop: 0,
    isRecommend: 1,
    createTime: "2024-03-03 14:00:00",
  },
  {
    id: 14,
    title: "Next.js 14 App Router 完全指南",
    summary: "全面掌握 Next.js 14 的 App Router，包括服务端组件、路由组、并行路由和拦截路由。",
    coverImage: "https://picsum.photos/seed/nextjs14/800/400",
    authorId: 1,
    authorName: "张三",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=zhang",
    categories: [mockCategories[0]],
    tags: [mockTags[0], mockTags[2]],
    viewCount: 3234,
    likeCount: 267,
    commentCount: 72,
    favoriteCount: 148,
    isTop: 0,
    isRecommend: 1,
    createTime: "2024-03-02 11:30:00",
  },
  {
    id: 15,
    title: "系统设计面试指南",
    summary: "掌握系统设计面试的核心方法论，从需求分析到架构设计，从容应对大厂技术面试。",
    coverImage: "https://picsum.photos/seed/system-design/800/400",
    authorId: 2,
    authorName: "李四",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=li",
    categories: [mockCategories[2]],
    tags: [mockTags[8]],
    viewCount: 4521,
    likeCount: 378,
    commentCount: 95,
    favoriteCount: 234,
    isTop: 1,
    isRecommend: 1,
    createTime: "2024-03-01 09:00:00",
  },
]

// ═══════════════════════════════════════════
// Mock 文章详情数据
// ═══════════════════════════════════════════

const articleContent = `
## 前言

React 18 带来了革命性的并发特性，这是 React 架构的一次重大升级。本文将深入探讨这些新特性的工作原理。

## 并发渲染

并发渲染是 React 18 的核心特性，它允许 React 准备多个版本的 UI 同时存在。

\`\`\`tsx
import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
\`\`\`

### 自动批处理

React 18 默认启用自动批处理，即使在 Promise、setTimeout 等异步回调中也会合并状态更新。

\`\`\`tsx
function handleClick() {
  // 这些更新会被自动批处理
  setCount(c => c + 1)
  setFlag(f => !f)
  // React 只会重新渲染一次
}
\`\`\`

## Transitions

Transitions 让你区分紧急更新和非紧急更新。

\`\`\`tsx
import { startTransition } from 'react'

startTransition(() => {
  setSearchQuery(input)
})
\`\`\`

## Suspense 改进

Suspense 在 React 18 中得到了显著增强，支持服务端渲染流式 HTML。

| 特性 | React 17 | React 18 |
|------|----------|----------|
| 客户端 Suspense | ✅ | ✅ |
| 服务端 Suspense | ❌ | ✅ |
| 并发渲染 | ❌ | ✅ |

## 总结

React 18 的并发特性为构建更流畅的用户体验提供了强大的工具。掌握这些特性将帮助你构建更优秀的 React 应用。
`

export const mockArticleDetails: Record<number, ArticleDetailVO> = {
  1: {
    id: 1,
    title: "深入理解 React 18 并发特性",
    content: articleContent,
    summary: "React 18 引入了并发特性，包括 Suspense、Transitions 和自动批处理。本文将深入探讨这些新特性的工作原理和最佳实践。",
    coverImage: "https://picsum.photos/seed/react18/800/400",
    authorId: 1,
    authorName: "张三",
    authorAvatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=zhang",
    authorBio: "前端架构师，专注于 React 生态和工程化实践，开源爱好者。",
    categories: [mockCategories[0]],
    tags: [mockTags[0], mockTags[2]],
    viewCount: 2847,
    likeCount: 186,
    commentCount: 42,
    favoriteCount: 95,
    isLiked: false,
    isFavorited: false,
    isTop: 1,
    isRecommend: 1,
    createTime: "2024-03-15 10:30:00",
    updateTime: "2024-03-15 10:30:00",
  },
}

// 为其他文章生成默认详情
mockArticles.forEach((article) => {
  if (!mockArticleDetails[article.id]) {
    mockArticleDetails[article.id] = {
      ...article,
      content: `
## ${article.title}

${article.summary}

### 核心内容

这是一篇关于 **${article.categories[0]?.name || "技术"}** 的深度文章。

#### 技术要点

- 要点一：深入理解核心概念
- 要点二：掌握最佳实践
- 要点三：实战案例分析

\`\`\`typescript
// 示例代码
function example() {
  console.log("Hello, World!")
}
\`\`\`

### 总结

希望这篇文章对你有所帮助！
`,
      authorBio: `${article.authorName}，资深技术专家，专注于技术分享与开源贡献。`,
      isLiked: false,
      isFavorited: false,
      updateTime: article.createTime,
    }
  }
})

// ═══════════════════════════════════════════
// Mock API 函数
// ═══════════════════════════════════════════

/** 模拟网络延迟 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** 获取文章列表 */
export async function getMockArticles(params: {
  pageNum?: number
  pageSize?: number
  categoryId?: number
  tagId?: number
}): Promise<PageResponse<ArticleListVO>> {
  await delay(300)

  const { pageNum = 1, pageSize = 10, categoryId, tagId } = params

  let filtered = [...mockArticles]

  // 按分类筛选
  if (categoryId) {
    filtered = filtered.filter((a) => a.categories.some((c) => c.id === categoryId))
  }

  // 按标签筛选
  if (tagId) {
    filtered = filtered.filter((a) => a.tags.some((t) => t.id === tagId))
  }

  const start = (pageNum - 1) * pageSize
  const records = filtered.slice(start, start + pageSize)

  return {
    records,
    total: filtered.length,
    size: pageSize,
    current: pageNum,
    pages: Math.ceil(filtered.length / pageSize),
  }
}

/** 获取文章详情 */
export async function getMockArticleDetail(id: number): Promise<ArticleDetailVO | null> {
  await delay(200)
  return mockArticleDetails[id] || null
}

/** 获取热门文章 */
export async function getMockHotArticles(limit = 5): Promise<ArticleListVO[]> {
  await delay(200)
  return [...mockArticles].sort((a, b) => b.viewCount - a.viewCount).slice(0, limit)
}

/** 获取推荐文章 */
export async function getMockRecommendArticles(limit = 5): Promise<ArticleListVO[]> {
  await delay(200)
  return mockArticles.filter((a) => a.isRecommend === 1).slice(0, limit)
}

/** 获取用户文章 */
export async function getMockUserArticles(
  userId: number,
  params: { pageNum?: number; pageSize?: number }
): Promise<PageResponse<ArticleListVO>> {
  await delay(300)

  const { pageNum = 1, pageSize = 10 } = params
  const filtered = mockArticles.filter((a) => a.authorId === userId)

  const start = (pageNum - 1) * pageSize
  const records = filtered.slice(start, start + pageSize)

  return {
    records,
    total: filtered.length,
    size: pageSize,
    current: pageNum,
    pages: Math.ceil(filtered.length / pageSize),
  }
}
