class Vue {
  constructor (options) {
    this.$options = options

    const proxy = this.initDataProxy()
    return proxy
  }
  initDataProxy () {
    const data = this.$options.data()

    // https://stackoverflow.com/questions/37714787/can-i-extend-proxy-with-an-es2015-class
    return new Proxy(this, {
      set(_, key, value) {
        data[key] = value
      },
      get(_, key) {
        return data[key]
      }
    })
  }
}

export default Vue