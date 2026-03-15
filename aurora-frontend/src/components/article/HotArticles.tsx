/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   热门文章组件
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { Flame, Eye } from "lucide-react"
import { getMockHotArticles } from "@/mock/articles"
import type { ArticleListVO } from "@/types/article"

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function HotArticles() {
  const [articles, setArticles] = React.useState<ArticleListVO[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getMockHotArticles(5)
      .then(setArticles)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="bg-card border rounded-xl p-4 space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          热门文章
        </h3>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-2 animate-pulse">
            <div className="w-5 h-5 bg-muted rounded" />
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-2 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-xl p-4 space-y-3">
      <h3 className="font-semibold flex items-center gap-2">
        <Flame className="w-4 h-4 text-orange-500" />
        热门文章
      </h3>
      <div className="space-y-2">
        {articles.map((article, index) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="flex gap-2 group"
          >
            <span
              className={`w-5 h-5 flex items-center justify-center text-xs font-bold rounded ${
                index < 3
                  ? "bg-gradient-to-br from-orange-500 to-red-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {article.title}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {article.viewCount}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
