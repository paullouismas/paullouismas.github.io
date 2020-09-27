<template>
  <router-view />
</template>

<script lang="ts">
import Vue from 'vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default Vue.extend({
  name: 'Tools',
  created() {
    this.$store.state.layout = DefaultLayout

    document.title = 'Tools'
  }
})
</script>

<style lang="less">
</style>
