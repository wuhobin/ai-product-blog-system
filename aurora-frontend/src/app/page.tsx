"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { BarChart3, Users, FileText, Settings, Lock, Mail } from "lucide-react"

// 重定向到微信登录页面
export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <meta http-equiv="refresh" content="0; url=/wechat-login" />
    </div>
  )
}
