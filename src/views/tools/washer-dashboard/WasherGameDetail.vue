<template>
  <Modal>
    <button class="button is-info is-small" slot="modal-button">
      <span class="icon">
        <font-awesome-icon :icon="[ 'fas', 'info-circle' ]" />
      </span>
    </button>

    <h2 class="title is-2" slot="modal-title">
      Game detail
    </h2>

    <div slot="modal-body" class="table-container">
      <div class="pricing-table">
        <div class="pricing-plan" v-for="team in gameDetail.teams" :key="team._id">
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

            <div class="plan-item" v-for="member in team.additionalMembers" :key="member._id">
              {{ member.name }}
            </div>
          </div>

          <!-- <div class="plan-footer">
            <button class="button is-fullwidth"></button>
          </div> -->
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue'

import Modal from '@/components/Modal.vue'
import { Igame } from './Game'
import { Iteam } from './Team'

export default Vue.extend({
  name: 'WasherGameDetail',
  data() {
    return {
      gameDetail: {
        teams: [] as Iteam[]
      } as Igame
    }
  },
  props: {
    game: {
      //
    }
  },
  components: {
    Modal
  },
  mounted() {
    this.gameDetail = this.$props.game as Igame
  }
})
</script>

<style lang="less">
  @import url("../../../../node_modules/bulma-pricingtable/dist/css/bulma-pricingtable.min.css");
</style>
