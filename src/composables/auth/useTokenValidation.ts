import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { IAuthResponse } from '@/interfaces/auth'

export const useTokenValidation = () => {
  const authStore = useAuthStore()
  const baseUrl = import.meta.env.VITE_MANGOCATAPI_URL
  const { jwt } = storeToRefs(authStore)

  const setUserData = (data: IAuthResponse) => {
    authStore.setUser(data.username)
    authStore.setJwt(data.token)
  }

  const validateToken = async (): Promise<IAuthResponse | void> => {
    try {
      const { data } = await axios.get<IAuthResponse>(
        `${baseUrl}/auth/validate-token`,
        {
          headers: {
            Authorization: `Bearer ${jwt.value}`,
          },
        }
      )
      setUserData(data)
      return data
    } catch (err: AxiosError | any) {
      if (err.response.status === 401) {
        authStore.logout()
      }
    }
  }

  return {
    validateToken,
    jwt,
  }
}
