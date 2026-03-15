/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   用户文章列表页面
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { BookOpen, ArrowLeft } from "lucide-react"
import { UserProfileCard } from "@/components/article/UserProfileCard"
import { ArticleCard } from "@/components/article/ArticleCard"
import { Button } from "@/components/ui/button"
import { getMockUserArticles, mockArticles } from "@/mock/articles"
import type { ArticleListVO, PageResponse } from "@/types/article"

// ═══════════════════════════════════════════
// 页面组件
// ═══════════════════════════════════════════

export default function UserArticlesPage() {
  const params = useParams()
  const userId = Number(params.id)

  const [data, setData] = React.useState<PageResponse<ArticleListVO>>()
  const [loading, setLoading] = React.useState(true)
  const [page, setPage] = React.useState(1)
  const [articles, setArticles] = React.useState<ArticleListVO[]>([])
  const [hasMore, setHasMore] = React.useState(true)

  // 获取用户信息（从第一篇文章中提取）
  const firstArticle = mockArticles.find((a) => a.authorId === userId)
  const user = firstArticle
    ? {
        id: userId,
        name: firstArticle.authorName,
        avatar: firstArticle.authorAvatar,
      }
    : null

  // ─────────────────────────────────────────────────────
  // 加载用户文章
  // ─────────────────────────────────────────────────────
  React.useEffect(() => {
    setLoading(true)
    getMockUserArticles(userId, { pageNum: 1, pageSize: 9 })
      .then((res) => {
        setData(res)
        setArticles(res.records)
        setHasMore(res.current < res.pages)
      })
      .finally(() => setLoading(false))
  }, [userId])

  // ─────────────────────────────────────────────────────
  // 加载更多
  // ─────────────────────────────────────────────────────
  const handleLoadMore = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const nextPage = page + 1
      const res = await getMockUserArticles(userId, { pageNum: nextPage, pageSize: 9 })
      setArticles((prev) => [...prev, ...res.records])
      setPage(nextPage)
      setHasMore(nextPage < res.pages)
    } finally {
      setLoading(false)
    }
  }

  // ─────────────────────────────────────────────────────
  // 用户不存在
  // ─────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">CodeHub</h1>
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">用户不存在</p>
            <Link
              href="/articles"
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              返回文章列表
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">CodeHub</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              首页
            </Link>
            <Link href="/articles" className="text-primary font-medium">
              文章
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              专栏
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* 返回导航 */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回文章列表
        </Link>

        {/* 用户信息卡片 */}
        <div className="mb-8">
          <UserProfileCard user={user} articleCount={data?.total} />
        </div>

        {/* 文章列表 */}
        {loading && articles.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-[2/1] bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-6 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
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
            <p className="text-lg font-medium">该用户暂无文章</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* 加载更多 */}
            {hasMore && (
              <div className="flex justify-center pt-8">
                <Button variant="outline" onClick={handleLoadMore} disabled={loading}>
                  {loading ? "加载中..." : "加载更多"}
                </Button>
              </div>
            )}

            {!hasMore && articles.length > 0 && (
              <div className="text-center text-sm text-muted-foreground py-8">
                已加载全部 {data?.total} 篇文章
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Built with Next.js 15, shadcn/ui, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
