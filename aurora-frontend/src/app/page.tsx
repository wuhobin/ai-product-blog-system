"use client"

import * as React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpen, LogOut, User, QrCode, PenTool, Code2, Users, MessageCircle, Sparkles, ArrowRight } from "lucide-react"
import { ArticleList } from "@/components/article/ArticleList"
import { getMockArticles } from "@/mock/articles"
import type { ArticleListVO, PageResponse } from "@/types/article"
import { useUserStore } from "@/store/user"
import { useAuth } from "@/hooks/use-auth"
import { checkWechatLoginStatus } from "@/lib/wechat-auth"

export default function HomePage() {
  const { user, isAuthenticated, setUser, setToken, logout } = useUserStore()
  const { wechatLogin } = useAuth()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [loginCode, setLoginCode] = useState("")
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

  // 文章列表数据
  const [data, setData] = useState<PageResponse<ArticleListVO>>()
  const [loading, setLoading] = useState(true)

  // 加载文章数据
  useEffect(() => {
    setLoading(true)
    getMockArticles({ pageNum: 1, pageSize: 6 })
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  // 加载更多
  const handleLoadMore = async (page: number) => {
    return getMockArticles({ pageNum: page, pageSize: 6 })
  }

  // ─────────────────────────────────────────────────────
  // 弹窗打开时获取验证码
  // ─────────────────────────────────────────────────────
  useEffect(() => {
    if (dialogOpen) {
      const fetchCode = async () => {
        try {
          const result = await wechatLogin()
          if (result) {
            setLoginCode(result.loginCode)
          }
        } catch (error) {
          console.error("获取验证码失败:", error)
        }
      }
      fetchCode()
    } else {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
      }
      setLoginCode("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen])

  // ─────────────────────────────────────────────────────
  // 轮询检查登录状态
  // ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!loginCode || !dialogOpen) return

    if (pollingRef.current) {
      clearInterval(pollingRef.current)
    }

    pollingRef.current = setInterval(async () => {
      try {
        const response = await checkWechatLoginStatus(loginCode)

        if (response.code === 200 && response.data) {
          const userData = response.data as any
          const { token } = userData

          if (userData && token) {
            setUser(userData)
            setToken(token)

            if (pollingRef.current) {
              clearInterval(pollingRef.current)
              pollingRef.current = null
            }

            setDialogOpen(false)
          }
        }
      } catch (error) {
        console.log("等待登录...", error)
      }
    }, 3000)

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
      }
    }
  }, [dialogOpen, setUser, setToken])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">CodeHub</h1>
          </Link>
          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="/" className="text-foreground hover:text-primary transition-colors">
                首页
              </a>
              <a href="/articles" className="text-muted-foreground hover:text-primary transition-colors">
                文章
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                专栏
              </a>
            </nav>

            {/* ─────────────────────────────────────────────────────
                用户状态：已登录显示头像，未登录显示登录按钮
               ───────────────────────────────────────────────────── */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer rounded-full p-0.5 hover:ring-2 hover:ring-primary/50 transition-all">
                    <img
                      src={user.avatar || `https://api.dicebear.com/6.x/pixel-art/svg?seed=${user.username}`}
                      alt={user.nickname}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5 text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {user.nickname}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-600 dark:text-red-400 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => setDialogOpen(true)}
                className="cursor-pointer rounded-full px-5 py-2 text-sm font-medium border border-primary/30 bg-background hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-200"
              >
                登录 / 注册
              </button>
            )}

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* 欢迎区域 */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">
            {isAuthenticated && user ? `欢迎回来，${user.nickname}！` : "探索技术，分享成长"}
          </h2>
          <p className="text-muted-foreground">
            {isAuthenticated && user ? "开始你的技术之旅" : "点击右上角「登录 / 注册」按钮加入社区"}
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            浏览文章
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 文章列表 */}
        <section className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">最新文章</h3>
            <Link href="/articles" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              查看更多 →
            </Link>
          </div>
          <div className="bg-card rounded-lg border">
            <ArticleList initialData={data} onLoadMore={handleLoadMore} />
          </div>
        </section>

        {/* 社区特色 */}
        <section>
          <h3 className="text-xl font-bold text-center mb-6">社区特色</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <PenTool className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">优质文章</h4>
              <p className="text-sm text-muted-foreground">
                高质量技术内容，覆盖前后端、架构、AI 等领域
              </p>
            </div>
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">技术交流</h4>
              <p className="text-sm text-muted-foreground">
                与志同道合的开发者交流，共同成长
              </p>
            </div>
            <div className="bg-card border rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">开源项目</h4>
              <p className="text-sm text-muted-foreground">
                实战代码示例，助你快速上手新技术
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 登录弹窗 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent onOpenChange={setDialogOpen} className="sm:max-w-3xl p-0 overflow-hidden flex">
          {/* 左侧提示区 */}
          <div className="hidden md:flex flex-col justify-center w-1/2 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 px-8 py-10 text-white">
            <DialogTitle className="text-2xl font-bold mb-2">CodeHub</DialogTitle>
            <p className="text-white/80 mb-8">技术人的成长社区</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">优质文章 技术分享</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">开源项目 实战代码</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">技术交流 认识伙伴</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">问答互助 解决难题</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">前沿资讯 行业动态</span>
              </div>
            </div>
          </div>

          {/* 右侧登录区 */}
          <div className="flex-1 flex flex-col">
            {/* 头部 - 移动端显示 */}
            <div className="md:hidden bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-center text-white">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <QrCode className="w-7 h-7 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-white">微信登录</DialogTitle>
              <DialogDescription className="text-white/80 mt-2">
                请使用微信扫描二维码完成登录
              </DialogDescription>
            </div>

            {/* 内容区 */}
            <div className="flex flex-col items-center justify-center flex-1 space-y-5 p-6">
              {/* 移动端隐藏的标题 */}
              <div className="hidden md:block text-center mb-2">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <QrCode className="w-7 h-7 text-white" />
                </div>
                <DialogTitle className="text-xl font-bold">微信登录</DialogTitle>
                <DialogDescription className="text-muted-foreground mt-1">
                  请使用微信扫描二维码完成登录
                </DialogDescription>
              </div>

              {/* 二维码 */}
              <div className="relative p-3 bg-muted/50 rounded-2xl">
                <img
                  src="/weChat.jpg"
                  alt="微信登录二维码"
                  className="w-48 h-48 object-cover rounded-xl shadow-md"
                />
              </div>

              {/* 验证码 */}
              {loginCode && (
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 px-5 py-2.5 rounded-xl inline-block border border-border/50">
                    <span className="text-sm font-medium">
                      验证码: <span className="font-mono text-primary">{loginCode}</span>
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    扫码后手机输入验证码登录
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t mt-12 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Built with Next.js 15, shadcn/ui, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
