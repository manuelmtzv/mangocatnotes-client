<script setup lang="ts">
import { reactive } from "vue";
import { IRegisterForm } from "@/interfaces/auth";
import useAuth from "@/composables/auth/useAuth";
import LoadingSpin from "@/components/general/LoadingSpin.vue";

const { register, error, isLoading } = useAuth();
const registerForm: IRegisterForm = reactive({
  name: "",
  username: "",
  email: "",
  password: "",
});

const onSubmit = () => {
  register(registerForm);
};
</script>

<template>
  <div class="py-6 mb-4">
    <form
      class="max-w-md mx-auto grid gap-4 p-4 border rounded-md mt-4"
      @submit.prevent="onSubmit"
    >
      <h2 class="text-2xl font-semibold text-center">Register form</h2>

      <hr />

      <p v-if="error" class="error">{{ error }}</p>

      <label class="label">
        Name:
        <input v-model="registerForm.name" class="input" type="text" />
      </label>

      <label class="label">
        Username:
        <input v-model="registerForm.username" class="input" type="text" />
      </label>

      <label class="label">
        Email:
        <input v-model="registerForm.email" class="input" type="email" />
      </label>

      <label class="label">
        Password:
        <input v-model="registerForm.password" class="input" type="password" />
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
