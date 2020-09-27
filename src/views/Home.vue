<template>
  <DefaultLayout>
    <section class="section hero is-medium">
      <div class="hero-body">
        <div class="container">
          <h1 class="is-1 title is-spaced">
            Paul-Louis Mas
          </h1>

          <h3 class="is-3 subtitle">
            Hello, I'm Paul-Louis, a french-canadian<br />
            developer/photographer/cinematographer
          </h3>
        </div>
      </div>
    </section>

    <!-- <section class="section">
      <div class="container">
      </div>
    </section> -->
  </DefaultLayout>
</template>

<script lang="ts">
import Vue from 'vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default Vue.extend({
  name: 'Home',
  components: {
    DefaultLayout
  },
  mounted() {
    document.title = 'Home'
  }
})
</script>

<style>
</style>
