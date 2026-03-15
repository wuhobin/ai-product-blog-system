/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   用户信息卡片组件
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"

// ═══════════════════════════════════════════
// Props 定义
// ═══════════════════════════════════════════

interface UserProfileCardProps {
  user: {
    id: number
    name: string
    avatar?: string
    bio?: string
  }
  articleCount?: number
}

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function UserProfileCard({ user, articleCount }: UserProfileCardProps) {
  const { id, name, avatar, bio } = user

  return (
    <div className="bg-card border rounded-xl p-6 text-center">
      {/* 头像 */}
      <img
        src={avatar || `https://api.dicebear.com/6.x/avataaars/svg?seed=${name}`}
        alt={name}
        className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-primary/10"
      />

      {/* 用户名 */}
      <h2 className="text-xl font-bold mb-2">{name}</h2>

      {/* 简介 */}
      {bio && (
        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">{bio}</p>
      )}

      {/* 统计 */}
      {articleCount !== undefined && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
          <span className="font-medium">{articleCount}</span>
          <span className="text-muted-foreground">篇文章</span>
        </div>
      )}
    </div>
  )
}
