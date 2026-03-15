import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/types"
import { logout as logoutApi } from "@/lib/wechat-auth"

interface UserState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  setToken: (token: string) => void
  login: (user: User, token: string) => void
  logout: () => Promise<void>
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (token) => set({ token }),
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: async () => {
        try {
          await logoutApi()
        } finally {
          set({ user: null, token: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
)
