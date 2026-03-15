/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   推荐文章组件
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { getMockRecommendArticles } from "@/mock/articles"
import type { ArticleListVO } from "@/types/article"

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function RecommendArticles() {
  const [articles, setArticles] = React.useState<ArticleListVO[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getMockRecommendArticles(5)
      .then(setArticles)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-card border rounded-xl p-4 space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          推荐文章
        </h3>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-3 animate-pulse">
            <div className="w-16 h-12 bg-muted rounded" />
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-2 bg-muted rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-xl p-4 space-y-3">
      <h3 className="font-semibold flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-yellow-500" />
        推荐文章
      </h3>
      <div className="space-y-2">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="flex gap-3 group"
          >
            <div className="w-16 h-12 rounded overflow-hidden shrink-0 bg-muted">
              {article.coverImage ? (
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                  暂无图
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {article.authorName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
