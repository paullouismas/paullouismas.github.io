<template>
  <div>
    <div class="tabs" :class="{
      'is-centered': $props.alignement === 'is-centered',
      'is-right': $props.alignement === 'is-right',
      'is-small': $props.size === 'is-small',
      'is-large': $props.size === 'is-large',
      'is-boxed': $props.isBoxed,
      'is-toggle': $props.isToggle,
      'is-toggle-rounded': $props.isToggleRounded,
      'is-fullwidth': $props.isFullwidth
    }">
      <ul>
        <li v-for="(tab, index) in tabsToDisplay" :key="index" :class="{ 'is-active': activeTab === (tab.refName || tab.displayName) }">
          <a @click="activeTab = (tab.refName || tab.displayName)">
            {{ tab.displayName }}
          </a>
        </li>
      </ul>
    </div>

    <div v-for="(tab, index) in tabsToDisplay" :key="index">
      <component :is="tab.component" v-bind="tab.componentProps || {}" v-if="activeTab === (tab.refName || tab.displayName)" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'

interface Idata {
  tabsList: Itab[];
  activeTab: string;
}

export interface Itab {
  refName?: string;
  displayName: string;
  component: VueConstructor<Vue> | (() => Promise<typeof import('*.vue')>);
  componentProps?: object;
  displayIf?: () => boolean;
}

export default Vue.extend({
  name: 'Tabs',
  data(): Idata {
    return {
      tabsList: [],
      activeTab: ''
    } as Idata
  },
  props: {
    tabs: {
      type: Array,
      default(): Itab[] {
        return [] as Itab[]
      }
    },
    alignement: {
      type: String,
      default: 'is-left'
    },
    size: {
      type: String,
      default: 'is-medium'
    },
    isBoxed: {
      type: Boolean,
      default: false
    },
    isToggle: {
      type: Boolean,
      default: false
    },
    isToggleRounded: {
      type: Boolean,
      default: false
    },
    isFullwidth: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.tabsList = this.$props.tabs
    this.activeTab = this.tabsList[0]?.refName || this.tabsList[0]?.displayName
  },
  computed: {
    tabsToDisplay(): Itab[] {
      return this.tabsList.filter(tab => tab.displayIf ? tab.displayIf() : true)
    }
  }
})
</script>

<style lang="less" scoped>
  .tabs {
    & > ul {
      margin: 0;
    }
  }
</style>
