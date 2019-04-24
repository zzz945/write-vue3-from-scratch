import Vue from "../src/index.js";

describe('Component', () => {
  it('render vnode with component', () => {
    const vm = new Vue({
      data () {
        return { msg1: 'hello', msg2: 'world' }
      },
      render (h) {
        return h('div', null, [
          h('my-component', { props: {msg: this.msg1}}),
          h('my-component', { props: {msg: this.msg2}})
        ])
      },
      components: {
        'my-component': {
          props: ['msg'],
          render (h) {
            return h('p', null, this.msg)
          }
        }
      }
    }).$mount()

    expect(vm.$el.outerHTML).toEqual(`<div><p>hello</p><p>world</p></div>`)
  })

  it('component mvvm', () => {
    const vm = new Vue({
      data () {
        return { parentMsg: 'hello' }
      },
      render (h) {
        return h('my-component', { props: {msg: this.parentMsg }})
      },
      components: {
        'my-component': {
          props: ['msg'],
          render (h) {
            return h('p', null, this.msg)
          }
        }
      }
    }).$mount()

    expect(vm.$el.outerHTML).toEqual('<p>hello</p>')
    vm.parentMsg = 'hi'
    expect(vm.$el.outerHTML).toEqual('<p>hi</p>')
  })

  it('event & action', () => {
    var cb = jasmine.createSpy('cb');

    const vm = new Vue({
      render (h) {
        return h('my-component', { on: {
          mounted: cb
        }})
      },
      components: {
        'my-component': {
          render (h) {
            return h('div', {}, 'my-component')
          },
          mounted () {
            this.$emit('mounted', {payload: "payload"})
          }
        }
      }
    }).$mount()

    expect(cb).withContext(vm)
    expect(cb).toHaveBeenCalledWith({payload: "payload"})
  })
}) 