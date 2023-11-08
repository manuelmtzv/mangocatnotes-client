import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const username = useStorage("username", "");
  const jwt = useStorage("jwt", "");

  const isLoggedIn = () => {
    return !!jwt.value;
  };

  const setUser = (newUsername: string) => {
    username.value = newUsername;
    localStorage.setItem("username", newUsername);
  };

  const setJwt = (newJwt: string) => {
    jwt.value = newJwt;
    localStorage.setItem("jwt", newJwt);
  };

  const logout = () => {
    username.value = undefined;
    jwt.value = "";
  };

  return {
    username,
    jwt,
    isLoggedIn,
    setUser,
    setJwt,
    logout,
  };
});
