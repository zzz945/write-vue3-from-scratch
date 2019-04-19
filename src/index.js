import VNode, {createEmptyVNode} from './vnode.js'

class Vue {
  constructor (options) {
    this.$options = options

    this.proxy = this.initDataProxy()
    this.initWatch()

    return this.proxy
  }
  $watch (key, cb) {
    this.dataNotifyChain[key] = this.dataNotifyChain[key] || []
    this.dataNotifyChain[key].push(cb)
  }
  $mount (root) {
    const { mounted, render } = this.$options

    const vnode = render.call(this.proxy, this.createElement)
    this.$el = this.createElm(vnode)

    if (root) {
      const parent = root.parentElement
      parent.removeChild(root)
      parent.appendChild(this.$el)
    }

    mounted && mounted.call(this.proxy)

    return this
  }
  update () {
    const parent = this.$el.parentElement
    
    if (parent) {
      parent.removeChild(this.$el)
    }

    const vnode = this.$options.render.call(this.proxy, this.createElement)
    this.$el = this.patch(null, vnode)

    if (parent) {
      parent.appendChild(this.$el)
    }

    console.log('updated')
  }
  patch (oldVnode, newVnode) {
    return this.createElm(newVnode)
  }
  createElement(tag, data, children) {
    return new VNode(tag, data, children)
  }
  createElm (vnode) {
    const el = document.createElement(vnode.tag)
    el.__vue__ = this

    for (let key in vnode.data) {
      el.setAttribute(key, vnode.data[key]);
    }

    // set dom eventlistener
    const events = (vnode.data || {}).on || {}
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
          el.appendChild(createElm(child))
        }
      });
    }

    return el
  }
  initDataProxy () {
    // https://stackoverflow.com/questions/37714787/can-i-extend-proxy-with-an-es2015-class

    const data = this.$data = this.$options.data ? this.$options.data() : {}

    const createDataProxyHandler = path => {
      return {
        set: (obj, key, value) => {
          const fullPath = path ? path + '.' + key : key

          const pre = obj[key]
          obj[key] = value
  
          this.notifyDataChange(fullPath, pre, value)
  
          return true
        },
        get: (obj, key) => {
          const fullPath = path ? path + '.' + key : key

          // 依赖收集
          this.collect(fullPath)

          if (typeof obj[key] === 'object' && obj[key] !== null) {
            return new Proxy(obj[key], createDataProxyHandler(fullPath))
          } else {
            return obj[key]
          }
        },
        deleteProperty: (obj, key) => {
          if (key in obj) {
            const fullPath = path ? path + '.' + key : key
            const pre = obj[key]
            delete obj[key]
            this.notifyDataChange(fullPath, pre)
          }
          return true
        }
      }
    }

    const handler = {
      set: (_, key, value) => {
        if (key in data) { // 优先设置data
          return createDataProxyHandler().set(data, key, value)
        } else {
          this[key] = value
        }

        return true
      },
      get: (_, key) => {
        const methods = this.$options.methods || {}

        if (key in data) { // 优先取data
          return createDataProxyHandler().get(data, key)
        } 
        if (key in methods) return methods[key].bind(this.proxy)
        else return this[key]
      }
    }

    return new Proxy(this, handler)
  }
  collect (key) {
    this.collected = this.collected || {}
    if (!this.collected[key]) {
      this.$watch(key, this.update.bind(this))
      this.collected[key] = true
    }
  }
  initWatch () {
    this.dataNotifyChain = {}
  }
  notifyDataChange (key, pre, val) {
    (this.dataNotifyChain[key] || []).forEach(cb => cb(pre, val))
  }
}

export default Vue