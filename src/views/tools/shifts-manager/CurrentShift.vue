<template>
  <div>
    <h3 class="title is-3">
      Current shift
    </h3>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">
            Start time
          </label>

          <div class="control">
            <input type="text" class="input" :value="formatTime(new Date(currentShift.startTime))" readonly />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button" @click="finishShift">
              Finish shift
            </button>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label class="label">
            Tags
          </label>

          <div class="control">
            <div class="tags">
              <span class="tag is-rounded" v-for="(tag, index) in currentShift.tags" :key="index">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { formatTime } from '@/helpers'

export default Vue.extend({
  name: 'CurrentShift',
  data() {
    return {
      currentShift: this.$store.state.ShiftsManager.currentShift
    }
  },
  beforeCreate() {
    if (this.$store.state.ShiftsManager.currentShift === undefined) {
      this.$router.push({ name: 'ShiftsManagerNewShift' })
    }
  },
  mounted() {
    document.title = 'Shifts Manager - Current shift'
  },
  methods: {
    finishShift() {
      this.$store.commit('ShiftsManager/finishShift')

      this.$router.push({
        name: 'ShiftsManagerHistoryDetails',
        params: {
          shiftId: this.currentShift.id
        }
      })
    },
    formatTime
  }
})
</script>

<style lang="less">
</style>
