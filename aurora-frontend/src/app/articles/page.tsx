/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章列表页面
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { BookOpen } from "lucide-react"
import { ArticleList } from "@/components/article/ArticleList"
import { ArticleSidebar } from "@/components/article/ArticleSidebar"
import { CategoryFilter } from "@/components/article/CategoryFilter"
import { TagFilter } from "@/components/article/TagFilter"
import { getMockArticles, mockCategories, mockTags } from "@/mock/articles"
import type { ArticleListVO, PageResponse } from "@/types/article"

// ═══════════════════════════════════════════
// 页面组件
// ═══════════════════════════════════════════

export default function ArticlesPage() {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get("category") ? Number(searchParams.get("category")) : undefined
  const tagId = searchParams.get("tag") ? Number(searchParams.get("tag")) : undefined

  const [data, setData] = React.useState<PageResponse<ArticleListVO>>()
  const [loading, setLoading] = React.useState(true)

  // ─────────────────────────────────────────────────────
  // 加载文章数据
  // ─────────────────────────────────────────────────────
  React.useEffect(() => {
    setLoading(true)
    getMockArticles({ pageNum: 1, pageSize: 9, categoryId, tagId })
      .then(setData)
      .finally(() => setLoading(false))
  }, [categoryId, tagId])

  // ─────────────────────────────────────────────────────
  // 加载更多
  // ─────────────────────────────────────────────────────
  const handleLoadMore = async (page: number) => {
    return getMockArticles({ pageNum: page, pageSize: 9, categoryId, tagId })
  }

  // ─────────────────────────────────────────────────────
  // 获取当前筛选名称
  // ─────────────────────────────────────────────────────
  const currentCategory = categoryId
    ? mockCategories.find((c) => c.id === categoryId)?.name
    : null
  const currentTag = tagId ? mockTags.find((t) => t.id === tagId)?.name : null

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
        {/* 页面标题 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {currentCategory || currentTag ? (
              <>
                {currentCategory && <span>分类: {currentCategory}</span>}
                {currentTag && <span>标签: {currentTag}</span>}
              </>
            ) : (
              "全部文章"
            )}
          </h2>
          <p className="text-muted-foreground mt-1">
            {data ? `共 ${data.total} 篇文章` : "加载中..."}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ─────────────────────────────────────────────────────
              左侧：筛选 + 文章列表
             ───────────────────────────────────────────────────── */}
          <div className="flex-1 space-y-6">
            {/* 筛选组件 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <CategoryFilter categories={mockCategories} activeId={categoryId} />
              <TagFilter tags={mockTags} activeId={tagId} />
            </div>

            {/* 文章列表 */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
            ) : (
              <ArticleList initialData={data} onLoadMore={handleLoadMore} />
            )}
          </div>

          {/* ─────────────────────────────────────────────────────
              右侧：侧边栏
             ───────────────────────────────────────────────────── */}
          <aside className="hidden lg:block w-80 shrink-0">
            <ArticleSidebar />
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
