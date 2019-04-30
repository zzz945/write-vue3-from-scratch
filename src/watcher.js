export default class Watcher {
  constructor (vm, fn, cb) {
    this.vm = vm
    this.fn = fn
    this.cb = cb

    // this will trigger the proxy getter in which we call collect with _target
    vm._target = this
    this.value = fn.call(vm)
    vm._target = null
  }
  update () { 
    const oldValue = this.value
    this.value = this.fn.call(this.vm)
    this.cb.call(this.vm, oldValue, this.value)
  }
}