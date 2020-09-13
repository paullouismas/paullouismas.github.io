<template>
  <div>
    <router-view name="navbar" />

    <router-view />

    <router-view name="footer" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Root'
})
</script>

<style lang="less">
</style>
