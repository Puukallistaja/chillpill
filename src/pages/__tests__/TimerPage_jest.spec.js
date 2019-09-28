/**
 * @jest-environment jsdom
 */
import { createLocalVue, shallowMount, mount } from "@vue/test-utils"
import TimerPage from "../TimerPage.vue"
import Timer from "../../components/timerPage/Timer"

let wrapper, vm

const localVue = createLocalVue()

beforeEach(() => {
  wrapper = shallowMount(TimerPage, {
    localVue,
  })
  vm = wrapper.vm
})

describe("TimerPage", () => {
  it("creates a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it("renders the timer component", () => {
    expect(wrapper.contains(Timer)).toBe(true)
  })
})
