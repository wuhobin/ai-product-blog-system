/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章互动按钮组
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import { LikeButton } from "./LikeButton"
import { FavoriteButton } from "./FavoriteButton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// ═══════════════════════════════════════════
// Props 定义
// ═══════════════════════════════════════════

interface ArticleInteractionProps {
  articleId: number
  isLiked: boolean
  isFavorited: boolean
  likeCount: number
  favoriteCount: number
}

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function ArticleInteraction({
  articleId,
  isLiked: initialIsLiked,
  isFavorited: initialIsFavorited,
  likeCount: initialLikeCount,
  favoriteCount: initialFavoriteCount,
}: ArticleInteractionProps) {
  // ─────────────────────────────────────────────────────
  // 本地状态（Mock 阶段）
  // ─────────────────────────────────────────────────────
  const [isLiked, setIsLiked] = React.useState(initialIsLiked)
  const [isFavorited, setIsFavorited] = React.useState(initialIsFavorited)
  const [likeCount, setLikeCount] = React.useState(initialLikeCount)
  const [favoriteCount, setFavoriteCount] = React.useState(initialFavoriteCount)
  const [showLoginDialog, setShowLoginDialog] = React.useState(false)

  // ─────────────────────────────────────────────────────
  // 点赞切换
  // ─────────────────────────────────────────────────────
  const handleLikeToggle = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  // ─────────────────────────────────────────────────────
  // 收藏切换
  // ─────────────────────────────────────────────────────
  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited)
    setFavoriteCount((prev) => (isFavorited ? prev - 1 : prev + 1))
  }

  // ─────────────────────────────────────────────────────
  // 登录提示
  // ─────────────────────────────────────────────────────
  const showLoginPrompt = () => {
    setShowLoginDialog(true)
  }

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <LikeButton
          isLiked={isLiked}
          likeCount={likeCount}
          onToggle={handleLikeToggle}
          showLoginPrompt={showLoginPrompt}
        />
        <FavoriteButton
          isFavorited={isFavorited}
          favoriteCount={favoriteCount}
          onToggle={handleFavoriteToggle}
          showLoginPrompt={showLoginPrompt}
        />
      </div>

      {/* 登录提示弹窗 */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>请先登录</DialogTitle>
            <DialogDescription>
              登录后即可点赞和收藏文章
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <a
              href="/"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              去登录
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
