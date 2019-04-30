import Vue from "../src/index.js";

describe('Watch', function() {
  it('Data', function() {
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
    expect(cb).toHaveBeenCalledWith(2, 3)
  });
  it('Computed', function() {
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
    expect(cb).toHaveBeenCalledWith(4, 3, 4)
  });
});