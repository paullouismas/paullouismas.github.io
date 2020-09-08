<template>
  <div>
    <section class="section">
      <div class="content">
        <!-- <div class="columns is-centered is-multiline">
            <figure class="image column is-3" v-for="image in images" :key="image.id">
                <img :src="image.display_url" :alt="image.accessibility_caption" />
            </figure>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Portfolio',
  data() {
    return {
      profileName: 'paullouis.mas',
      images: []
    }
  },
  mounted() {
    fetch(`https://instagram.com/${this.profileName}/?__a=1`)
      .then(r => r.json())
      .then(d => {
        this.images = d.graphql.user.edge_owner_to_timeline_media.edges.map((e: { node: string }) => e.node)
      })
  }
})
</script>

<style lang="less">
</style>
