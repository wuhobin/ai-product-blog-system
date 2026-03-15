/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章列表组件
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import { ArticleCard } from "./ArticleCard"
import { Button } from "@/components/ui/button"
import type { ArticleListVO, PageResponse } from "@/types/article"

// ═══════════════════════════════════════════
// Props 定义
// ═══════════════════════════════════════════

interface ArticleListProps {
  initialData?: PageResponse<ArticleListVO>
  onLoadMore?: (page: number) => Promise<PageResponse<ArticleListVO>>
}

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function ArticleList({ initialData, onLoadMore }: ArticleListProps) {
  const [articles, setArticles] = React.useState<ArticleListVO[]>(initialData?.records || [])
  const [page, setPage] = React.useState(initialData?.current || 1)
  const [total, setTotal] = React.useState(initialData?.total || 0)
  const [loading, setLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)

  // ─────────────────────────────────────────────────────
  // 初始化数据
  // ─────────────────────────────────────────────────────
  React.useEffect(() => {
    if (initialData) {
      setArticles(initialData.records)
      setPage(initialData.current)
      setTotal(initialData.total)
      setHasMore(initialData.current < initialData.pages)
    }
  }, [initialData])

  // ─────────────────────────────────────────────────────
  // 加载更多
  // ─────────────────────────────────────────────────────
  const handleLoadMore = async () => {
    if (loading || !onLoadMore || !hasMore) return

    setLoading(true)
    try {
      const nextPage = page + 1
      const data = await onLoadMore(nextPage)
      setArticles((prev) => [...prev, ...data.records])
      setPage(nextPage)
      setHasMore(nextPage < data.pages)
    } catch (error) {
      console.error("加载更多失败:", error)
    } finally {
      setLoading(false)
    }
  }

  // ─────────────────────────────────────────────────────
  // 空状态
  // ─────────────────────────────────────────────────────
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <svg
          className="w-16 h-16 mb-4 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <p className="text-lg font-medium">暂无文章</p>
        <p className="text-sm">快去看看其他分类吧</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* ─────────────────────────────────────────────────────
          文章列表（单列布局）
         ───────────────────────────────────────────────────── */}
      <div className="flex flex-col">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────
          加载更多按钮
         ───────────────────────────────────────────────────── */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={loading}
            className="min-w-32"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                加载中...
              </>
            ) : (
              "加载更多"
            )}
          </Button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────
          统计信息
         ───────────────────────────────────────────────────── */}
      {!hasMore && articles.length > 0 && (
        <div className="text-center text-sm text-muted-foreground py-4">
          已加载全部 {total} 篇文章
        </div>
      )}
    </div>
  )
}
