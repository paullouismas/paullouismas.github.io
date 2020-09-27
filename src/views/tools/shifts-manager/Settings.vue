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

        <div class="control">
          <input type="number" class="input" v-model="defaultLunchBreakDuration" />
        </div>
      </div>

      <div class="field">
        <label class="label">
          Default mid-shift break duration (in minutes)
        </label>

        <div class="control">
          <input type="number" class="input" v-model="defaultMidshiftBreakDuration" />
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
import '@creativebulma/bulma-tagsinput/dist/css/bulma-tagsinput.css'
import * as bulmaToast from 'bulma-toast'
import 'animate.css/animate.css'

import { Settings } from './State'

// import BulmaTagsInput from '@creativebulma/bulma-tagsinput/src/js/index.js'
const BulmaTagsInput = require('@creativebulma/bulma-tagsinput/src/js/index.js').default

export default Vue.extend({
  name: 'Settings',
  data() {
    return {
      tagsElement: null as Element | null,
      defaultLunchBreakDuration: this.$store.state.ShiftsManager.settings.defaultLunchBreakDuration,
      defaultMidshiftBreakDuration: this.$store.state.ShiftsManager.settings.defaultMidshiftBreakDuration
    }
  },
  computed: {
    tagsString(): string {
      return this.tagsElement ? (this.tagsElement as unknown as { BulmaTagsInput: Function }).BulmaTagsInput().value : ''
    }
  },
  mounted() {
    document.title = 'Shifts Manager - Settings'
    this.tagsElement = document.querySelector('input.input[data-type="tags"]')

    new BulmaTagsInput(this.tagsElement, {
      caseSensitive: false,
      clearSelectionOnTyping: true,
      freeInput: true,
      noResultsLabel: 'No previous matching tags',
      placeholder: 'Choose tags',
      searchMinChars: 0,
      selectable: false,
      source: this.$store.state.ShiftsManager.savedTags
    })
  },
  methods: {
    saveSettings() {
      const settings = {
        defaultTags: this.tagsString.split(','),
        defaultLunchBreakDuration: this.defaultLunchBreakDuration,
        defaultMidshiftBreakDuration: this.defaultMidshiftBreakDuration
      } as Settings

      this.$store.commit('ShiftsManager/saveSettings', settings)

      bulmaToast.toast({
        message: 'Settings successfully updated',
        duration: 3000,
        type: 'is-success',
        position: 'bottom-right',
        animate: {
          in: 'fadeIn',
          out: 'fadeOut'
        }
      })
    }
  }
})
</script>

<style lang="less">
</style>
