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
    
    vm.a = 3
    vm.$watch('a', (pre, val) => {
      expect(pre).toEqual(2);
      expect(val).toEqual(3);
    })
  });
});