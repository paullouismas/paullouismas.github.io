<template>
  <div>
    <div v-if="!$route.params.shiftId">
      <h3 class="title is-3">
        History
      </h3>

      <table class="table">
        <thead>
          <tr>
            <th>
              Start time
            </th>

            <th>
              End time
            </th>

            <th>
              Duration
            </th>

            <th>
              Tags
            </th>

            <th>
              <!-- Columns for buttons -->
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(shift, index) in $store.state.ShiftsManager.shiftsHistory" :key="index">
            <td>
              {{ formatTime(new Date(shift.startTime)) }}
            </td>

            <td>
              {{ formatTime(new Date(shift.endTime)) }}
            </td>

            <td>
              {{ prettyMilliseconds(new Date(shift.endTime) - new Date(shift.startTime), { verbose: true }) }}
            </td>

            <td>
              <div class="tags">
                <span class="tag is-rounded" v-for="(tag, index) in shift.tags" :key="index">
                  {{ tag }}
                </span>
              </div>
            </td>

            <td>
              <div class="buttons">
                <router-link :to="{ name: 'ShiftsManagerHistoryDetails', params: { shiftId: shift.id } }">
                  <button class="button is-info">
                    <span class="icon is-small">
                      <font-awesome-icon :icon="['fas', 'info-circle']" />
                    </span>
                  </button>
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>

        <tfoot v-show="$store.state.ShiftsManager.shiftsHistory.length === 0">
          <tr>
            <td colspan="5" style="text-align: center;">
              You does not have any shifts saved in history
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <ShiftDetails :shiftId="$route.params.shiftId" v-if="$route.params.shiftId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import prettyMilliseconds from 'pretty-ms'

import { formatTime } from '@/helpers'

import ShiftDetails from './ShiftDetails.vue'

export default Vue.extend({
  name: 'History',
  data() {
    return {
      prettyMilliseconds
    }
  },
  methods: {
    formatTime
  },
  components: {
    ShiftDetails
  },
  mounted() {
    document.title = 'Shifts Manager - History'
  }
})
</script>

<style lang="less">
</style>
