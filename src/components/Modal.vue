<template>
  <div>
    <span @click="openModal">
      <slot name="modal-button" />
    </span>

    <div class="modal" :class="{ 'is-active': modalOpened }">
      <div class="modal-background" @click="closeModal"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <div class="modal-card-title">
            <slot name="modal-title" />
          </div>

          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>

        <section class="modal-card-body">
          <slot name="modal-body" />
        </section>

        <footer class="modal-card-foot">
          <slot name="modal-footer" />
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Modal',
  data() {
    return {
      modalOpened: false
    }
  },
  methods: {
    openModal() {
      this.modalOpened = true

      document.documentElement.classList.add('is-clipped')
    },

    closeModal() {
      this.modalOpened = false

      document.documentElement.classList.remove('is-clipped')
    }
  }
})
</script>

<style lang="less">
</style>
