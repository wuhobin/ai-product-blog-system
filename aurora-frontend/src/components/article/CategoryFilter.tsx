/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   分类筛选组件
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { Folder } from "lucide-react"
import type { Category } from "@/types/article"

// ═══════════════════════════════════════════
// Props 定义
// ═══════════════════════════════════════════

interface CategoryFilterProps {
  categories: Category[]
  activeId?: number
}

// ═══════════════════════════════════════════
// 组件实现
// ═══════════════════════════════════════════

export function CategoryFilter({ categories, activeId }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Folder className="w-4 h-4 text-muted-foreground" />
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
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/articles?category=${category.id}`}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            activeId === category.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 text-muted-foreground"
          }`}
        >
          {category.name}
          {category.articleCount !== undefined && (
            <span className="ml-1 opacity-70">({category.articleCount})</span>
          )}
        </Link>
      ))}
    </div>
  )
}
