<template>
  <v-row>
    <v-col cols="12" md="8" lg="9" xl="9">
      <!-- Лист todo -->
      <v-card>
        <v-card-text>
          <v-data-table
            :headers="table.headers"
            :items="table.list"
            :server-items-length="table.count"
            :options.sync="tableOptions"
            :loading="table.loading"
            :page="tableOptions.page"
            :items-per-page="tableOptions.itemsPerPage"
            id="table-list"
          >
            <template v-slot:item.actions="{ item }">
              <router-link class="float-right text-decoration-none" :to=" '/todos/' + item.id ">Подробнее</router-link>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col xl="3">
      <!-- Фильтры todo -->
      <v-card>
        <v-card-title>Фильтр</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="onSubmitFilters">
            <v-text-field label="Поиск" v-model="table.filters.search" id="search"/>
            
            <div>
              <v-btn @click="onResetFilters" color="secondary">Сбросить</v-btn>
              <v-btn class="float-right" type="submit" color="primary" id="subFilter">Поиск</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data(){
    return {
      table: {
        loading: true,
        filters: {...this.$store.state.list_todo.filters},
        count: 0,
        list: [],
        headers: [
          { text: '#', value: 'id'}, { text: 'Наименование', value: 'name' }, { text: 'Описание', value: 'desc' }, { text: '', value: 'actions' }
        ]
      }
    }
  },
  computed: {
    tableOptions: {
      get(){
        return this.$store.state.list_todo.options
      },
      set(value){
        this.$store.dispatch('list_todo/setOptions',value)
      }
    },
    tableFilters: {
      get(){
        return this.$store.state.list_todo.filters
      },
      set(value){
        this.$store.dispatch('list_todo/setFilters',value)
      }
    }
  },
  watch: {
    tableOptions: {
      handler(){
        this.getListAPI()
      },
      deep: true
    },
    tableFilters: {
      handler(){
        this.getListAPI()
      },
      deep: true
    }
  },
  methods: {
    async getListAPI(){
      try{
        this.table.loading = true
        this.table.list = []
        const opt = {
          method: 'get',
          url: 'http://localhost:81/api/todo',
          params: { ...this.tableOptions, ...this.tableFilters }
        }
        const res = await axios(opt)
        this.table.loading = false
        this.table.list = [...res.data.list]
        this.table.count = res.data.count
      }catch( err ){
        console.log(err)
      }
    },
    onSubmitFilters(){
      this.tableFilters = {...this.table.filters}
    },
    onResetFilters(){
      this.$store.dispatch('list_todo/resetFilters')
      this.table.filters = {...this.$store.state.list_todo.filters}
    }
  }
}
</script>
