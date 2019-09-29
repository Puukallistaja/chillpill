/**
 * @jest-environment jsdom
 */
import { createLocalVue, mount } from "@vue/test-utils"
import * as All from "quasar"
import TimerSlider from "../TimerSlider.vue"

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
	wrapper = mount(TimerSlider, {
		localVue,
		propsData: {
			minutes: 12,
		},
	})
	vm = wrapper.vm
})

describe("TimerSlider", () => {
	it("creates a vue instance", () => {
		expect(wrapper.isVueInstance()).toBe(true)
	})
	it("sets slider value through props", () => {
		expect(wrapper.find(components.QSlider).vm.value).toStrictEqual(vm.minutes)
	})
})
