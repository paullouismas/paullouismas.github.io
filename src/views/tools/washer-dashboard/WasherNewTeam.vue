<template>
  <Modal ref="newTeamModal">
    <button class="button is-primary is-fullwidth" slot="modal-button">
      <span>
        Create new team
      </span>

      <span class="icon">
        <font-awesome-icon :icon="[ 'fas', 'plus-square' ]" />
      </span>
    </button>

    <h2 class="title is-2" slot="modal-title">
      Create new team
    </h2>

    <div slot="modal-body">
      <div class="field">
        <label class="label">
          Team name
        </label>

        <div class="control has-icons-left">
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="[ 'fas', 'users' ]" />
          </span>

          <input class="input" type="text" v-model="teamName" placeholder="Team name" spellcheck="false" required="true" autofocus />
        </div>
      </div>

      <div class="field">
        <label class="label">
          Players
        </label>
      </div>

      <div class="field">
        <div class="control has-icons-left is-expanded">
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="[ 'fas', 'user' ]" />
          </span>

          <input type="text" class="input" v-model="mainPlayerName" placeholder="Player name" spellcheck="false" required="true" />
        </div>
      </div>

      <div class="field has-addons" v-for="player in additionalPlayers" :key="player._id">
        <div class="control has-icons-left is-expanded">
          <span class="icon is-small is-left">
            <font-awesome-icon :icon="[ 'fas', 'user' ]" />
          </span>

          <input type="text" class="input" v-model="player.name" placeholder="Player name" autofocus spellcheck="false" ref="additionalPlayers" />
        </div>

        <div class="control">
          <button class="button is-danger" @click="deleteAdditionalPlayer(player._id)">
            <font-awesome-icon :icon="[ 'fas', 'times' ]" />
          </button>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-light" @click="addAdditionalPlayer">
            Add new player
          </button>
        </div>
      </div>
    </div>

    <button type="submit" class="button is-success" slot="modal-footer" @click="createNewTeam">
      Create team
    </button>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue'

import Modal from '@/components/Modal.vue'
import { Iplayer } from './Player'

export default Vue.extend({
  name: 'WasherNewTeam',
  components: {
    Modal
  },
  data() {
    return {
      teamName: '',
      mainPlayerName: '',
      additionalPlayers: [] as Iplayer[]
    }
  },
  methods: {
    createNewTeam() {
      this.$store.commit('WasherDashboard/createTeam', {
        name: this.teamName,
        mainMember: {
          _id: Date.now(),
          name: this.mainPlayerName
        },
        additionalMembers: this.additionalPlayers
      })

      this.teamName = ''
      this.mainPlayerName = ''
      this.additionalPlayers = [];

      (this.$refs.newTeamModal as unknown as typeof Modal.prototype).closeModal()
    },
    addAdditionalPlayer() {
      const player: Iplayer = {
        _id: Date.now(),
        name: ''
      }

      this.additionalPlayers.push(player)

      this.$nextTick().then(() => {
        const elements = (this.$refs.additionalPlayers as unknown as HTMLInputElement[])

        elements[elements.length - 1].focus()
      })
    },
    deleteAdditionalPlayer(id: number) {
      // const index = getIndexFromObjectValue(this.additionalPlayers, '_id', id)
      const index = this.additionalPlayers.reduce<number | undefined>((accumulator, value, index) => value._id === id ? index : accumulator, undefined)

      this.additionalPlayers.splice(index as number, 1)
    }
  }
})
</script>

<style lang="less">
</style>
