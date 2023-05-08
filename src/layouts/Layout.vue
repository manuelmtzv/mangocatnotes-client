<template>
  <Header />

  <main class="principle content">
    <router-view></router-view>
  </main>

  <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Footer from './Footer.vue'
import Header from './Header.vue'

export default defineComponent({
  name: 'Layout',
  components: { Header, Footer },
})
</script>
