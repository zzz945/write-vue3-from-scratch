## Vue源码为什么难读

1. Vue源码中80%是非核心功能。而我们读源码的目的，只想了解全貌及部分核心功能，比如数据代理、双向绑定、vnode渲染、component渲染等。

2. Vue源码中包含大量向后兼容代码。而我们读源码的目的，只想了解思路而非细节。举个最简单的例子，用浏览器原生的proxy实现数据代理和双向绑定，就比Vue2中defineProperty的hack做法要简洁很多。

## 目标

《write-vue3-from-scratch》系列文章，将按Vue3.0公开的思路，不care浏览器兼容性，用最新的技术，写一个最简化的Vue。跟随我的步骤，你将会对Vue有个清晰的理解。

## 方法：测试驱动开发

### Why

1. 控制质量，便于回归测试，提高开发效率
2. test case即文档

### How

对于每个feature，我们首先做几个准入case，再写代码实现出来。

### 步骤

1. [TDD环境搭建](https://github.com/zzz945/write-vue3-from-scratch/blob/master/01.TDD%20Environment%20Setup.md)

2. [Data代理](https://github.com/zzz945/write-vue3-from-scratch/commit/3d4b919252a98a9f6898329016a17aa1d6d2da70)

3. [实现$watch](https://github.com/zzz945/write-vue3-from-scratch/commit/e69f5e870014be7417d08fd0368d8aa6b9cba10e)

4. [html原生元素渲染](https://github.com/zzz945/write-vue3-from-scratch/commit/89df7464fec10653b2e12e4cb42756d71312a5dd)

5. [支持method](https://github.com/zzz945/write-vue3-from-scratch/commit/6540bcfb03ad6d64cd28e5be069e553976f00939)

6. [支持lifecycle](https://github.com/zzz945/write-vue3-from-scratch/commit/93ba39e19e2ad2401fe07d4702d95bed6db31a90)

7. [事件监听](https://github.com/zzz945/write-vue3-from-scratch/commit/2f9297b1c389095ebc58f4742fa770abc33186c5)

5. Component vnode render (TODO)

6. Handle dom event (TODO)

7. Computed (TODO)

8. Watch (TODO)

9. Component event and action (TODO)

10. Watcher scheduler (TODO)

11. Patch (TODO)

