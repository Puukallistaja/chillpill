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
const initial = {
  millis: 1000 * 60 * 12,
}

beforeEach(() => {
  jest.useFakeTimers();
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
    expect(vm.millis).toBeDefined()
    expect(vm.timer).toBe(null)
  })
  it("shows seconds", () => {
    wrapper.setData({
      millis: 1000 * 60 * 12,
    })
    expect(vm.seconds).toEqual(60 * 12)
  })
  it("shows seconds", () => {
    wrapper.setData({
      millis: 1000 * 60 * 12,
    })
    expect(vm.minutes).toEqual(12)
  })
  it("starts and stops counting down millis", () => {
    vm.startCountdown()
    expect(vm.timer).toBeTruthy()
    vm.stopCountdown()
    expect(vm.timer).toBe(null)
  })
  it('counts millis down', () => {
    vm.startCountdown()
    jest.advanceTimersByTime(1000)
    vm.stopCountdown()
    expect(vm.millis).toBe(initial.millis - 1000)
    vm.startCountdown()
    jest.advanceTimersByTime(1000)
    vm.stopCountdown()
    expect(vm.millis).toBe(initial.millis - 2000)
  })
  it("renders controls", () => {
    expect(wrapper.contains(TimerControls)).toBe(true)
  })
  it("can change state when event is fired", () => {
    wrapper.find(TimerControls).vm.$emit("set-counter-to", "COUNTING")
    expect(vm.timerState.IDLE).toBe(false)
    expect(vm.timerState.PAUSED).toBe(false)
    expect(vm.timerState.COUNTING).toBe(true)
  })
  it("can change state when event is fired", () => {
    wrapper.find(TimerControls).vm.$emit("set-counter-to", "IDLE")
    expect(vm.timerState.IDLE).toBe(true)
  })
  it("changes state when event is fired", () => {
    wrapper.find(TimerControls).vm.$emit("set-counter-to", "PAUSED")
    expect(vm.timerState.PAUSED).toBe(true)
  })
})
