import { remove } from './util.js'

export default class Dep {
  constructor () {
    this.subs = []
  }
  /**
   * @param {*} sub must has update method
   */
  addSub (sub) {
    this.subs.push(sub)
  }
  removeSub (sub) {
    remove(this.subs, sub)
  }
  notify (payload) {
    const subs = this.subs
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update(payload)
    }
  }
}
