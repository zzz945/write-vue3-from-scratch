import Vue from "../src/index.js";

describe('Watch', function() {
  it('Data', done => {
    var cb = jasmine.createSpy('cb');

  	var vm = new Vue({
  		data () {
        return {
          a:2,
        }
      },
      watch: {
        a (pre, val) {
          cb(pre, val)
        }
      },
    })
    
    vm.a = 3
    
    setTimeout(_ => {
      expect(cb).toHaveBeenCalledWith(2, 3)
      done()
    }, 0)
  });
  it('Computed', done => {
    var cb = jasmine.createSpy('cb');

  	var vm = new Vue({
  		data () {
        return {
          a:2,
        }
      },
      computed: {
        b () {
          return this.a + 1
        }
      },
      watch: {
        b (pre, val) {
          cb(this.b, pre, val)
        }
      },
    })
    expect(vm.b).toEqual(3)
    vm.a = 3
    expect(vm.b).toEqual(4)
    setTimeout(_ => {
      expect(cb).toHaveBeenCalledWith(4, 3, 4)
      done()
    })
  });
});