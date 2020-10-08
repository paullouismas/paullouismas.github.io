<template>
  <div>
    <h3 class="title is-3">
      Settings
    </h3>

    <form>
      <div class="field">
        <label class="label">
          Default tags
        </label>

        <div class="control">
          <input type="text" class="input" data-type="tags" :value="$store.state.ShiftsManager.settings.defaultTags.join(',')" />
        </div>
      </div>

      <div class="field">
        <label class="label">
          Default lunch break duration (in minutes)
        </label>

        <div class="control has-icons-left">
          <input type="number" class="input" v-model="defaultLunchBreakDuration" />

          <span class="icon is-left">
            <font-awesome-icon :icon="['far', 'hourglass']" />
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">
          Default mid-shift break duration (in minutes)
        </label>

        <div class="control has-icons-left">
          <input type="number" class="input" v-model="defaultMidshiftBreakDuration" />

          <span class="icon is-left">
            <font-awesome-icon :icon="['far', 'hourglass']" />
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button" type="submit" @click.prevent="saveSettings">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BulmaTagsInput from '@creativebulma/bulma-tagsinput/'

import { initBulmaTagsInput, Notify } from '@/helpers'
import { ISettings } from './State'

export default Vue.extend({
  name: 'Settings',
  data() {
    return {
      tagsInput: null as BulmaTagsInput | null,
      defaultLunchBreakDuration: this.$store.state.ShiftsManager.settings.defaultLunchBreakDuration,
      defaultMidshiftBreakDuration: this.$store.state.ShiftsManager.settings.defaultMidshiftBreakDuration
    }
  },
  mounted() {
    document.title = 'Shifts Manager - Settings'

    this.tagsInput = initBulmaTagsInput(document.querySelector('input.input[data-type="tags"]') as HTMLInputElement, this.$store.state.ShiftsManager.savedTags)
  },
  methods: {
    saveSettings() {
      this.$store.commit('ShiftsManager/saveSettings', {
        defaultTags: ((this.tagsInput as BulmaTagsInput).value as string).split(','),
        defaultLunchBreakDuration: this.defaultLunchBreakDuration,
        defaultMidshiftBreakDuration: this.defaultMidshiftBreakDuration
      } as ISettings)

      Notify.success('Settings successfully updated')
    }
  }
})
</script>

<style lang="less">
</style>
