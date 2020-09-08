<template>
  <Card :hoverable="true">
    <span slot="card-title">
      {{ teamItem.name }}
    </span>

    <p slot="card-content">
      {{ teamItem.mainMember.name }}
    </p>

    <p slot="card-content" v-for="member in teamItem.additionalMembers" :key="member._id">
      {{ member.name }}
    </p>

    <!-- <Modal slot="card-dropdown">
      <a class="dropdown-item" slot="modal-button">
        Edit
      </a>

      <h2 class="title is-2" slot="modal-title">
        Edit team
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

            <input class="input" type="text" v-model="team.name" placeholder="Team name" spellcheck="false" required="true" />
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

            <input type="text" class="input" v-model="team.mainMember" placeholder="Player name" spellcheck="false" required="true" />
          </div>
        </div>

        <div class="field has-addons" v-for="player in team.additionalMembers" :key="player._id">
          <div class="control has-icons-left is-expanded">
            <span class="icon is-small is-left">
              <font-awesome-icon :icon="[ 'fas', 'user' ]" />
            </span>

            <input type="text" class="input" v-model="player.name" placeholder="Player name" autofocus spellcheck="false" />
          </div>

          <div class="control">
            <button class="button is-danger" @click="newTeam_deleteAdditionalPlayer(player._id)">
              <font-awesome-icon :icon="[ 'fas', 'times' ]" />
            </button>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-light">
              Add new player
            </button>
          </div>
        </div>
      </div>

      <button class="button is-success" slot="modal-footer">
        Save changes
      </button>
    </Modal> -->

    <Modal slot="card-dropdown" ref="deleteTeam">
      <a slot="modal-button" class="dropdown-item">
        Delete
      </a>

      <h2 class="title is-2" slot="modal-title">
        Delete team
      </h2>

      <div slot="modal-body">
        <h3 class="title is-3">
          Are you sure you want to delete this team?
        </h3>

        <h5 class="subtitle is-5">
          {{ $props.team.name }}
        </h5>
      </div>

      <button class="button" slot="modal-footer" @click="$refs.deleteTeam.closeModal()">
        Cancel
      </button>

      <button class="button is-danger" slot="modal-footer" @click="deleteTeam">
        Delete team
      </button>
    </Modal>
  </Card>
</template>

<script lang="ts">
import Vue from 'vue'

import Card from '@/components/Card.vue'
import Modal from '@/components/Modal.vue'
import { Iteam } from './Team'

export default Vue.extend({
  name: 'WasherTeamItem',
  data() {
    return {
      teamItem: {
        mainMember: {}
      } as Iteam
    }
  },
  props: {
    team: {
      //
    }
  },
  components: {
    Card,
    Modal
  },
  methods: {
    deleteTeam() {
      this.$store.commit('WasherDashboard/deleteTeam', this.teamItem);

      (this.$refs.deleteTeam as unknown as typeof Modal.prototype).closeModal()
    }
  },
  mounted() {
    this.teamItem = this.$props.team as Iteam
  }
})
</script>

<style lang="less">
  div {
    &.card {
      margin-bottom: 25px;
    }
  }
</style>
