/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   标签筛选组件
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { Tag as TagIcon } from "lucide-react"
import type { Tag } from "@/types/article"

// ═══════════════════════════════════════════
// Props 定义
// ═══════════════════════════════════════════

interface TagFilterProps {
  tags: Tag[]
  activeId?: number
}

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function TagFilter({ tags, activeId }: TagFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <TagIcon className="w-4 h-4 text-muted-foreground" />
      <Link
        href="/articles"
        className={`px-3 py-1 text-sm rounded-full transition-colors ${
          !activeId
            ? "bg-primary text-primary-foreground"
            : "bg-muted hover:bg-muted/80 text-muted-foreground"
        }`}
      >
        全部
      </Link>
      {tags.slice(0, 8).map((tag) => (
        <Link
          key={tag.id}
          href={`/articles?tag=${tag.id}`}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            activeId === tag.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 text-muted-foreground"
          }`}
          style={{
            borderColor: tag.color,
            borderWidth: activeId === tag.id ? 0 : 1,
          }}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  )
}
