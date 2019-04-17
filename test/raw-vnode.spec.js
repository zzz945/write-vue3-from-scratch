import Vue from "../src/index.js"

describe('Raw vnode render', () => {
  it('basic usage', () => {
    const vm = new Vue({
      render (h) {
        return h('div', null, 'hello' /* string as children*/)
      }
    }).$mount()

    expect(vm.$el.tagName).toBe('DIV')
    expect(vm.$el.textContent).toBe('hello')
  })
}) 