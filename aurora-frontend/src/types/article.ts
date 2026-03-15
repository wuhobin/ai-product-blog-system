/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章模块类型定义
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

// ═══════════════════════════════════════════
// 基础类型
// ═══════════════════════════════════════════

/** 分类信息 */
export interface Category {
  id: number
  name: string
  icon?: string
  sort?: number
  articleCount?: number
}

/** 标签信息 */
export interface Tag {
  id: number
  name: string
  color?: string
  articleCount?: number
}

// ═══════════════════════════════════════════
// 文章类型
// ═══════════════════════════════════════════

/** 文章列表项 */
export interface ArticleListVO {
  id: number
  title: string
  summary: string
  coverImage?: string
  authorId: number
  authorName: string
  authorAvatar?: string
  categories: Category[]
  tags: Tag[]
  viewCount: number
  likeCount: number
  commentCount: number
  favoriteCount: number
  isTop: number
  isRecommend: number
  createTime: string
}

/** 文章详情 */
export interface ArticleDetailVO {
  id: number
  title: string
  content: string
  summary: string
  coverImage?: string
  authorId: number
  authorName: string
  authorAvatar?: string
  authorBio?: string
  categories: Category[]
  tags: Tag[]
  viewCount: number
  likeCount: number
  commentCount: number
  favoriteCount: number
  isLiked: boolean
  isFavorited: boolean
  isTop: number
  isRecommend: number
  createTime: string
  updateTime: string
}

// ═══════════════════════════════════════════
// 查询参数
// ═══════════════════════════════════════════

/** 文章查询参数 */
export interface ArticleQueryParams {
  pageNum?: number
  pageSize?: number
  title?: string
  authorId?: number
  categoryId?: number
  tagId?: number
  status?: number
  isTop?: number
  isRecommend?: number
}

// ═══════════════════════════════════════════
// 分页响应
// ═══════════════════════════════════════════

/** 分页响应 */
export interface PageResponse<T> {
  records: T[]
  total: number
  size: number
  current: number
  pages: number
}
