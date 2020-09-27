<template>
  <DefaultLayout>
    <div v-if="$route.name === 'SQLGenerator'">
      <section class="hero is-light is-medium">
        <div class="hero-body">
          <div class="container">
            <h1 class="is-1 title">
              SQL Commmand Generator
            </h1>

            <p>
              This generator allows to generate SQL insert statements from any CSV stored data.<br/>
              It allows columns manipulations as well as data skipping.
            </p>

            <p>
              <router-link to="./documentation/" class="button" type="button">
                <span>
                  View the documentation
                </span>
                <span class="icon">
                  <font-awesome-icon :icon="[ 'fas', 'angle-double-right' ]" />
                </span>
              </router-link>
            </p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="field">
            <div class="control">
              <label class="label">
                CSV data

                <textarea class="textarea" placeholder="Your CSV data goes here..." spellcheck="false" v-model="csv"></textarea>
              </label>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="label">
                CSV headers
              </label>

             <label class="checkbox">
                <input type="checkbox" class="checkbox" v-model="csvHasHeaders" />

                My CSV has headers.
              </label>

              <p class="help">
                Check if your CSV data has headers (this will ignore them while parsing the data).
              </p>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="label">
                Separator

                <div class="select">
                  <select v-model="separator">
                    <option disabled>-- Select a separator --</option>
                    <option value=",">,</option>
                    <option value=";">;</option>
                  </select>
                </div>
              </label>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="label">
                Table name

                <input type="text" class="input" placeholder="Example" spellcheck="false" v-model="tableName" />
              </label>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="label">
                Columns to insert to

                <input type="text" class="input" placeholder="column1,column2,column3" spellcheck="false" v-model="columnsName" />
              </label>

              <p class="help">
                Place the columns in order they need to be inserted.<br/>
                Separate the columns with a comma.
              </p>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="label">
                Values command format

                <textarea v-model="valuesFormat" class="textarea" placeholder="('?1?', 'A string', ?2?, 42, ?3?, NULL)" spellcheck="false"></textarea>
              </label>

              <p class="help">
                Place placeholder value as: ?#?<br/>
                Where # is the position of the column in the CSV
              </p>
            </div>
          </div>

          <div class="field">
            <div class="control buttons">
              <button type="submit" class="button is-primary is-medium" @click.prevent="generateStatement()">Generate SQL</button>
            </div>

            <p class="help is-danger">
              {{ error }}
            </p>
          </div>

          <div class="field">
            <div class="control">
              <label for="output_SQL">
                Generated SQL

                <textarea class="textarea" readonly placeholder="Your generated SQL will appear here." spellcheck="false" v-model="output"></textarea>
              </label>

              <p class="help">
                Always verify the generated SQL before using it in production!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <router-view v-if="$route.name !== 'SQLGenerator'" />
  </DefaultLayout>
</template>

<script lang="ts">
import Vue from 'vue'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

import CsvManager, { IEntry } from './csv-tool'

export default Vue.extend({
  name: 'SqlGenerator',
  data() {
    return {
      csv: '',
      csvHasHeaders: false,
      separator: undefined as ',' | ';' | undefined,
      tableName: '',
      columnsName: '',
      valuesFormat: '',
      output: '',
      error: ''
    }
  },
  components: {
    DefaultLayout
  },
  mounted() {
    document.title = 'SQL Generator'

    const query = this.$route.query

    this.csv = decodeURIComponent(query.csv as string | null || '')
    this.csvHasHeaders = query.csvHasHeaders === 'true'
    this.separator = decodeURIComponent(query.separator as ',' | ';' | null || ',') as ',' | ';'
    this.tableName = decodeURIComponent(query.tableName as string | null || '')
    this.columnsName = decodeURIComponent(query.columnsName as string | null || '')
    this.valuesFormat = decodeURIComponent(query.valuesFormat as string | null || '')
  },
  methods: {
    generateStatement() {
      const errors = []

      if (this.csv === '') {
        errors.push('Your CSV data is empty.')
      }
      if (this.tableName === '') {
        errors.push('You must specify the name of the table to insert into.')
      }
      if (this.columnsName === '' && !this.csvHasHeaders) {
        errors.push('You must specify the columns to insert to.')
      }
      if (this.valuesFormat === '') {
        errors.push('You must specify the format of the insert values.')
      }

      if (errors.length > 0) {
        this.error = errors.join('\n')

        return
      }

      const $manager = new CsvManager(this.csv, this.separator, this.csvHasHeaders)
      const code = `INSERT INTO [${this.tableName}] (${(this.csvHasHeaders && this.columnsName === '' ? $manager.getHeaders().join(', ') : this.columnsName).trim().split(',').map(column => column.trim()).join(', ')}) VALUES \n`

      $manager.removeHeaders()

      const $entry = $manager.entries()
      const $values = []
      let entry

      do {
        entry = $entry.value as IEntry

        let value = this.valuesFormat.replace(/\/\/.{0,}$/gm, '')

        for (let iterator = 1; iterator <= entry.length; iterator += 1) {
          value = value.replace(new RegExp(`\\?${iterator}\\?`, 'g'), (entry[iterator - 1] || 'NULL') as string)
        }

        $values.push(value.trim())

        $entry.next()
      } while ($entry.done !== true)

      this.output = `${code}${$values.join(', \n')}`
    }
  }
})
</script>

<style lang="less">
</style>
