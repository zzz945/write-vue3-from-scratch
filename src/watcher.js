import { setTarget, clearTarget } from './proxy.js'

export class Watcher {
  constructor (vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
  }
  update ({pre, val}) { 
    this.cb.call(this.vm, pre, val)
  }
}

export class ComputedWatcher {
  constructor (vm, fn, cb) {
    this.vm = vm
    this.fn = fn
    this.cb = cb

    setTarget(this)
    this.value = this._get() // this will trigger the proxy getter in which we call collect with target set
    clearTarget()
  }
  update () { 
    const oldValue = this.value
    const value = this._get()
    this.cb.call(this.vm, oldValue, value)
  }
  _get () {
    return this.fn.call(this.vm)
  }
}