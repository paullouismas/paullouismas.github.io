<template>
  <section class="section">
    <div class="content">
      <div class="tabs is-centered is-fullwidth is-medium">
        <ul>
          <li :class="{ 'is-active': activeTab === 'Teams' }">
            <a @click="$store.commit('WasherDashboard/setActiveTab', 'Teams')">
              Teams
            </a>
          </li>

          <li :class="{ 'is-active': activeTab === 'Score' }">
            <a @click="$store.commit('WasherDashboard/setActiveTab', 'Score')">
              Score
            </a>
          </li>

          <li :class="{ 'is-active': activeTab === 'Game' }">
            <a @click="$store.commit('WasherDashboard/setActiveTab', 'Game')">
              Game
            </a>
          </li>
        </ul>
      </div>

      <WasherTeams v-if="activeTab === 'Teams'" />

      <WasherScore v-if="activeTab === 'Score'" />

      <WasherGame v-if="activeTab === 'Game'" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import WasherTeams from './WasherTeams.vue'
import WasherScore from './WasherScore.vue'
import WasherGame from './WasherGame.vue'
import { IdashboardState } from './DashboardState'

export default Vue.extend({
  name: 'WasherDashboard',
  components: {
    WasherTeams,
    WasherScore,
    WasherGame
  },
  mounted() {
    document.title = 'Washer Dashboard'
  },
  computed: {
    activeTab() {
      return (this.$store.state.WasherDashboard as IdashboardState).tabs.activeTab
    }
  }
})
</script>

<style lang="less">
</style>
