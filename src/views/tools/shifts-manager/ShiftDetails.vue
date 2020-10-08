<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <h3 class="title is-3">
            Shift details
          </h3>
        </div>
      </div>

      <div class="level-right">
        <div class="level-item">
          <button class="button is-info">
            <span>
              Edit
            </span>

            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'pen']" />
            </span>
          </button>
        </div>

        <div class="level-item">
          <button class="button is-danger is-outlined">
            <span>
              Delete
            </span>

            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'times']" />
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">
            Start time
          </label>

          <div class="control">
            <input type="text" class="input" :value="formatTime(new Date(shift.startTime))" readonly />
          </div>
        </div>

        <div class="field">
          <label class="label">
            End time
          </label>

          <div class="control">
            <input type="text" class="input" :value="formatTime(new Date(shift.endTime))" readonly />
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
              <span class="tag is-rounded" v-for="(tag, index) in shift.tags" :key="index">
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

import { Ishift } from './State'

export default Vue.extend({
  name: 'ShiftDetails',
  props: {
    shiftId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      shift: this.$store.state.ShiftsManager.shiftsHistory.filter((shift: Ishift) => shift.id === this.$props.shiftId)[0]
    }
  },
  methods: {
    formatTime
  }
})
</script>

<style lang="less">
</style>
