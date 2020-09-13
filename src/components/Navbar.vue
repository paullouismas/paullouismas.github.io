<template>
  <nav class="navbar is-transparent" :class="{ 'is-fixed-top': isFixedTop }" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" @click="navbarOpened = !navbarOpened" :class="{ 'is-active': !!navbarOpened }">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': !!navbarOpened }">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          Home
        </router-link>

        <router-link to="/portfolio/" class="navbar-item">
          Portfolio
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link class="navbar-link" to="/tools/">
            Tools
          </router-link>

          <div class="navbar-dropdown is-right is-boxed">
            <router-link to="/tools/sql-generator/" class="navbar-item">
              SQL Command Generator
            </router-link>

            <hr class="navbar-divider" />

            <router-link to="/tools/washer-dashboard/" class="navbar-item">
              Washer Dashboard
            </router-link>
          </div>
        </div>
      </div>
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
      activeClass: 'is-active',
      isFixedTop: false
    }
  },
  props: {
    fixedTop: Boolean
  },
  mounted() {
    this.isFixedTop = this.$props.fixedTop

    if (this.isFixedTop) {
      document.body.classList.add('has-navbar-fixed-top')
    }
  },
  beforeDestroy() {
    if (this.isFixedTop && document.body.classList.contains('has-navbar-fixed-top')) {
      document.body.classList.remove('has-navbar-fixed-top')
    }
  }
})
</script>

<style lang="less">
  nav {
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.1);
  }
</style>
