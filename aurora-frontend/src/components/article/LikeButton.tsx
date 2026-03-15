/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   点赞按钮组件
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/user"

// ═══════════════════════════════════════════
// Props 定义
// ═══════════════════════════════════════════

interface LikeButtonProps {
  isLiked: boolean
  likeCount: number
  onToggle: () => void
  showLoginPrompt: () => void
}

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function LikeButton({
  isLiked,
  likeCount,
  onToggle,
  showLoginPrompt,
}: LikeButtonProps) {
  const { isAuthenticated } = useUserStore()

  const handleClick = () => {
    if (!isAuthenticated) {
      showLoginPrompt()
      return
    }
    onToggle()
  }

  return (
    <Button
      variant={isLiked ? "default" : "outline"}
      size="lg"
      onClick={handleClick}
      className={`gap-2 ${isLiked ? "bg-red-500 hover:bg-red-600 text-white" : ""}`}
    >
      <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
      <span>{isLiked ? "已点赞" : "点赞"}</span>
      <span className="text-sm opacity-80">({likeCount})</span>
    </Button>
  )
}
