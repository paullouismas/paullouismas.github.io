<template>
  <section class="section">
    <div class="content">
      <Tabs :tabs="tabs" alignement="is-centered" :is-fullwidth="true" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import Tabs, { Itab } from '@/components/Tabs.vue'

export default Vue.extend({
  name: 'WasherDashboard',
  data() {
    return {
      tabs: [
        {
          displayName: 'Teams',
          component: () => import('./WasherTeams.vue')
        },
        {
          displayName: 'Score',
          component: () => import('./WasherScore.vue')
        },
        {
          displayName: 'Game',
          component: () => import('./WasherGame.vue')
        }
      ] as Itab[]
    }
  },
  components: {
    Tabs
  },
  mounted() {
    document.title = 'Washer Dashboard'
  }
})
</script>

<style lang="less">
  .tabs {
    & > ul {
      margin: 0;
    }
  }
</style>
