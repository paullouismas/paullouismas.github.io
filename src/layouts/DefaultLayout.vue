<template>
  <div>
    <MainNavbar />

    <slot />

    <MainFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import MainNavbar from '@/components/MainNavbar.vue'
import MainFooter from '@/components/MainFooter.vue'

export default Vue.extend({
  name: 'DefaultLayout',
  components: {
    MainNavbar,
    MainFooter
  }
})
</script>

<style lang="less">
</style>
