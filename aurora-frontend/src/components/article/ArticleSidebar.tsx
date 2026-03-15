/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章侧边栏组件
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import { HotArticles } from "./HotArticles"
import { RecommendArticles } from "./RecommendArticles"

// ═══════════════════════════════════════════
// 骨架屏组件
// ═══════════════════════════════════════════

function SidebarSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2].map((i) => (
        <div key={i} className="bg-card border rounded-xl p-4 space-y-3 animate-pulse">
          <div className="h-5 bg-muted rounded w-24" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((j) => (
              <div key={j} className="flex gap-2">
                <div className="w-5 h-5 bg-muted rounded" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-2 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function ArticleSidebar() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <SidebarSkeleton />
  }

  return (
    <div className="space-y-6 sticky top-24">
      <HotArticles />
      <RecommendArticles />
    </div>
  )
}
