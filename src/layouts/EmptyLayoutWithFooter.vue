<template>
  <div>
    <slot />

    <MainFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import MainFooter from '@/components/MainFooter.vue'

export default Vue.extend({
  name: 'EmptyLayoutWithFooter',
  components: {
    MainFooter
  }
})
</script>

<style lang="less">
</style>
