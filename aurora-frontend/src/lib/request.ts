import { useUserStore } from "@/store/user"
import type { ApiResponse } from "@/types"

// ─────────────────────────────────────────────────────
// 统一请求封装
// 自动在 header 中携带 Authorization token
// ─────────────────────────────────────────────────────

interface RequestOptions extends RequestInit {
  skipAuth?: boolean // 是否跳过认证（登录接口不需要 token）
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { skipAuth = false, headers = {}, ...rest } = options

  // 自动添加 Authorization header
  const token = useUserStore.getState().token
  const authHeader: HeadersInit = {}
  if (!skipAuth && token) {
    authHeader["Authorization"] = token
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...headers,
    },
  })

  if (!response.ok) {
    throw new Error(`请求失败: ${response.status}`)
  }

  return response.json()
}

// ─────────────────────────────────────────────────────
// 便捷方法
// ─────────────────────────────────────────────────────

export const get = <T>(url: string, options?: RequestOptions) =>
  request<T>(url, { ...options, method: "GET" })

export const post = <T>(url: string, body?: unknown, options?: RequestOptions) =>
  request<T>(url, { ...options, method: "POST", body: JSON.stringify(body) })
