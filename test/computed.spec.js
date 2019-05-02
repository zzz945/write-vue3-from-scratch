import Vue from "../src/index.js";

describe('Computed test', function() {
  it('Basic', done => {
  	var vm = new Vue({
  		data () {
        return {
          a:1
        }
      },
      computed: {
        b () {
          return this.a + 1
        },
      },
      render (h) {
        return h('p', {}, this.b)
      },
    }).$mount()

    expect(vm.b).toEqual(2)
    expect(vm.$el.textContent).toEqual('2')

    vm.a = 10
    expect(vm.b).toEqual(11)
    setTimeout(_ => {
      expect(vm.$el.textContent).toEqual('11')
      done()
    }, 0)
  })
  it('Chain', done => {
  	var vm = new Vue({
  		data () {
        return {
          a:1
        }
      },
      computed: {
        b () {
          return this.a + 1
        },
        c () {
          return this.b + 1
        },
      },
      render (h) {
        return h('p', {}, this.c)
      },
    }).$mount()

    expect(vm.c).toEqual(3)
    expect(vm.$el.textContent).toEqual('3')

    vm.a = 10
    expect(vm.c).toEqual(12)
    setTimeout(_ => {
      expect(vm.$el.textContent).toEqual('12')
      done()
    }, 0)
  })
});