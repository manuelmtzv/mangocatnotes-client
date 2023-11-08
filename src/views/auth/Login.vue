<script setup lang="ts">
import { reactive } from "vue";
import { ILoginForm } from "@/interfaces/auth";
import useAuth from "@/composables/auth/useAuth";
import LoadingSpin from "@/components/LoadingSpin.vue";

const { login, error, isLoading } = useAuth();
const loginForm: ILoginForm = reactive({
  identifier: "",
  password: "",
});

const onSubmit = () => {
  login(loginForm);
};
</script>

<template>
  <div class="py-6 mb-4">
    <form
      class="max-w-md mx-auto grid gap-4 p-4 border rounded-md mt-4"
      @submit.prevent="onSubmit"
    >
      <h2 class="text-2xl font-semibold text-center">Login form</h2>

      <hr />

      <p v-if="error" class="error">{{ error }}</p>

      <label class="label">
        Email or username:
        <input v-model="loginForm.identifier" class="input" type="text" />
      </label>

      <label class="label">
        Password:
        <input v-model="loginForm.password" class="input" type="password" />
      </label>

      <button
        type="submit"
        class="button submit !w-full inline-flex justify-center gap-2 items-center"
      >
        <span>Submit</span>

        <LoadingSpin :when="isLoading" class="!h-4 !w-4" />
      </button>
    </form>
  </div>
</template>

<style scoped></style>
@/composables/auth/useAuth
