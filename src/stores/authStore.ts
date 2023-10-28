import { defineStore } from 'pinia'
import { IUser } from '@/interfaces/IUser'

export const useAuthStore = defineStore('authStore', {
  state: (): { user: IUser | null } => ({
    user: null,
  }),
  getters: {
    isLoggedIn(): boolean {
      return !!this.user
    },
  },
  actions: {
    setUser(user: IUser): void {
      this.user = user
    },
    logout(): void {
      this.user = null
    },
  },
})
