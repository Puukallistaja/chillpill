/**
 * @jest-environment jsdom
 */
import { createLocalVue, shallowMount, mount } from "@vue/test-utils"
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
  it("emits a start event with button press", () => {
    wrapper.find(".onoff").trigger('click')
    expect(wrapper.emitted('set-counter-to')).toHaveLength(1)
  })
})
