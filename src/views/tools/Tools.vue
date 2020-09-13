<template>
  <div>
    <nav class="panel is-narrow" v-if="$route.name === 'Tools'">
      <p class="panel-heading">
        Available tools
      </p>

      <router-link v-for="(tool, index) in tools" :key="index" class="panel-block" :to="tool.path">
        <span class="panel-icon">
          <font-awesome-icon :icon="tool.icon" />
        </span>

        <span>
          {{ tool.name }}
        </span>
      </router-link>
    </nav>

    <router-view v-if="$route.name !== 'Tools'" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Tools',
  data() {
    return {
      tools: [
        {
          icon: ['fas', 'code'],
          name: 'SQL Generator',
          path: 'sql-generator',
          category: []
        },
        {
          icon: ['fas', 'toolbox'],
          name: 'Washer Dashboard',
          path: 'washer-dashboard',
          category: []
        }
      ] as {
        icon: [string, string];
        name: string;
        path: string;
        category: string[];
      }[]
    }
  }
})
</script>

<style lang="less">
</style>
