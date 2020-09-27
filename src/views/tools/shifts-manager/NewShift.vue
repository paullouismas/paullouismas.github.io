<template>
  <div>
    <h3 class="title is-3">
      New shift
    </h3>

    <div class="field">
      <label class="label">Tags</label>

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
import '@creativebulma/bulma-tagsinput/dist/css/bulma-tagsinput.css'

// import BulmaTagsInput from '@creativebulma/bulma-tagsinput/src/js/index.js'
const BulmaTagsInput = require('@creativebulma/bulma-tagsinput/src/js/index.js').default

export default Vue.extend({
  name: 'NewShift',
  data() {
    return {
      tagsElement: null as Element | null
    }
  },
  computed: {
    tagsString(): string {
      return this.tagsElement ? (this.tagsElement as unknown as { BulmaTagsInput: Function }).BulmaTagsInput().value : ''
    }
  },
  beforeCreate() {
    if (this.$store.state.ShiftsManager.currentShift !== undefined) {
      this.$router.push({ name: 'ShiftsManagerCurrentShift' })
    }
  },
  mounted() {
    document.title = 'Shifts Manager - New shift'
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
    startShift() {
      const tags = this.tagsString.split(',')

      this.$store.commit('ShiftsManager/startShift', { startTime: new Date(), tags })
      this.$store.commit('ShiftsManager/saveTags', tags)

      this.$router.push({ name: 'ShiftsManagerCurrentShift' })
    }
  }
})
</script>

<style lang="less">
</style>
