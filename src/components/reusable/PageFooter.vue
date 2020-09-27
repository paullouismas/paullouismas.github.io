<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <slot />
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PageFooter'
})
</script>

<style lang="less">
</style>
