import Vue from "../src/index.js";

describe('Method', function() {
  it('Basic', function() {
  	var vm = new Vue({
      props: ['msg'],
      propsData: {
        msg: 'hello'
      },
      render (h) {
        return h('div', {}, this.msg)
      },
    }).$mount()

    expect(vm.msg).toEqual('hello')
    expect(vm.$el.textContent).toEqual('hello')
  });
});