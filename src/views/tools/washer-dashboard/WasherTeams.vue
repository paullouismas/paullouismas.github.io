<template>
  <div>
    <h1 class="title is-1">
      Teams
    </h1>

    <WasherTeamItem v-for="team in teams" :key="team._id" :team="team" />

    <WasherNewTeam />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import WasherTeamItem from './WasherTeamItem.vue'
import WasherNewTeam from './WasherNewTeam.vue'
import { Iteam } from './Team'

export default Vue.extend({
  name: 'WasherTeams',
  components: {
    WasherTeamItem,
    WasherNewTeam
  },
  methods: {
    //
  },
  computed: {
    teams() {
      return this.$store.state.WasherDashboard.teams as Iteam[]
    }
  }
})
</script>

<style lang="less">
</style>
