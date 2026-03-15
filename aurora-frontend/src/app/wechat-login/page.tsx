"use client"

import * as React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
import { BookOpen, QrCode, RefreshCw, Users, Sparkles, Code2, MessageCircle, PenTool, LogOut } from "lucide-react"
import { useUserStore } from "@/store/user"
import { useAuth } from "@/hooks/use-auth"
import { checkWechatLoginStatus } from "@/lib/wechat-auth"
import Link from "next/link"

const WechatLoginPage = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [loginCode, setLoginCode] = useState<string>("")
  const [isChecking, setIsChecking] = useState<boolean>(false)
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

  const { user, isAuthenticated, setUser, setToken, logout } = useUserStore()
  const { wechatLogin } = useAuth()

  // 弹窗打开时获取验证码
  useEffect(() => {
    if (dialogOpen) {
      const fetchCode = async () => {
        try {
          setIsChecking(false)
          const result = await wechatLogin()
          if (result) {
            setLoginCode(result.loginCode)
          }
        } catch (error) {
          console.error('获取验证码失败:', error)
        }
      }
      fetchCode()
    } else {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
      }
      setLoginCode("")
      setIsChecking(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogOpen])

  // 验证码更新后开始轮询
  useEffect(() => {
    if (!loginCode || !dialogOpen) return

    if (pollingRef.current) {
      clearInterval(pollingRef.current)
    }

    pollingRef.current = setInterval(async () => {
      try {
        setIsChecking(true)
        const response = await checkWechatLoginStatus(loginCode)

        // ─────────────────────────────────────────────────────
        // API 返回格式: { id, username, nickname, avatar, token, ... }
        // data 直接是用户对象，token 在 data 内
        // ─────────────────────────────────────────────────────
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
            window.location.href = '/'
          }
        }
      } catch (error) {
        console.log('等待登录...', error)
        setIsChecking(false)
      }
    }, 3000)

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
      }
    }
  }, [loginCode, dialogOpen, setUser, setToken])

  // 手动刷新验证码
  const refreshLoginCode = async () => {
    try {
      setIsChecking(false)
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
      }
      const result = await wechatLogin()
      if (result) {
        setLoginCode(result.loginCode)
      }
    } catch (error) {
      console.error('刷新验证码失败:', error)
    }
  }

  // 清理轮询
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
      }
    }
  }, [])

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
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                首页
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
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
                  <div className="px-2 py-1.5 text-sm font-medium">{user.nickname}</div>
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
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">探索技术，分享成长</h2>
            <p className="text-muted-foreground">点击右上角"登录 / 注册"按钮加入社区</p>
          </div>
        </div>
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

export default WechatLoginPage
