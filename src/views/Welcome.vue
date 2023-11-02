<script setup lang="ts">
import pen from "@/assets/imgs/pen.png";
import devices from "@/assets/imgs/devices.png";
import tags from "@/assets/imgs/tags.png";
</script>

<template>
  <div class="py-6 mb-4 grid gap-10">
    <div class="welcome">
      <h1 class="text-3xl font-bold">Hello! Welcome to Mangocatnotes.</h1>

      <div>
        <p class="text-2xl font-medium">
          Sign up now to start organizing your notes. Access them from anywhere.
          🐱🥭
        </p>
      </div>
    </div>

    <div class="features__container">
      <div class="features">
        <figure class="feature">
          <img :src="pen" alt="Writing pencil icon" />

          <p class="message"><span>Free Note Management:</span> Create and manage your notes without any cost.</p>
        </figure>

        

        <figure class="feature">
          <img :src="devices" alt="Writing pencil icon" />

          <p class="message"><span>Universal Access:</span> Log in from any device with a web browser for seamless access.</p>
        </figure>

        <figure class="feature">
          <img :src="tags" alt="Writing pencil icon" />
          

          <p class="message"><span>Custom Tags:</span> Organize your notes efficiently by adding personalized tags.</p>
        </figure>
      </div>

      <hr class="w-full" />
    </div>
  </div>
</template>

<style scoped>
.welcome {
  @apply flex flex-col gap-4 min-h-[calc(100svh-120px)];
}
.features__container {
  @apply flex flex-col items-center gap-4;
}
.features {
  @apply grid grid-cols-3 w-full gap-4;
}
.feature {
  @apply flex flex-1 h-full flex-col items-center gap-4;
}
.feature img {
  @apply w-full max-w-[10rem];
}
.message span {
  @apply font-bold;
}
</style>
