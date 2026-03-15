"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
}

export function CodeBlock({ children, className }: CodeBlockProps) {
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
      <pre ref={preRef} className={className}>
        {children}
      </pre>
      {/* ─────────────────────────────────────────────────────
          复制按钮
         ───────────────────────────────────────────────────── */}
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
