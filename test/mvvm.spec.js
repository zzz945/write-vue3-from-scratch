import Vue from "../src/index.js";

describe('Mvvm', function() {
  it('Basic', function() {
    const vm = new Vue({
      data () {
        return {
          a: 0,
        }
      },
      render (h) {
        return h('div', null, this.a)
      }
    }).$mount()
    vm.a++
    expect(vm.$el.textContent).toBe('1')
    vm.a = 999
    expect(vm.$el.textContent).toBe('999')
  });

  it('Deep Object', function() {
    const vm = new Vue({
      data () {
        return {
          a: { b: 0},
        }
      },
      render (h) {
        return h('div', null, this.a.b)
      }
    }).$mount()

    expect(vm.a.b).toBe(0)
    vm.a.b++
    expect(vm.a.b).toBe(1)

    expect(vm.$el.textContent).toBe('1')
    vm.a.b = 999
    expect(vm.$el.textContent).toBe('999')
  });

  it('Add/Delete Property', function() {
    const vm = new Vue({
      data () {
        return {
          a: {},
        }
      },
      render (h) {
        return h('div', null, this.a.b)
      }
    }).$mount()

    expect(vm.$el.textContent).toBe('undefined')

    vm.a.b = 0
    expect(vm.a.b).toBe(0)
    expect(vm.$el.textContent).toBe('0')

    vm.a.b = 10
    expect(vm.a.b).toBe(10)
    expect(vm.$el.textContent).toBe('10')
  });
});