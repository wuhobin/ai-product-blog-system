/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章详情页面
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { BookOpen, ArrowLeft, Home } from "lucide-react"
import { ArticleDetail } from "@/components/article/ArticleDetail"
import { AuthorCard } from "@/components/article/AuthorCard"
import { RecommendArticles } from "@/components/article/RecommendArticles"
import { getMockArticleDetail } from "@/mock/articles"
import type { ArticleDetailVO } from "@/types/article"

// ═══════════════════════════════════════════
// 页面组件
// ═══════════════════════════════════════════

export default function ArticleDetailPage() {
  const params = useParams()
  const articleId = Number(params.id)

  const [article, setArticle] = React.useState<ArticleDetailVO | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  // ─────────────────────────────────────────────────────
  // 加载文章详情
  // ─────────────────────────────────────────────────────
  React.useEffect(() => {
    setLoading(true)
    setError(false)

    getMockArticleDetail(articleId)
      .then((data) => {
        if (data) {
          setArticle(data)
        } else {
          setError(true)
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [articleId])

  // ─────────────────────────────────────────────────────
  // 加载状态
  // ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">CodeHub</h1>
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="aspect-[2/1] bg-muted rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────
  // 错误状态
  // ─────────────────────────────────────────────────────
  if (error || !article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-medium">文章不存在</p>
            <p className="text-sm mt-2">该文章可能已被删除或地址错误</p>
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
              <Home className="w-4 h-4 inline mr-1" />
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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ─────────────────────────────────────────────────────
              左侧：文章详情
             ───────────────────────────────────────────────────── */}
          <div className="flex-1 space-y-6">
            <ArticleDetail article={article} />
          </div>

          {/* ─────────────────────────────────────────────────────
              右侧：侧边栏
             ───────────────────────────────────────────────────── */}
          <aside className="hidden lg:block w-80 shrink-0 space-y-6">
            {/* 作者卡片 */}
            <AuthorCard
              author={{
                id: article.authorId,
                name: article.authorName,
                avatar: article.authorAvatar,
                bio: article.authorBio,
              }}
            />
            {/* 推荐文章 */}
            <RecommendArticles />
          </aside>
        </div>
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
