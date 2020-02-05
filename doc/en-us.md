## Why vue source code difficult to read

1. Include too many features

The main goal of reading vue source code is understanding the whole picture and some core features such as mvvm and virtual dom. Some features such as keep alive, dynamic component and functional component, will make things complicated.

2. Backward compatibility

Vue source code has a lot of backward compatible code, making it too complicated to understand. For example, Vue2.0 uses defineProperty to implement mvvm for backward compatibility. However, it is much easier to do that with ES6 Proxy.

## Write vue from scratch

This project follows [Vue3.0 plans](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf). I write a simplest vue step by step to make each commit easy to understand.

## Step

For each step, I write test case first, then implement it. (TDD)

### Basic

In this part, we implement some basic features.

1. [TDD Environment Setup](https://github.com/zzz945/write-vue3-from-scratch/blob/master/doc/TDD%20Environment%20Setup.md)

2. [Data Proxy](https://github.com/zzz945/write-vue3-from-scratch/commit/3d4b919252a98a9f6898329016a17aa1d6d2da70)

3. [Implement $watch](https://github.com/zzz945/write-vue3-from-scratch/commit/e69f5e870014be7417d08fd0368d8aa6b9cba10e)

4. [html element rendering](https://github.com/zzz945/write-vue3-from-scratch/commit/89df7464fec10653b2e12e4cb42756d71312a5dd)

5. [Support method](https://github.com/zzz945/write-vue3-from-scratch/commit/6540bcfb03ad6d64cd28e5be069e553976f00939)

6. [Support lifecycle](https://github.com/zzz945/write-vue3-from-scratch/commit/93ba39e19e2ad2401fe07d4702d95bed6db31a90)

7. [html element event listener](https://github.com/zzz945/write-vue3-from-scratch/commit/2f9297b1c389095ebc58f4742fa770abc33186c5)

8. [Implement mvvm](https://github.com/zzz945/write-vue3-from-scratch/commit/664aef66528ce3c464cea4abea90ec223654b6af)

9. [Basic Demo](https://github.com/zzz945/write-vue3-from-scratch/commit/1b12d416a8e9d0e59f1be5b421c378b06bc1f490)

Running ```npm run test``` and then click the DEBUG button in the pop-up browser, you will see the demo.

### Mvvm in depth

In this part, we improve mvvm to implement all features in vue2.x. Moreover, we implement "Detection of property addition / deletion" in vue3.0 plan. So, no Vue.$set.

1. [[mvvm]support deep object](https://github.com/zzz945/write-vue3-from-scratch/commit/1d6d3f0676de5cd42ded7b0a650200e6c1a0441e)

2. [[mvvm]Detection of property addition](https://github.com/zzz945/write-vue3-from-scratch/commit/61eb32a033418f7c9a0fc7d06c9ec097084fec0c)

3. [[mvvm]Detection of property deletion](https://github.com/zzz945/write-vue3-from-scratch/commit/e33f9a6e568a304d9b9a8030051e9b5114de8881)

4. [[mvvm]Support array](https://github.com/zzz945/write-vue3-from-scratch/commit/d55b3947626ac63ac2a1b7b74379594ad3273d09)

5. [mvvm in depth demo](https://github.com/zzz945/write-vue3-from-scratch/commit/158b38d5fd786094d4225f243dc90a9f8009a5e4)

6. [Refactoring and comment](https://github.com/zzz945/write-vue3-from-scratch/commit/84fbcca866edeabe5c7c884e0a65893e8bbd744c)


### Component

1. [Support props](https://github.com/zzz945/write-vue3-from-scratch/commit/c58a0f060227569b9e298a5ad8d8bfdc399b40b3)

2. [Component rendering](https://github.com/zzz945/write-vue3-from-scratch/commit/9dc6bd598c7b57fa588e5541a5993b044fd5888e)

3. [Component event & action](https://github.com/zzz945/write-vue3-from-scratch/commit/9202efc753749782e6274d19a66026289b22ec03)

### Computed & watch

1. [Computed](https://github.com/zzz945/write-vue3-from-scratch/commit/c796f1a65b5b5d831fa0fce0dfb6da4b894987e3)

2. [watch](https://github.com/zzz945/write-vue3-from-scratch/commit/b06f36e035c396d30944e23a9bcf950737912400)

3. [Refactor](https://github.com/zzz945/write-vue3-from-scratch/commit/5b4b542670af037f6418726662c8a546bbcd80bc)

4. [$nextTick](https://github.com/zzz945/write-vue3-from-scratch/commit/d1fe1760a55bd71fe70904033499597304a64113)

5. [Watcher Scheduler](https://github.com/zzz945/write-vue3-from-scratch/commit/3acca9bbd5b6dc7baa744fdea9832234c8298f83)

Watcher scheduler solves the problem that changing multiple data triggers rendering multiple times
```js
var cb = jasmine.createSpy('cb');

var vm = new Vue({
  data () {
    return {
      a:1,
      b:2,
    }
  },
  render (h) {
    cb()
    return h('p', null, this.a + this.b)
  }
}).$mount()

expect(cb).toHaveBeenCalledTimes(1)

vm.a = 10
vm.b = 11
setTimeout(_ => {
  expect(cb).toHaveBeenCalledTimes(2) // change 'a' and 'b' only trigger one render
  done()
})
```

### Todo list

1. Patch

2. Scoped Slot
