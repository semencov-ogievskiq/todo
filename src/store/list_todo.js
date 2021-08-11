export let defaultState= {
    options: {
        page: 1,
        itemsPerPage: 15,
        sortBy: [],
        sortDesc: [],
        groupBy: [],
        groupDesc: [],
        multiSort: false,
        mustSort: false
    },
    filters: {
        search: ''
    }
}

let options = sessionStorage.getItem('list_todo_options')
let filters = sessionStorage.getItem('list_todo_filters')

options = ( options )? JSON.parse(options) : defaultState.options
filters = ( filters )? JSON.parse(filters) : defaultState.filters

export default {
    namespaced: true,
    state: ()=>({ 
        ...defaultState,
        options: options,
        filters: filters
    }),
    mutations: {
        mutOptions(state, options){
            state.options = options
        },
        mutFilters(state, filters){
            state.filters = filters
        }
    },
    actions: {
        setOptions({commit},options){
            sessionStorage.setItem('list_todo_options', JSON.stringify(options))
            commit('mutOptions', {...options})
        },
        setFilters({commit}, filters){
            sessionStorage.setItem('list_todo_filters', JSON.stringify(filters))
            commit('mutFilters', {...filters})
        },
        resetFilters({dispatch}){
            dispatch('setFilters', defaultState.filters)
        },
        resetOptions({dispatch}){
            dispatch('setOptions', defaultState.options)
        }
    }
}
