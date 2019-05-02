import Vue from "../src/index.js";

describe('Watcher Scheduler', function() {
  it('Watcher Run Once', done => {
    var cb = jasmine.createSpy('cb');

  	var vm = new Vue({
  		data () {
        return {
          a:1,
          b:2,
        }
      },
      computed: {
        c () {
          return this.a+this.b
        }
      },
      watch: {
        c () {
          cb()
        }
      }
    })

    vm.a = 10
    vm.b = 11
    setTimeout(_ => {
      expect(cb).toHaveBeenCalledTimes(1)
      done()
    })
  });
  it('Render Once', done => {
    var cb = jasmine.createSpy('cb');

  	var vm = new Vue({
  		data () {
        return {
          a:1,
          b:2,
        }
      },
      render (h) {
        cb()
        return h('p', null, this.a + this.b)
      }
    }).$mount()

    expect(cb).toHaveBeenCalledTimes(1)

    vm.a = 10
    vm.b = 11
    setTimeout(_ => {
      expect(cb).toHaveBeenCalledTimes(2)
      done()
    })
  });
});