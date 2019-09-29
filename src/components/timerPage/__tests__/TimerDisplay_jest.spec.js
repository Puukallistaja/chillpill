/**
 * @jest-environment jsdom
 */
import { createLocalVue, shallowMount } from "@vue/test-utils"
import * as All from "quasar"
import TimerDisplay from "../TimerDisplay.vue"

const { Quasar, date } = All
const { formatDate } = date

let wrapper, vm

const localVue = createLocalVue()
localVue.use(Quasar)

beforeEach(() => {
	wrapper = shallowMount(TimerDisplay, {
		localVue,
		propsData: {
			millis: 1000 * 60 * 12,
		},
	})
	vm = wrapper.vm
})

describe("TimerDisplay", () => {
	it("creates a vue instance", () => {
		expect(wrapper.isVueInstance()).toBe(true)
	})
	it("sets display value through props", () => {
		expect(wrapper.find(".display").text()).toStrictEqual("12:00")
	})
	it("formats millis to human-readable", () => {
		expect(formatDate(vm.millis, "mm:ss")).toStrictEqual("12:00")
	})
})
