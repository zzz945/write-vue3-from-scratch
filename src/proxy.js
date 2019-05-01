let _target = null

export function createProxy (vueInstance) {
  /**
   * collect: collect dependences
   * @param {string} key The property path in data. For example, student.name students[0].name
   */
  function collect (key) {
    // _target is set in Watcher's constructor
    if (_target) {
      vueInstance.$watch(key, _target.update.bind(_target))
    }
  }

  const createDataProxyHandler = path => {
    return {
      set: (obj, key, value) => {
        const fullPath = path ? path + '.' + key : key

        const pre = obj[key]
        obj[key] = value

        vueInstance.notifyChange(fullPath, pre, value)

        return true
      },
      get: (obj, key) => {
        const fullPath = path ? path + '.' + key : key

        collect(fullPath)

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
          vueInstance.notifyChange(fullPath, pre)
        }
        return true
      }
    }
  }

  const data = vueInstance.$data = vueInstance.$options.data ? vueInstance.$options.data() : {}
  const props = vueInstance._props
  const methods = vueInstance.$options.methods || {}
  const computed = vueInstance.$options.computed || {}

  const handler = {
    set: (_, key, value) => {
      if (key in props) { // first prop
        return createDataProxyHandler().set(props, key, value)
      } else if (key in data) { // then data
        return createDataProxyHandler().set(data, key, value)
      } else { // then class propertry and function
        vueInstance[key] = value
      }

      return true
    },
    get: (_, key) => {
      if (key in props) { // first prop
        return createDataProxyHandler().get(props, key)
      } else if (key in data) { // then data 
        return createDataProxyHandler().get(data, key)
      } else if (key in computed) { // then computed
        return computed[key].call(vueInstance.proxy)
      } else if (key in methods) { // then methods
        return methods[key].bind(vueInstance.proxy)
      } else { // then class propertry and function
        return vueInstance[key]
      }
    }
  }

  return new Proxy(vueInstance, handler)
}


/**
 * @param {Watcher|ComputedWatcher|Vue} target must implement update method
 */
export function setTarget (target) {
  _target = target
}

export function clearTarget () {
  _target = null
}