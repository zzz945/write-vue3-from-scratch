import Vue from "../src/index.js";

describe('Mvvm', function() {
  it('Basic', done => {
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
    setTimeout(_ => {
      expect(vm.$el.textContent).toBe('1')

      vm.a = 999
      setTimeout(_ => {
        expect(vm.$el.textContent).toBe('999')
        done()
      })
    })
  });

  it('Deep Object', done => {
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

    setTimeout(_ => {
      expect(vm.$el.textContent).toBe('1')

      vm.a.b = 999
      setTimeout(_ => {
        expect(vm.$el.textContent).toBe('999')
        done()
      })
    })
  });

  it('Add/Delete Property', done => {
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
    setTimeout(_ => {
      expect(vm.$el.textContent).toBe('0')

      vm.a.b = 10
      expect(vm.a.b).toBe(10)
      setTimeout(_ => {
        expect(vm.$el.textContent).toBe('10')

        delete vm.a.b
        expect(vm.a.b).toBe(undefined)
        setTimeout(_ => {
          expect(vm.$el.textContent).toBe('undefined')
          done()
        }, 0)
      }, 0)
    }, 0)
  });

  it('Array Setter/Getter', done => {
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
    setTimeout(_ => {
      expect(vm.$el.textContent).toBe('world')
      done()
    }, 0)
  });

  it('Array push/splice', done => {
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
    setTimeout(_ => {
      expect(vm.$el.textContent).toBe('world')

      vm.a.splice(2, 0, '!!!')
      expect(vm.a[2]).toBe('!!!')
      setTimeout(_ => {
        expect(vm.$el.textContent).toBe('!!!')
        done()
      }, 0)
    }, 0)
  });

  it('change property of object in array', done => {
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
    setTimeout(_ => {
      expect(vm.$el.textContent).toBe('world')
      done()
    }, 0)
  });
});