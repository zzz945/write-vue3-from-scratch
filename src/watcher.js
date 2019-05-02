/**
 * a watcher need to implement update and run method and has id
 * current watchers: Watcher, ComputedWatcher, Vue
 */

import { setTarget, clearTarget } from './proxy.js'
import { queueWatcher } from './scheduler.js'

let id = 0
export function genWatcherId () {
  return id++
}

export class Watcher {
  constructor (vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    this.id = genWatcherId()
  }
  update ({pre, val}) { 
    this.pre = pre
    this.val = val
    queueWatcher(this)
  }
  run () {
    this.cb.call(this.vm, this.pre, this.val)
  }
}

export class ComputedWatcher {
  constructor (vm, fn, cb) {
    this.vm = vm
    this.fn = fn
    this.cb = cb
    this.id = genWatcherId()

    setTarget(this)
    this.value = this._get() // this will trigger the proxy getter in which we call collect with target set
    clearTarget()
  }
  update () {
    queueWatcher(this)
  }
  run () {
    const oldValue = this.value
    const value = this._get()
    this.cb.call(this.vm, oldValue, value)
  }
  _get () {
    return this.fn.call(this.vm)
  }
}