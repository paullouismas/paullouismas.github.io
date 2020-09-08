<template>
  <div id="app">
    <Navbar :fixed-top="true" />

    <router-view />

    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Navbar,
    Footer
  }
})
</script>

<style lang="less">
</style>
