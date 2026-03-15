/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   作者信息卡片组件
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import Link from "next/link"
import type { ArticleDetailVO } from "@/types/article"

// ═══════════════════════════════════════════
// Props 定义
// ═══════════════════════════════════════════

interface AuthorCardProps {
  author: {
    id: number
    name: string
    avatar?: string
    bio?: string
  }
}

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function AuthorCard({ author }: AuthorCardProps) {
  const { id, name, avatar, bio } = author

  return (
    <div className="bg-card border rounded-xl p-4">
      <div className="flex items-start gap-4">
        {/* 头像 */}
        <Link href={`/user/${id}/articles`}>
          <img
            src={avatar || `https://api.dicebear.com/6.x/avataaars/svg?seed=${name}`}
            alt={name}
            className="w-14 h-14 rounded-full object-cover hover:ring-2 hover:ring-primary transition-all"
          />
        </Link>

        {/* 信息 */}
        <div className="flex-1 min-w-0">
          <Link
            href={`/user/${id}/articles`}
            className="font-semibold hover:text-primary transition-colors"
          >
            {name}
          </Link>
          {bio && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{bio}</p>
          )}
          <Link
            href={`/user/${id}/articles`}
            className="inline-block mt-2 text-xs text-primary hover:underline"
          >
            查看TA的文章 →
          </Link>
        </div>
      </div>
    </div>
  )
}
