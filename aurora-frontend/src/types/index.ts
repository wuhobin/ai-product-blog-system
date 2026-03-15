// User types
export interface User {
  id: number
  username: string
  nickname: string
  avatar?: string
  token?: string
  permissions?: string[] | null
  roles?: string[] | null
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number
  totalPosts: number
  activeSessions: number
  serverLoad: number
}

export interface Activity {
  id: string
  action: string
  user: string
  timestamp: string
  description?: string
}

// Common types
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}
