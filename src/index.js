import VNode from './vnode.js'
import { Watcher, ComputedWatcher, genWatcherId } from './watcher.js'
import Dep from './dep.js'
import { createProxy, setTarget, clearTarget } from './proxy.js'
import { nextTick } from './util.js'
import { queueWatcher } from './scheduler.js'

class Vue {
  constructor (options) {
    this.$options = options || {}
    this.id = genWatcherId()

    this.initProps()
    this.proxy = createProxy(this)
    this.initWatcher()
    this.initWatch()

    return this.proxy
  }
  $nextTick (cb) {
    nextTick(cb, this.proxy)
  }
  $emit (...options) {
    const [name, ...rest] = options
    const cb = this._events[name]
    if (cb) cb(...rest)
  }
  $watch (key, cb) {
    if(!this.deps[key]) {
      this.deps[key] = new Dep()
    }
    this.deps[key].addSub(new Watcher(this.proxy, key, cb))
  }
  $mount (root) {
    this.$el = root

    // collect dependences on first rendering
    setTarget(this)
    this.run()
    clearTarget()

    const { mounted } = this.$options
    mounted && mounted.call(this.proxy)

    return this
  }
  update () {
    queueWatcher(this)
  }
  run () {
    const parent = (this.$el || {}).parentElement

    const vnode = this.$options.render.call(this.proxy, this.createElement.bind(this))

    const oldEl = this.$el

    this.$el = this.patch(null, vnode)

    if (parent) {
      parent.replaceChild(this.$el, oldEl)
    }

    console.log('updated')
  }
  /**
   * TODO: patch just create new dom tree from new vnode at the present. we'll implement patch algorithm later.
   */
  patch (oldVnode, newVnode) {
    return this.createDom(newVnode)
  }
  createElement(tag, data, children) {
    const components = this.$options.components || {}

    if (tag in components) {
      return new VNode(tag, data, children, components[tag])
    }

    return new VNode(tag, data, children)
  }
  createDom (vnode) {
    // vnode is a component
    if (vnode.componentOptions) { 
      const componentInstance = new Vue(Object.assign({}, vnode.componentOptions, { propsData: vnode.data.props }))
      vnode.componentInstance = componentInstance
      componentInstance._events = (vnode.data || {}).on || {}
      componentInstance.$mount()
      return componentInstance.$el
    }

    const el = document.createElement(vnode.tag)
    el.__vue__ = this

    const data = vnode.data || {}

    // set dom attributes
    const attributes = data.attrs || {}
    for (let key in attributes) {
      el.setAttribute(key, attributes[key]);
    }

    // set class
    const classname = data.class
    if (classname) {
      el.setAttribute('class', classname);
    }

    // set dom eventlistener
    const events = data.on || {}
    for (let key in events) {
      el.addEventListener(key, events[key])
    }

    if (!Array.isArray(vnode.children)) {
      el.textContent = vnode.children + ''
    } else {
      vnode.children.forEach(child => {
        if (typeof child === 'string') {
          el.textContent = child
        } else {
          el.appendChild(this.createDom(child))
        }
      });
    }

    return el
  }
  initWatcher () {
    this.deps = {}
  }
  initWatch () {
    const watch = this.$options.watch || {}
    const computed = this.$options.computed || {}
    const data = this.$data

    for (let key in watch) {
      const handler = watch[key]
      if (key in data) {
        this.$watch(key, handler.bind(this.proxy))
      } else if (key in computed){
        new ComputedWatcher(this.proxy, computed[key], handler)
      } else {
        throw "i don't know what you wanna do"
      }
    }
  }
  notifyChange (key, pre, val) {
    const dep = this.deps[key]
    dep && dep.notify({pre, val})
  }
  initProps () {
    this._props = {}

    const { props: propsOptions, propsData } = this.$options
    if (!propsOptions || !propsOptions.length) return
  
    propsOptions.forEach(key => {
      this._props[key] = propsData[key]
    })
  }
}

export default Vue