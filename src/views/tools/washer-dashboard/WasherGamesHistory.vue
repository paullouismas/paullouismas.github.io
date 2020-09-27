<template>
  <Modal>
    <button class="button is-info" slot="modal-button">
      <span>
        Games history
      </span>

      <span class="icon">
        <font-awesome-icon :icon="[ 'fas', 'history' ]" />
      </span>
    </button>

    <h2 class="title is-2" slot="modal-title">
      Games history
    </h2>

    <div slot="modal-body" class="table-container">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>
              Timestamp
            </th>

            <th>
              Winning team
            </th>

            <th>
              Winning score
            </th>

            <th>
              Details
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="game in history" :key="game._id">
            <td>
              {{ prettyPrintElapsedTime((new Date() - new Date(game.startTime)) / 1000) }}
            </td>

            <td>
              <span class="has-tooltip-arrow has-tooltip-right has-tooltip-multiline" :data-tooltip="[game.winningTeam.mainMember.name].concat(game.winningTeam.additionalMembers.map(({ name }) => name)).join(', ')">
                {{ game.winningTeam.name }}
              </span>
            </td>

            <td>
              {{ game.winningTeam.score }}
            </td>

            <td>
              <WasherGameDetail :game="game" />
            </td>
          </tr>
        </tbody>

        <tfoot></tfoot>
      </table>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue'

import { prettyPrintElapsedTime } from '@/helpers'
import Modal from '@/components/Modal.vue'
import WasherGameDetail from './WasherGameDetail.vue'
import { Istate as IdashboardState } from './State'

export default Vue.extend({
  name: 'WasherGamesHistory',
  components: {
    Modal,
    WasherGameDetail
  },
  data() {
    return {
      //
    }
  },
  methods: {
    prettyPrintElapsedTime
  },
  computed: {
    history() {
      return (this.$store.state.WasherDashboard as IdashboardState).history
    }
  }
})
</script>

<style lang="less">
  @import url("../../../../node_modules/@creativebulma/bulma-tooltip/dist/bulma-tooltip.css");
</style>
