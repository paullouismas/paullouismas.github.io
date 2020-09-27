<template>
  <nav class="navbar is-transparent" :class="{ 'is-fixed-top': $props.isFixedTop }" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" @click="navbarOpened = !navbarOpened" :class="{ 'is-active': !!navbarOpened }">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': !!navbarOpened }">
      <slot />
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Navbar',
  data() {
    return {
      navbarOpened: false,
      activeClass: 'is-active'
    }
  },
  props: {
    isFixedTop: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.$props.isFixedTop) {
      document.body.classList.add('has-navbar-fixed-top')
    }
  },
  beforeDestroy() {
    if (this.$props.isFixedTop && document.body.classList.contains('has-navbar-fixed-top')) {
      document.body.classList.remove('has-navbar-fixed-top')
    }
  }
})
</script>

<style lang="less" scoped>
  nav {
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.1);
  }
</style>
