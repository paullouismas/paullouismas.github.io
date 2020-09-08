<template>
  <div>
    <h1 class="title is-1 has-text-centered">
      Score
    </h1>

    <div class="pricing-table" v-if="teams.length > 0">
      <div class="pricing-plan" v-for="team in teams" :key="team._id">
        <div class="plan-header">
          {{ team.name }}
        </div>

        <div class="plan-price">
          <span class="plan-price-amount">
            {{ team.score }}
          </span>
        </div>

        <div class="plan-items">
          <div class="plan-item">
            {{ team.mainMember.name }}
          </div>

          <div class="plan-item" v-for="additionalMember in team.additionalMembers" :key="additionalMember._id">
            {{ additionalMember.name }}
          </div>
        </div>

        <div class="plan-footer">
          <button class="button" @click="$store.commit('WasherDashboard/setTeamScore', { team, score: team.score - 1 })" :disabled="team.score <= 0">
            <span class="icon">
              <font-awesome-icon :icon="[ 'fas', 'minus-circle' ]" />
            </span>
          </button>

          <button class="button" @click="$store.commit('WasherDashboard/setTeamScore', { team, score: 0 })">
            0
          </button>

          <button class="button" @click="$store.commit('WasherDashboard/setTeamScore', { team, score: team.score + 1 })">
            <span class="icon">
              <font-awesome-icon :icon="[ 'fas', 'plus-circle' ]" />
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="hero is-medium" v-if="teams.length === 0">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h3 class="title is-3">
            No teams have been created yet
          </h3>

          <a class="subtitle is-5" @click="$parent.activeTab = 'Teams'">
            Go create somes!
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { IdashboardState } from './DashboardState'

export default Vue.extend({
  name: 'WasherScore',
  computed: {
    teams() {
      return (this.$store.state.WasherDashboard as IdashboardState).teams
    }
  }
})
</script>

<style lang="less">
  @import url("../../../../node_modules/bulma-pricingtable/dist/css/bulma-pricingtable.min.css");
</style>
