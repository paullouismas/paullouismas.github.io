import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'

import { /* getIndexFromObjectValue, */ deepCloneUncircularObject } from '@/helpers'
import { IdashboardState } from '@/views/tools/washer-dashboard/DashboardState'
import { Iplayer } from '@/views/tools/washer-dashboard/Player'
import { Iteam } from '@/views/tools/washer-dashboard/Team'
import { Igame } from '@/views/tools/washer-dashboard/Game'

Vue.use(Vuex)

const WASHERDASHBOARD_DEFAULT_STATE = {
  teams: [],
  game: {
    started: false,
    startTime: null
  },
  history: process.env.NODE_ENV === 'production' ? [] : [
    { // Sample game test
      _id: 0,
      startTime: new Date(Date.now() - 60 * 60 * 24),
      winningTeam: {
        _id: 0,
        name: 'Team A',
        mainMember: {
          _id: 0,
          name: 'Player A'
        },
        additionalMembers: [
          {
            _id: 1,
            name: 'Player B'
          },
          {
            _id: 2,
            name: 'Player C'
          }
        ],
        score: 0
      },
      teams: [
        {
          _id: 0,
          name: 'Team A',
          mainMember: {
            _id: 0,
            name: 'Player A'
          },
          additionalMembers: [
            {
              _id: 1,
              name: 'Player B'
            },
            {
              _id: 2,
              name: 'Player C'
            }
          ],
          score: 0
        },
        {
          _id: 1,
          name: 'Team B',
          mainMember: {
            _id: 3,
            name: 'Player D'
          },
          additionalMembers: [
            {
              _id: 4,
              name: 'Player E'
            }
          ],
          score: 0
        },
        {
          _id: 2,
          name: 'Team C',
          mainMember: {
            _id: 5,
            name: 'Player F'
          },
          additionalMembers: [],
          score: 0
        }
      ]
    }
  ],
  tabs: {
    activeTab: 'Teams'
  }
} as IdashboardState

const store = new Vuex.Store({
  modules: {
    WasherDashboard: {
      namespaced: true,
      state: deepCloneUncircularObject(Object.assign({}, WASHERDASHBOARD_DEFAULT_STATE)) as IdashboardState,
      mutations: {
        // Tabs
        setActiveTab(state: IdashboardState, tab: string) {
          state.tabs.activeTab = tab

          // console.info('[WasherDashboard/setActiveTab] Set active tab to', tab)
        },

        // Teams management
        createTeam(state: IdashboardState, { name, mainMember, additionalMembers }: { name: string; mainMember: Iplayer; additionalMembers: Iplayer[] }) {
          const team: Iteam = {
            _id: Date.now(),
            name,
            mainMember,
            additionalMembers,
            score: 0
          }

          state.teams.push(team)

          // console.info('[WasherDashboard/createTeam] New team succesfully created', team)
        },
        deleteTeam(state: IdashboardState, team: Iteam) {
          const { _id: teamId } = team
          // const teamIndex = getIndexFromObjectValue(state.teams, '_id', teamId)
          const teamIndex = state.teams.reduce<number | undefined>((accumulator, value, index) => value._id === teamId ? index : accumulator, undefined)

          if (teamIndex === undefined) {
            // console.error('[WasherDashboard/deleteTeam] Team could not be found in store', team)

            return
          }

          state.teams.splice(teamIndex, 1)

          // console.info('[WasherDashboard/deleteTeam] Team deleted from store', team)
        },

        // Game management
        startGame(state: IdashboardState) {
          if (state.game.started) {
            // console.error('[WasherDashboard/startGame] Game as already started')

            return
          }

          state.game.started = true
          state.game.startTime = new Date()

          // console.info('[WasherDashboard/startGame] Game successfully started')
        },
        finishGame(state: IdashboardState) {
          if (!state.game.started) {
            // console.error('[WasherDashboard/finishGame] Game could not be finished, game has not started yet')

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

          // console.info('[WasherDashboard/finishGame] Game finished successfully')
        },

        // Score management
        setTeamScore(state: IdashboardState, { team, score }: { team: Iteam; score: number}) {
          // const teamIndex = getIndexFromObjectValue(state.teams, '_id', team._id) as number
          const teamIndex = state.teams.reduce<number | undefined>((accumulator, value, index) => value._id === team._id ? index : accumulator, undefined) as number
          const targetScore: number = score > 0 ? score : 0

          state.teams[teamIndex].score = targetScore

          // console.info(`[WasherDashboard/setTeamScore] Set score to ${targetScore} for team`, team)
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
