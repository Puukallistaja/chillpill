/**
 * @jest-environment jsdom
 */
import { createLocalVue, shallowMount, mount } from "@vue/test-utils"
import Timer from "../Timer.vue"
import TimerButtons from "../TimerButtons.vue"
import TimerSlider from "../TimerSlider.vue"

let wrapper, vm

const localVue = createLocalVue()
const initial = {
	millis: 1000 * 60 * 12,
}

beforeEach(() => {
	jest.useFakeTimers()
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
	it("counts millis down", () => {
		vm.startCountdown()
		jest.advanceTimersByTime(1000)
		vm.stopCountdown()
		expect(vm.millis).toBe(initial.millis - 1000)
		vm.startCountdown()
		jest.advanceTimersByTime(1000)
		vm.stopCountdown()
		expect(vm.millis).toBe(initial.millis - 2000)
	})
	/**
	 * Buttons
	 */
	it("renders buttons", () => {
		expect(wrapper.contains(TimerButtons)).toBe(true)
	})
	it("can change state when event is fired", () => {
		wrapper.find(TimerButtons).vm.$emit("set-counter-to", "COUNTING")
		expect(vm.timerState.IDLE).toBe(false)
		expect(vm.timerState.PAUSED).toBe(false)
		expect(vm.timerState.COUNTING).toBe(true)
	})
	it("can change state when event is fired", () => {
		wrapper.find(TimerButtons).vm.$emit("set-counter-to", "IDLE")
		expect(vm.timerState.IDLE).toBe(true)
	})
	it("changes state when event is fired", () => {
		wrapper.find(TimerButtons).vm.$emit("set-counter-to", "PAUSED")
		expect(vm.timerState.PAUSED).toBe(true)
	})
	/**
	 * Slider
	 */
	it("renders slider", () => {
		expect(wrapper.contains(TimerSlider)).toBe(true)
	})
	it("emits event and sets millis to payload", () => {
		wrapper.find(TimerSlider).vm.$emit("set-countdown-time", 1000 * 60)
		expect(vm.minutes).toEqual(1)
	})
})
