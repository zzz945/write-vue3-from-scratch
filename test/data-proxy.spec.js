import Vue from "../src/index.js";

describe('Proxy test', function() {
  it('should proxy vm._data.a = vm.a', function() {
  	var vm = new Vue({
  		data () {
        return {
          a: 2
        }
  		}
  	})
    expect(vm.a).toEqual(2);
  });
});