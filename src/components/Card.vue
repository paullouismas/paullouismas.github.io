<template>
  <div class="card">
    <header class="card-header">
      <div class="card-header-title">
        <slot name="card-title" />
      </div>

      <div class="dropdown is-right" :class="{ 'is-active': !isHoverable && dropdownOpened, 'is-hoverable': isHoverable }" v-if="'card-dropdown' in $slots">
        <div class="dropdown-trigger card-header-icon" @click="toggleDropdown">
          <span class="icon">
            <font-awesome-icon :icon="[ 'fas', 'angle-down' ]" />
          </span>
        </div>

        <div class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <slot name="card-dropdown" />
          </div>
        </div>
      </div>
    </header>

    <div class="card-content">
      <div class="content">
        <slot name="card-content" />
      </div>
    </div>

    <footer class="card-footer">
      <slot name="card-footer" class="abcdef" />
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Card',
  data() {
    return {
      dropdownOpened: false,
      isHoverable: false
    }
  },
  props: {
    hoverable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted() {
    this.isHoverable = this.$props.hoverable
  },
  methods: {
    expandDropdown() {
      this.dropdownOpened = true
    },
    collapseDropdown() {
      this.dropdownOpened = false
    },
    toggleDropdown() {
      this.dropdownOpened = !this.dropdownOpened
    }
  }
})
</script>

<style lang="less">
</style>
