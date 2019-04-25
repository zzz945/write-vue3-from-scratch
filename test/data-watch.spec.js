import Vue from "../src/index.js";

describe('Watch data change', function() {
  it('cb is called', function() {
  	var vm = new Vue({
  		data () {
        return {
          a: 2
        }
  		}
    })

    var cb = jasmine.createSpy('cb');

    vm.$watch('a', (pre, val) => {
      cb(pre, val)
    })
    vm.a = 3

    expect(cb).toHaveBeenCalledWith(2, 3)
  });
});
