import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/index.vue'

describe('index.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Index, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
