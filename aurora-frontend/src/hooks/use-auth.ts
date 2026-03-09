import { useUserStore } from "@/store/user"

export function useAuth() {
  const { user, token, isAuthenticated, setUser, setToken, logout } = useUserStore()

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login API call
    console.log("Login:", { email, password })
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  }
}
