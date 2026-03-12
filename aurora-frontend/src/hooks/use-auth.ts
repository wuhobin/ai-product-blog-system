import { useUserStore } from "@/store/user"
import { getWechatLoginCode, checkWechatLoginStatus } from "@/lib/wechat-auth"

export function useAuth() {
  const { user, token, isAuthenticated, setUser, setToken, logout } = useUserStore()

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login API call
    console.log("Login:", { email, password })
  }

  const wechatLogin = async () => {
    try {
      // 获取微信登录验证码
      const response = await getWechatLoginCode()
      const loginCode = response.data.loginCode

      return { loginCode }
    } catch (error) {
      console.error('微信登录失败:', error)
      throw error
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    wechatLogin,
  }
}
