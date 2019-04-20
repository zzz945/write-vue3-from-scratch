import Vue from "../src/index.js";

describe('Demo', function() {
  afterEach (() => {
    document.body.append(document.createElement('br'))
    document.body.append(document.createElement('br'))
    document.body.append(document.createElement('br'))
  }) 

  it('Basic', function() {
    const title = document.createElement('h2')
    title.textContent = 'Basic Demo'
    document.body.append(title)

    const vm = new Vue({
      data () {
        return {
          a: 0,
        }
      },
      render (h) {
        return h('button', { 
          on: { 'click': this.handleClick }
        }, this.a)
      },
      methods: {
        handleClick () {
          this.a++
        }
      }
    }).$mount()

    document.body.append(vm.$el)
  });

  it('Mvvm in depth', function() {
    const title = document.createElement('h2')
    title.textContent = 'Mvvm In Depth'
    document.body.append(title)

    const vm = new Vue({
      data () {
        return {
          a: [{}],
        }
      },
      render (h) {
        return h('div', {}, this.a.map((item,i) => {
          return h('div', {}, [         
            h('button', { 
              on: { 'click': _ => this.setNumber(item) }
            }, 'Set Number'),
            h('button', { 
              on: { 'click': _ => this.deleteNumber(item) }
            }, 'Delete Number'),
            h('span', {}, item.number),
            h('button', { 
              on: { 'click': this.appendRow }
            }, 'Append Row'),
            h('button', { 
              on: { 'click': _ => this.removeRow(i) }
            }, 'Remove Row'),
            h('br', {}, ''),
          ])
        }
))
      },
      methods: {
        setNumber (item) {
          item.number = Math.random().toFixed(4)*100
        },
        deleteNumber (item) {
          delete item.number
        },
        appendRow () {
          this.a.push({})
        },
        removeRow (idx) {
          this.a.splice(idx, 1)
        }
      }
    }).$mount()

    document.body.append(vm.$el)
  });
});