/**
 * @jest-environment jsdom
 */
import { createLocalVue, shallowMount, mount } from "@vue/test-utils"
// import * as All from "quasar"
import Timer from "../Timer.vue"
import TimerControls from "../TimerControls.vue"

// const { Quasar } = All
// const components = Object.keys(All).reduce((object, key) => {
//   const val = All[key]
//   if (val && val.component && val.component.name != null) {
//     object[key] = val
//   }
//   return object
// }, {})

let wrapper, vm

const localVue = createLocalVue()
// localVue.use(Quasar, { components })

beforeEach(() => {
  wrapper = shallowMount(Timer, {
    localVue,
  })
  vm = wrapper.vm
})

describe("Timer", () => {
  it("creates a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it("has initial data", () => {
    expect(vm.timerState).toBeDefined()
  })
  it("renders controls", () => {
    expect(wrapper.contains(TimerControls)).toBe(true)
  })
  it("can change state when event is fired", () => {
    wrapper.find(TimerControls).vm.$emit('set-counter-to', 'COUNTING')
    expect(vm.timerState.IDLE).toBe(false)
    expect(vm.timerState.PAUSED).toBe(false)
    expect(vm.timerState.COUNTING).toBe(true)
  })
  it("can change state when event is fired", () => {
    wrapper.find(TimerControls).vm.$emit('set-counter-to', 'IDLE')
    expect(vm.timerState.IDLE).toBe(true)
  })
  it("changes state when event is fired", () => {
    wrapper.find(TimerControls).vm.$emit('set-counter-to', 'PAUSED')
    expect(vm.timerState.PAUSED).toBe(true)
  })
})
