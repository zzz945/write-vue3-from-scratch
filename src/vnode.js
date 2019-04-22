
/**
 * @param {string} tag 
 * @param {object} data https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
 * @param {array|string} children 
 */
export default function VNode(tag, data, children) {
  this.tag = tag
  this.data = data
  this.children = children
}

export function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, val)
}