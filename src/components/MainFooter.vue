<template>
  <PageFooter>
    <p>
      <a href="https://bulma.io" target="_blank">
        <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24">
      </a>
    </p>

    <p>
      by

      <router-link :to="{ name: 'Root' }">
        Paul-Louis Mas
      </router-link>
    </p>
  </PageFooter>
</template>

<script lang="ts">
import Vue from 'vue'

import PageFooter from '@/components/reusable/PageFooter.vue'

export default Vue.extend({
  name: 'MainFooter',
  components: {
    PageFooter
  }
})
</script>

<style lang="less">
</style>
