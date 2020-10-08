import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'
import * as uuid from 'uuid'

import { deepCloneUncircularObject } from '@/helpers'

import { Istate as IwasherDashboardState } from '@/views/tools/washer-dashboard/State'
import { Iplayer } from '@/views/tools/washer-dashboard/Player'
import { Iteam } from '@/views/tools/washer-dashboard/Team'
import { Igame } from '@/views/tools/washer-dashboard/Game'

import { Istate as IshiftsManagerState, DateCompatible, IcurrentShift, Tag, ISettings } from '@/views/tools/shifts-manager/State'

Vue.use(Vuex)

const DEFAULT_STATES = {
  WasherDashboard: {
    teams: [],
    game: {
      started: false,
      startTime: null
    },
    history: []
  }
} as {
  WasherDashboard: IwasherDashboardState;
}

const store = new Vuex.Store({
  modules: {
    WasherDashboard: {
      namespaced: true,
      state: deepCloneUncircularObject(Object.assign({}, DEFAULT_STATES.WasherDashboard)) as IwasherDashboardState,
      mutations: {
        // Teams management
        createTeam(state: IwasherDashboardState, { name, mainMember, additionalMembers }: { name: string; mainMember: Iplayer; additionalMembers: Iplayer[] }) {
          const team: Iteam = {
            _id: Date.now(),
            name,
            mainMember,
            additionalMembers,
            score: 0
          }

          state.teams.push(team)
        },
        deleteTeam(state: IwasherDashboardState, team: Iteam) {
          const { _id: teamId } = team
          const teamIndex = state.teams.reduce<number | undefined>((accumulator, value, index) => value._id === teamId ? index : accumulator, undefined)

          if (teamIndex === undefined) {
            return
          }

          state.teams.splice(teamIndex, 1)
        },

        // Game management
        startGame(state: IwasherDashboardState) {
          if (state.game.started) {
            return
          }

          state.game.started = true
          state.game.startTime = new Date()
        },
        finishGame(state: IwasherDashboardState) {
          if (!state.game.started) {
            return
          }

          state.history.push({
            _id: Date.now(),
            startTime: state.game.startTime as Date,
            winningTeam: (deepCloneUncircularObject(Object.assign([] as Iteam[], state.teams)) as Iteam[]).sort((teamA: Iteam, teamB: Iteam) => teamB.score < teamA.score ? -1 : 1)[0],
            teams: deepCloneUncircularObject(Object.assign([] as Iteam[], state.teams))
          } as Igame)

          state.game.started = false
          state.game.startTime = null

          state.teams.forEach(team => {
            team.score = 0
          })
        },

        // Score management
        setTeamScore(state: IwasherDashboardState, { team, score }: { team: Iteam; score: number}) {
          const teamIndex = state.teams.reduce<number | undefined>((accumulator, value, index) => value._id === team._id ? index : accumulator, undefined) as number
          const targetScore: number = score > 0 ? score : 0

          state.teams[teamIndex].score = targetScore
        }
      }
    },
    ShiftsManager: {
      namespaced: true,
      state: {
        shiftsHistory: [],
        currentShift: undefined,
        savedTags: [],
        settings: {
          defaultTags: [],
          defaultLunchBreakDuration: 60,
          defaultMidshiftBreakDuration: 30
        }
      } as IshiftsManagerState,
      mutations: {
        // Shifts management
        startShift(state: IshiftsManagerState, { startTime, tags }: { startTime: DateCompatible; tags: string[] }) {
          const shift = {
            id: uuid.v4(),
            startTime,
            tags: tags.filter(tag => tag.length > 0)
          } as IcurrentShift

          state.currentShift = shift
        },
        finishShift(state: IshiftsManagerState) {
          const shift = Object.assign({ endTime: new Date() }, state.currentShift)

          state.shiftsHistory.push(shift)

          state.currentShift = undefined
        },

        // Tags management
        saveTags(state: IshiftsManagerState, tags: Tag[]) {
          tags.filter(tag => tag.length > 0)
            .forEach(tag => {
              if (!state.savedTags.includes(tag)) {
                state.savedTags.push(tag)
              }
            })
        },

        // Settings
        saveSettings(
          state: IshiftsManagerState,
          {
            defaultTags,
            defaultLunchBreakDuration,
            defaultMidshiftBreakDuration
          }: ISettings
        ) {
          // defaultTags
          state.settings.defaultTags = []
          defaultTags
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0)
            .forEach(tag => {
              if (!state.settings.defaultTags.includes(tag)) {
                state.settings.defaultTags.push(tag)
              }
            })

          // defaultLunchBreakDuration
          state.settings.defaultLunchBreakDuration = defaultLunchBreakDuration

          // defaultMidshiftBreakDuration
          state.settings.defaultMidshiftBreakDuration = defaultMidshiftBreakDuration
        }
      }
    }
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
      key: 'vuex-store'
    }).plugin
  ]
})

export default store
