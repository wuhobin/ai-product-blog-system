import type { ApiResponse, User } from "@/types"
import { get } from "./request"

// ─────────────────────────────────────────────────────
// 微信登录相关 API
// ─────────────────────────────────────────────────────

// 获取微信登录验证码（无需 token）
export const getWechatLoginCode = async (): Promise<ApiResponse<string>> => {
  const data = await get<string>("/auth/wechat/getCode", { skipAuth: true })
  // 处理返回格式：{"code":200,"message":"success","data":"AU9105","extra":{}}
  return data
}

// 检查微信登录状态（无需 token）
export const checkWechatLoginStatus = async (
  loginCode: string
): Promise<ApiResponse<User & { token: string }>> => {
  return get<User & { token: string }>(`/auth/wechat/isLogin/${loginCode}`, { skipAuth: true })
}

// ─────────────────────────────────────────────────────
// 用户退出登录
// ─────────────────────────────────────────────────────

export const logout = async (): Promise<ApiResponse<void>> => {
  return get<void>("/auth/user/logout")
}
