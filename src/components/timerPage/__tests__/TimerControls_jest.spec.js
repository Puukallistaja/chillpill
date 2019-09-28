/**
 * @jest-environment jsdom
 */
import { createLocalVue, mount } from "@vue/test-utils"
import * as All from "quasar"
import TimerControls from "../TimerControls.vue"

const { Quasar } = All
const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

let wrapper, vm

const localVue = createLocalVue()
localVue.use(Quasar, { components })

beforeEach(() => {
  wrapper = mount(TimerControls, {
    localVue,
    propsData: {
      timerIs: {
        IDLE: true,
        COUNTING: false,
        PAUSED: false,
      },
    },
  })
  vm = wrapper.vm
})

describe("TimerControls", () => {
  it("creates a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it("renders a button to start the countdown", () => {
    expect(wrapper.contains(".onoff")).toBe(true)
  })
  it("renders a button to reset the timer", () => {
    expect(wrapper.contains(".reset")).toBe(true)
  })
  it("emits a start event with button press", () => {
    wrapper.find(".onoff").trigger("click")
    expect(wrapper.emitted("set-counter-to")).toHaveLength(1)
  })
  it("shows label on onoff button relative to the state", () => {
    expect(wrapper.find(".onoff").text()).toBe('Start')
    wrapper.setProps({
      timerIs: {
        COUNTING: true,
      },
    })
    expect(wrapper.find(".onoff").text()).toBe('Pause')
  })
  it("shows label on onoff button relative to the state", () => {
    expect(vm.onoffLabel).toBe('Start')
    wrapper.setProps({
      timerIs: {
        COUNTING: true,
      },
    })
    expect(vm.onoffLabel).toBe('Pause')
    wrapper.setProps({
      timerIs: {
        COUNTING: false,
        PAUSED: true,
      },
    })
    expect(vm.onoffLabel).toBe('Continue')
  })
  it("changes onoff button color relative to the state", () => {
  })
})
