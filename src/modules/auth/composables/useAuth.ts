// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { isAxiosError } from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useQueryClient } from "@tanstack/vue-query";
import { useAuthStore } from "@/modules/auth/stores/authStore";
import {
  ILoginForm,
  IRegisterForm,
  IAuthResponse,
} from "@/modules/auth/interfaces";
import { mangocatnotesApi } from "@/shared/api/mangocatnotesApi";
import { getErrors } from "@/shared/utils/getErrors";

const useAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const baseUrl = import.meta.env.VITE_MANGOCATAPI_URL;
  const error = ref<string>();
  const isLoading = ref(false);
  const { username, isAuthenticated } = storeToRefs(authStore);
  const queryClient = useQueryClient();

  const initializeState = () => {
    error.value = undefined;
    isLoading.value = true;
  };

  const setUserData = (data: IAuthResponse) => {
    authStore.setUser(data.username);
    authStore.setAuthenticated(true);
  };

  const login = async (loginForm: ILoginForm) => {
    initializeState();
    try {
      const { data } = await mangocatnotesApi.post<IAuthResponse>(
        `${baseUrl}/auth/login`,
        loginForm,
      );
      setUserData(data);
      router.push({ name: "home" });
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        error.value = err.response?.data.message;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (registerForm: IRegisterForm) => {
    initializeState();
    try {
      const { data } = await mangocatnotesApi.post<IAuthResponse>(
        `${baseUrl}/auth/register`,
        registerForm,
      );
      setUserData(data);
      router.push({ name: "home" });
    } catch (err: unknown) {
      error.value = getErrors(err).at(0);
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    await mangocatnotesApi.post(`${baseUrl}/auth/logout`);

    queryClient.clear();
    authStore.logout();
    router.push("/");
  };

  return {
    username,
    isAuthenticated,
    error,
    isLoading,

    login,
    register,
    logout,
  };
};

export default useAuth;
