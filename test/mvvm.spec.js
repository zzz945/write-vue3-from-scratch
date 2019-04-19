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

    delete vm.a.b
    expect(vm.a.b).toBe(undefined)
    expect(vm.$el.textContent).toBe('undefined')
  });

  it('Array Setter/Getter', function() {
    const vm = new Vue({
      data () {
        return {
          a: ['hello'],
        }
      },
      render (h) {
        return h('div', null, this.a[0])
      }
    }).$mount()

    expect(vm.a[0]).toBe('hello')
    expect(vm.$el.textContent).toBe('hello')
    vm.a[0] = 'world'
    expect(vm.a[0]).toBe('world')
    expect(vm.$el.textContent).toBe('world')
  });

  it('Array push/splice', function() {
    const vm = new Vue({
      data () {
        return {
          a: ['hello'],
        }
      },
      render (h) {
        return h('div', null, this.a[this.a.length-1])
      }
    }).$mount()

    expect(vm.a[0]).toBe('hello')
    expect(vm.$el.textContent).toBe('hello')

    vm.a.push('world')
    expect(vm.a[1]).toBe('world')
    expect(vm.$el.textContent).toBe('world')

    vm.a.splice(2, 0, '!!!')
    expect(vm.a[2]).toBe('!!!')
    expect(vm.$el.textContent).toBe('!!!')
  });

  it('change property of object in array', function() {
    const vm = new Vue({
      data () {
        return {
          a: [{msg: 'hello'}],
        }
      },
      render (h) {
        return h('div', null, this.a[0].msg)
      }
    }).$mount()

    expect(vm.a[0].msg).toBe('hello')
    expect(vm.$el.textContent).toBe('hello')

    vm.a[0].msg = 'world'
    expect(vm.a[0].msg).toBe('world')
    expect(vm.$el.textContent).toBe('world')
  });
});