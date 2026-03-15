/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章详情组件
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { Eye, Heart, MessageCircle, Bookmark, Calendar, Clock, Copy, Check } from "lucide-react"
import type { ArticleDetailVO } from "@/types/article"
import { ArticleInteraction } from "./ArticleInteraction"

// ═══════════════════════════════════════════
// Props 定义
// ═══════════════════════════════════════════

interface ArticleDetailProps {
  article: ArticleDetailVO
}

// ═══════════════════════════════════════════
// 带复制功能的代码块组件
// ═══════════════════════════════════════════

function CodePre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = React.useState(false)
  const preRef = React.useRef<HTMLPreElement>(null)

  const handleCopy = async () => {
    if (preRef.current) {
      const code = preRef.current.textContent || ""
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("复制失败:", err)
      }
    }
  }

  return (
    <div className="relative group">
      <pre ref={preRef} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-md bg-white/10 hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-200"
        title={copied ? "已复制!" : "复制代码"}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </div>
  )
}

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function ArticleDetail({ article }: ArticleDetailProps) {
  const {
    id,
    title,
    content,
    summary,
    coverImage,
    categories,
    tags,
    viewCount,
    likeCount,
    commentCount,
    favoriteCount,
    isTop,
    isRecommend,
    createTime,
    updateTime,
  } = article

  return (
    <article className="bg-card border rounded-xl overflow-hidden">
      {/* ─────────────────────────────────────────────────────
          封面图
         ───────────────────────────────────────────────────── */}
      {coverImage && (
        <div className="aspect-[2/1] w-full overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────
          头部信息
         ───────────────────────────────────────────────────── */}
      <div className="p-6 border-b">
        {/* 标签 */}
        <div className="flex items-center gap-2 mb-4">
          {isTop === 1 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded">
              置顶
            </span>
          )}
          {isRecommend === 1 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-primary text-white rounded">
              推荐
            </span>
          )}
        </div>

        {/* 标题 */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>

        {/* 摘要 */}
        {summary && (
          <p className="text-muted-foreground mb-4 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
            {summary}
          </p>
        )}

        {/* 元信息 */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {createTime}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            更新于 {updateTime}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {viewCount} 阅读
          </span>
        </div>

        {/* 分类和标签 */}
        <div className="flex flex-wrap gap-4 mt-4">
          {categories.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">分类:</span>
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/articles?category=${category.id}`}
                  className="px-2 py-0.5 text-sm bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                >
                  {category.name}
                </a>
              ))}
            </div>
          )}
          {tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">标签:</span>
              {tags.map((tag) => (
                <a
                  key={tag.id}
                  href={`/articles?tag=${tag.id}`}
                  className="px-2 py-0.5 text-sm bg-muted hover:bg-muted/80 rounded transition-colors"
                  style={{ borderColor: tag.color }}
                >
                  {tag.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          文章内容 (Markdown)
         ───────────────────────────────────────────────────── */}
      <div className="p-6">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:leading-7 prose-a:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              pre: CodePre,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────
          底部互动区
         ───────────────────────────────────────────────────── */}
      <div className="p-6 border-t bg-muted/30">
        {/* 统计数据 */}
        <div className="flex items-center justify-center gap-6 mb-4 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {viewCount}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {likeCount}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {commentCount}
          </span>
          <span className="flex items-center gap-1">
            <Bookmark className="w-4 h-4" />
            {favoriteCount}
          </span>
        </div>

        {/* 互动按钮 */}
        <ArticleInteraction
          articleId={id}
          isLiked={article.isLiked}
          isFavorited={article.isFavorited}
          likeCount={likeCount}
          favoriteCount={favoriteCount}
        />
      </div>
    </article>
  )
}
