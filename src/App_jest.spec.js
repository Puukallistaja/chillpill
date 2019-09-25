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

describe("Mount Quasar", () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const wrapper = mount(App, {
    localVue
  })
  const vm = wrapper.vm

  it("passes the sanity check and creates a wrapper", () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it("has renders a slider", () => {
    expect(wrapper.contains(components.QSlider)).toBe(true)
  })
})
