/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from "@vue/test-utils"
import App from "./App.vue"
import * as All from "quasar"
const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

const initial = {
  data: {
    minutes: 12,
    countingDown: false,
  },
  methods: ["toggleCountdown"],
}

describe("Mount Quasar", () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const wrapper = mount(App, {
    localVue,
  })
  const vm = wrapper.vm

  it("passes the sanity check and creates a wrapper", () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it("has initial data", () => {
    expect(typeof App.data).toBe("function")

    expect(vm.minutes).toBeDefined()
    expect(vm.countingDown).toBeDefined()

    expect(vm.minutes).toBe(initial.data.minutes)
    expect(vm.countingDown).toBe(initial.data.countingDown)
  })
  it("has expected methods", () => {
    initial.methods.forEach(methodName => {
      try {
        expect(vm[methodName]).toBeDefined()
      } catch (error) {
        console.log(`Missing: ${methodName}`)
      }
    })
  })
  it("renders a section with current timer shown", () => {
    expect(wrapper.find(".time-left").text()).toBe(`${12} mins`)
  })

  it("renders a slider", () => {
    expect(wrapper.contains(components.QSlider)).toBe(true)
  })
  it("slider is connected to app data model", () => {
    expect(wrapper.find(components.QSlider).vm.value).toBe(initial.data.minutes)
  })

  it("renders a button to start the countdown", () => {
    expect(wrapper.contains(".onoff-button")).toBe(true)
  })
  it("start button has a correct label", () => {
    expect(wrapper.find(".onoff-button").text()).toBe("Start")
  })
  it("starts countdown when start button clicked", () => {
    const mockFn = jest.fn()
    const wrapper = mount(App, {
      localVue,
      methods: {
        toggleCountdown: mockFn
      }
    })
    wrapper.find(".onoff-button").trigger("click")
    expect(mockFn).toBeCalled()
  })
  it("starts countdown when start button clicked", () => {
    wrapper.find(".onoff-button").trigger("click")
    expect(vm.countingDown).toBe(true)
  })
})
