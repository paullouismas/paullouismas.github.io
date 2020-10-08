<template>
  <div>
    <h3 class="title is-3">
      New shift
    </h3>

    <div class="field">
      <label class="label">
        Tags
      </label>

      <div class="control">
        <input type="text" data-type="tags" class="input" :value="$store.state.ShiftsManager.settings.defaultTags.join(',')" />
      </div>
    </div>

    <div class="control">
      <button class="button" @click="startShift">
        Start shift
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BulmaTagsInput from '@creativebulma/bulma-tagsinput/'

import { initBulmaTagsInput } from '@/helpers'

export default Vue.extend({
  name: 'NewShift',
  data() {
    return {
      tagsInput: null as BulmaTagsInput | null
    }
  },
  beforeCreate() {
    if (this.$store.state.ShiftsManager.currentShift !== undefined) {
      this.$router.push({ name: 'ShiftsManagerCurrentShift' })
    }
  },
  mounted() {
    document.title = 'Shifts Manager - New shift'

    this.tagsInput = initBulmaTagsInput(document.querySelector('input.input[data-type="tags"]') as HTMLInputElement, this.$store.state.ShiftsManager.savedTags)
  },
  methods: {
    startShift() {
      const tags = ((this.tagsInput as BulmaTagsInput).value as string).split(',')

      this.$store.commit('ShiftsManager/startShift', { startTime: new Date(), tags })
      this.$store.commit('ShiftsManager/saveTags', tags)

      this.$router.push({ name: 'ShiftsManagerCurrentShift' })
    }
  }
})
</script>

<style lang="less">
</style>
