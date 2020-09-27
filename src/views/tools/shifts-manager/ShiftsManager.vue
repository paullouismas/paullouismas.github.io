<template>
  <EmptyLayoutWithFooter>
    <Navbar>
      <div class="navbar-start">
        <router-link :to="{ name: 'ShiftsManagerHistory' }" class="navbar-item">
          History
        </router-link>

        <router-link :to="{ name: 'ShiftsManagerNewShift' }" class="navbar-item" v-if="$store.state.ShiftsManager.currentShift === undefined">
          New shift
        </router-link>

        <router-link :to="{ name: 'ShiftsManagerCurrentShift' }" class="navbar-item" v-if="$store.state.ShiftsManager.currentShift !== undefined">
          Current shift
        </router-link>
      </div>

      <div class="navbar-end">
        <router-link :to="{ name: 'ShiftsManagerSettings' }" class="navbar-item">
          Settings
        </router-link>
      </div>
    </Navbar>

    <section class="section">
      <div class="content">
        <router-view />
      </div>
    </section>
  </EmptyLayoutWithFooter>
</template>

<script lang="ts">
import Vue from 'vue'

import EmptyLayoutWithFooter from '@/layouts/EmptyLayoutWithFooter.vue'
import Navbar from '@/components/reusable/Navbar.vue'

export default Vue.extend({
  name: 'ShiftsManager',
  components: {
    EmptyLayoutWithFooter,
    Navbar
  },
  mounted() {
    document.title = 'Shifts Manager'
  }
})
</script>

<style lang="less">
</style>
