import { createLocalVue, mount,shallowMount } from '@vue/test-utils'
import Index from '../../../src/pages/index'
import list_todo, { defaultState } from '../../../src/store/list_todo'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Router from 'vue-router'

const localVue = createLocalVue()
Vue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Router)


describe('Страница list_todos', ()=>{
    let store, vuetify, wrapper, vm, router

    beforeEach(()=>{
        store = new Vuex.Store({ modules: { list_todo} })
        vuetify = new Vuetify()
        router = new Router()
    })

    it('Монтаж компонента', done =>{
        // монтируем компонент и его дочерние компоненты
        wrapper = mount(Index, { store, localVue, vuetify, router })
        // проверяем что компонент смонтирован
        expect(wrapper.exists()).toBe(true)
        vm = wrapper.vm
        // ждем и проверяем что монтаж прошел успешно и получен список todo
        setTimeout(()=>{
            expect(vm.table.list.length).toBeGreaterThan(0)
            done()
        },1000)
        
    })
    
    describe('Проверка рабочего цикла', ()=>{
        let mock

        beforeEach(()=>{
            mock = jest.spyOn(vm, 'getListAPI').mockImplementation(()=> true)
        })
        
        it('Проверяем сортировку таблицы',async ()=>{
            let listCols = wrapper.findAll('#table-list thead th')
            for(let i = 0; i < listCols.length - 1; i++){
                listCols.at(i).trigger('click')
                await localVue.nextTick()
            }
            expect(mock).toHaveBeenCalledTimes(listCols.length - 1)
            mock.mockClear()
        })
    
        it('Проверяем фильтрацию таблицы',async ()=>{
            let inputSearch = wrapper.find('#search')
            inputSearch.setValue('test')
            expect(vm.table.filters.search).toBe('test')
            wrapper.find('#subFilter').trigger('submit')
            await localVue.nextTick()
            expect(mock).toHaveBeenCalledTimes(1)
        })
    })
})