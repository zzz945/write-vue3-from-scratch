import Vue from "../src/index.js";

describe('Event test', function() {
  it('Basic', function() {
    var cb = jasmine.createSpy('cb');

  	var vm = new Vue({
      render (h) {
        return h('button', { 
          class: 'btn',
          on: { 'click': cb }
        }, [])
      },
    }).$mount()

    document.body.appendChild(vm.$el)
    const btn = document.querySelector('.btn')
    expect(btn.tagName).toEqual('BUTTON')
    btn.click()
    expect(cb).toHaveBeenCalled()

    document.body.removeChild(vm.$el)
  });
});