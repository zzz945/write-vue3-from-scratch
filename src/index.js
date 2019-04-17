class Vue {
  constructor (options) {
    this.$options = options

    const proxy = this.initDataProxy()
    this.initWatch()

    return proxy
  }
  $watch (key, cb) {
    this.dataNotifyChain[key] = this.dataNotifyChain[key] || []
    this.dataNotifyChain[key].push(cb)
  }
  initDataProxy () {
    const data = this.$options.data()

    // https://stackoverflow.com/questions/37714787/can-i-extend-proxy-with-an-es2015-class
    return new Proxy(this, {
      set: (_, key, value) => {
        const pre = data[key]
        data[key] = value
        this.notifyDataChange(key, pre, value)
        return true
      },
      get: (_, key) => {
        if (key in this) return this[key] // 优先取类方法和属性
        else return data[key]
      }
    })
  }
  initWatch () {
    this.dataNotifyChain = {}
  }
  notifyDataChange (key, pre, val) {
    (this.dataNotifyChain[key] || []).forEach(cb => cb(pre, val))
  }
}

export default Vue