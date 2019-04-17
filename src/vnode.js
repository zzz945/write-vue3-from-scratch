export default function VNode(tag, data, children) {
  this.tag = tag
  this.data = data
  this.children = children
}

export function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, val)
}