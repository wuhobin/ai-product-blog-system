import { ApiResponse } from "@/types"

// 获取微信登录验证码
export const getWechatLoginCode = async (): Promise<ApiResponse<{ code: string; loginCode: string }>> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/wechat/getCode`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('获取验证码失败')
    }

    const data: ApiResponse<{ code: string; loginCode: string }> = await response.json()

    // 处理返回格式：{"code":200,"message":"success","data":"AU9105","extra":{}}
    if (data.data && typeof data.data === 'string') {
      return {
        code: data.code,
        message: data.message,
        data: {
          code: 'success',
          loginCode: data.data
        }
      }
    }

    return data
  } catch (error) {
    console.error('获取验证码失败:', error)
    throw error
  }
}

// 检查微信登录状态
export const checkWechatLoginStatus = async (loginCode: string): Promise<ApiResponse<{ user: any; token: string }>> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/wechat/isLogin/${loginCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('检查登录状态失败')
    }

    const data: ApiResponse<{ user: any; token: string }> = await response.json()
    return data
  } catch (error) {
    console.error('检查登录状态失败:', error)
    throw error
  }
}