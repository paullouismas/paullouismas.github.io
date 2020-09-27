<template>
  <Navbar :isFixedTop="true">
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

          <hr class="navbar-divider" />

          <router-link to="/tools/shifts-manager/" class="navbar-item">
            Shifts Manager
          </router-link>
        </div>
      </div>
    </div>
  </Navbar>
</template>

<script lang="ts">
import Vue from 'vue'

import Navbar from '@/components/reusable/Navbar.vue'

export default Vue.extend({
  name: 'MainNavbar',
  components: {
    Navbar
  }
})
</script>

<style lang="less" scoped>
</style>
