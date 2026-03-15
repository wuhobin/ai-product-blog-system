/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   收藏按钮组件
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/user"

// ═══════════════════════════════════════════
// Props 定义
// ═══════════════════════════════════════════

interface FavoriteButtonProps {
  isFavorited: boolean
  favoriteCount: number
  onToggle: () => void
  showLoginPrompt: () => void
}

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function FavoriteButton({
  isFavorited,
  favoriteCount,
  onToggle,
  showLoginPrompt,
}: FavoriteButtonProps) {
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
      variant={isFavorited ? "default" : "outline"}
      size="lg"
      onClick={handleClick}
      className={`gap-2 ${isFavorited ? "bg-yellow-500 hover:bg-yellow-600 text-white" : ""}`}
    >
      <Bookmark className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
      <span>{isFavorited ? "已收藏" : "收藏"}</span>
      <span className="text-sm opacity-80">({favoriteCount})</span>
    </Button>
  )
}
