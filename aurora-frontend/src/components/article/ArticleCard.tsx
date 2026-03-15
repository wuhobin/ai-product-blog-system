/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章卡片组件 - 横向布局
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import * as React from "react"
import Link from "next/link"
import { Eye, ThumbsUp } from "lucide-react"
import type { ArticleListVO } from "@/types/article"

// ═══════════════════════════════════════════
// Props 定义
// ═══════════════════════════════════════════

interface ArticleCardProps {
  article: ArticleListVO
}

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function ArticleCard({ article }: ArticleCardProps) {
  const {
    id,
    title,
    summary,
    coverImage,
    authorName,
    categories,
    viewCount,
    likeCount,
    isTop,
    isRecommend,
    createTime,
  } = article

  return (
    <article className="group bg-card rounded-lg p-4 mb-4 flex gap-4 hover:shadow-sm transition-all duration-200 border-b last:border-b-0">
      {/* ─────────────────────────────────────────────────────
          左侧：文字内容
         ───────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* 分类 + 置顶/推荐标签 */}
        <div className="flex items-center gap-2 mb-2">
          {isTop === 1 && (
            <span className="px-1.5 py-0.5 text-xs font-medium bg-red-500 text-white rounded">
              置顶
            </span>
          )}
          {isRecommend === 1 && (
            <span className="px-1.5 py-0.5 text-xs font-medium bg-blue-500 text-white rounded">
              推荐
            </span>
          )}
          {categories.length > 0 && (
            <Link
              href={`/articles?category=${categories[0].id}`}
              className="text-xs text-blue-500 hover:underline"
            >
              {categories[0].name}
            </Link>
          )}
        </div>

        {/* 标题 */}
        <Link href={`/article/${id}`}>
          <h2 className="text-base font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-blue-500 transition-colors duration-200">
            {title}
          </h2>
        </Link>

        {/* 摘要 */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
          {summary}
        </p>

        {/* 底部：作者 + 日期 + 统计 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{authorName}</span>
            <span className="text-muted-foreground/50">·</span>
            <span>{createTime}</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {viewCount}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5" />
              {likeCount}
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          右侧：封面图
         ───────────────────────────────────────────────────── */}
      {coverImage && (
        <Link
          href={`/article/${id}`}
          className="flex-shrink-0 w-[120px] h-[80px] md:w-[140px] md:h-[94px] overflow-hidden rounded"
        >
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}
    </article>
  )
}
