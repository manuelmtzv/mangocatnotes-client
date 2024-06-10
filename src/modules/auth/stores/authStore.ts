import { defineStore } from "pinia";
import { ref } from "vue";
import { useNotePaginationStore, useNoteStore } from "@/modules/note/stores";

export const useAuthStore = defineStore("auth", () => {
  const username = ref<string | undefined>("");
  const isAuthenticated = ref<boolean>(false);

  const noteStore = useNoteStore();
  const notePaginatioStore = useNotePaginationStore();

  const isLoggedIn = () => {
    return !!username.value;
  };

  const setUser = (newUsername: string) => {
    username.value = newUsername;
    localStorage.setItem("username", newUsername);
  };

  const setAuthenticated = (authenticated: boolean) => {
    isAuthenticated.value = authenticated;
  };

  const logout = () => {
    username.value = undefined;

    noteStore.resetState();
    notePaginatioStore.resetState();
  };

  return {
    username,
    isAuthenticated,
    isLoggedIn,
    setUser,
    setAuthenticated,
    logout,
  };
});
