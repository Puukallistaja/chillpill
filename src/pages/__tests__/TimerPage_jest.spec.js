/**
 * @jest-environment jsdom
 */
import { createLocalVue, shallowMount, mount } from "@vue/test-utils"
import TimerPage from "../TimerPage.vue"
import Timer from "../../components/timerPage/Timer"
import * as All from "quasar"

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
