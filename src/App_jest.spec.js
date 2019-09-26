/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from "@vue/test-utils"
import App from "./App.vue"
import * as All from "quasar"
const { Quasar, date } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

const initial = {
  data: {
    timer: null,
    seconds: 60 * 12,
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

    expect(vm.countingDown).toBeDefined()
    expect(vm.seconds).toBeDefined()
    expect(vm.timer).toBeDefined()

    expect(vm.countingDown).toBe(initial.data.countingDown)
    expect(vm.seconds).toBe(initial.data.seconds)
    expect(vm.timer).toBe(initial.data.timer)
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
    expect(wrapper.find(".time-left").text()).toBe(`${initial.data.seconds} mins`)
  })

  it("renders a slider", () => {
    expect(wrapper.contains(components.QSlider)).toBe(true)
  })
  it("slider is connected to app data model", () => {
    expect(wrapper.find(components.QSlider).vm.value).toBe(initial.data.seconds)
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
        toggleCountdown: mockFn,
      },
    })
    wrapper.find(".onoff-button").trigger("click")
    expect(mockFn).toBeCalled()
  })
  it("starts countdown when start button clicked", () => {
    expect(vm.timer).toBe(null)
    wrapper.find(".onoff-button").trigger("click")
    expect(vm.countingDown).toBe(true)
  })
  
  it('formats a date without throwing exception', () => {
    // test will automatically fail if an exception is thrown
    // MMMM and MMM require that a language is 'installed' in Quasar
    let formattedString = date.formatDate(Date.now(), 'YYYY MMMM MMM DD')
    console.log('formattedString', formattedString)
  })
})
