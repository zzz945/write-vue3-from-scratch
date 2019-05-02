import { nextTick } from './util.js'

const queue = []
let has = {}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
export function queueWatcher (watcher) {
  const id = watcher.id
  if (!has[id]) {
    has[id] = true
    queue.push(watcher)
    nextTick(flushSchedulerQueue)
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort((a, b) => a.id - b.id)

  // more watchers might be pushed as we run existing watchers
  for (let index = 0; index < queue.length; index++) {
    const watcher = queue[index]
    watcher.run()
  }

  resetSchedulerState()
}

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0
  has = {}
}