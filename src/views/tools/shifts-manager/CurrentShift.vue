<template>
  <div>
    <h3 class="title is-3">
      Current shift
    </h3>

    <pre><code>{{ $store.state.ShiftsManager.currentShift }}</code></pre>

    <button class="button" @click="finishShift">
      Finish shift
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CurrentShift',
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

      this.$router.push({ name: 'ShiftsManagerHistory' })
    }
  }
})
</script>

<style lang="less">
</style>
