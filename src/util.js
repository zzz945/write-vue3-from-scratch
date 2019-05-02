export function remove (arr, item) {
  arr.splice(arr.findIndex(v => v === item), 1);
}

export const nextTick = (function () {
  const callbacks = []
  let pending = false
  let timerFunc

  function nextTickHandler () {
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }

  var p = Promise.resolve()
  var logError = err => { console.error(err) }
  
  timerFunc = () => {
    p.then(nextTickHandler).catch(logError)
  }

  return function queueNextTick (cb, ctx) {
    callbacks.push(() => {
      try {
        cb.call(ctx)
      } catch (e) {
        console.log(e, ctx, 'nextTick')
      }
    })
    if (!pending) {
      pending = true
      timerFunc()
    }
  }
})()