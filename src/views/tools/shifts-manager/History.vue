<template>
  <div>
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
            {{ new Date(shift.startTime) }}
          </td>

          <td>
            {{ new Date(shift.endTime) }}
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
              <button class="button is-info">
                <span class="icon is-small">
                  <font-awesome-icon :icon="['fas', 'info-circle']" />
                </span>

                <!-- <span>
                  Info
                </span> -->
              </button>

              <button class="button is-danger">
                <!-- <span>
                  Delete
                </span> -->

                <span class="icon is-small">
                  <font-awesome-icon :icon="['fas', 'times']" />
                </span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>

      <tfoot v-show="$store.state.ShiftsManager.shiftsHistory.length === 0">
        <tr>
          <td colspan="4" style="text-align: center;">
            You does not have any shifts saved in history
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import prettyMilliseconds from 'pretty-ms'

export default Vue.extend({
  name: 'History',
  data() {
    return {
      prettyMilliseconds
    }
  },
  mounted() {
    document.title = 'Shifts Manager - History'
  }
})
</script>

<style lang="less">
</style>
