<template>
  <DefaultLayout>
    <section class="section">
      <div class="content">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae consequuntur ipsam alias cupiditate doloremque in consequatur doloribus, unde qui! Eos maxime perspiciatis illum ducimus odio possimus, nam doloribus autem libero.
      </div>
    </section>
  </DefaultLayout>
</template>

<script lang="ts">
import Vue from 'vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

export default Vue.extend({
  name: 'Portfolio',
  data() {
    return {
      images: []
    }
  },
  components: {
    DefaultLayout
  },
  created() {
    document.title = 'Portfolio'
  }
})
</script>

<style lang="less">
</style>
