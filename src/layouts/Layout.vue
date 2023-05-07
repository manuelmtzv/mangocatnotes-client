<template>
  <Header />

  <main class="principle content">
    <router-view></router-view>
  </main>

  <Footer />
</template>

<script>
import Footer from './Footer.vue'
import Header from './Header.vue'

export default {
  components: { Header, Footer },
  name: 'Layout',
}
</script>
