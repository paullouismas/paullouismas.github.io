<template>
  <div>
    <div class="level">
      <div class="level-left">
        <WasherGamesHistory class="level-item" />
      </div>

      <div class="level-right">
        <Modal class="level-item" ref="finishGame" v-if="game.started">
          <button class="button is-primary" slot="modal-button">
            <span>
              Finish
            </span>

            <span class="icon">
              <font-awesome-icon :icon="[ 'fas', 'stop-circle' ]" />
            </span>
          </button>

          <h2 class="title is-2" slot="modal-title">
            Finish the game
          </h2>

          <div slot="modal-body">
            <h5 class="subtitle is-5">
              Are you sure you want to finish the game?
            </h5>
          </div>

          <button class="button" slot="modal-footer" @click="$refs.finishGame.closeModal()">
            Cancel
          </button>

          <button class="button is-primary" slot="modal-footer" @click="finishGame">
            Finish the game
          </button>
        </Modal>

        <button class="button is-primary" v-if="!game.started" @click="startGame">
          <span>
            Start game
          </span>

          <span class="icon">
            <font-awesome-icon :icon="[ 'fas', 'play-circle' ]" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Modal from '@/components/Modal.vue'
import WasherGamesHistory from './WasherGamesHistory.vue'
import { IdashboardState } from './DashboardState'

export default Vue.extend({
  name: 'WasherGame',
  components: {
    Modal,
    WasherGamesHistory
  },
  data() {
    return {
      //
    }
  },
  computed: {
    game() {
      return (this.$store.state.WasherDashboard as IdashboardState).game
    }
  },
  methods: {
    startGame() {
      this.$store.commit('WasherDashboard/startGame')
    },
    finishGame() {
      this.$store.commit('WasherDashboard/finishGame');

      (this.$refs.finishGame as unknown as typeof Modal.prototype).closeModal()
    }
  }
})
</script>

<style lang="less">
</style>
