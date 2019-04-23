## 名词解释

1. 浏览器标准：本文中作为es6、css3、h5的统称

## 我们为什么要学习vue的实现

我们用vue，是因为它是当前业界最佳的解决方案之一，但前端技术方案迭代及工业标准化发展的浪潮，大概率不会在vue这里到达终点。

jquery没有死，它的基因已经注入浏览器标准。而webcomponent shadow dom的灵感，同样有受到vue和react的vdom技术的启发。当然vue也在进化，但要知道，vue的竞争对手，并不是react，而是浏览器的标准化进程。当webcomponent成为主流，我们现在津津乐道的vdom技术也就完成了过渡的使命。

所以我们要有危机感和好奇心，不能过渡依赖vue。我们需要搞清楚在Vue的黑盒中，都做了什么magic。同时，我们也能学习到很多现代软件工程的方法和设计模式，比如tdd、代理模式、观察者模式、封装和解耦的艺术。

## Vue源码为什么难读

1. 功能繁多

我们读vue源码的目的，首先是想了解全貌及部分核心feature的实现，比如双向绑定、vnode渲染等。而Vue源码中包含了太多非核心代码，比如keep alive、dynamic component、functional component等，这些并不是不重要，仅仅是我们暂时对它的实现并不太感兴趣，这些代码的干扰会阻碍我们对核心部分的理解。

2. 向后兼容

Vue源码中包含大量向后兼容代码，但随着浏览器标准从主流框架中吸取精华，以及主流浏览器向浏览器标准的靠拢，vue作为框架所承担的责任会越来越小，举个最简单的例子，用ES6的Proxy实现双向绑定，就比Vue2.x中defineProperty的hack做法要简洁很多。而当webcomponent火候成熟，vue甚至连vdom都不用做了。所以vue3的实现一定会比vue2简单，这已经是官方确定的。我判断vue4的实现一定会更精简，而这个趋势一直持续到vue退出历史舞台。

## 为什么要从0写一个vue

既然我们要学习vue的实现，而vue的源码又包含太多的噪音，难以梳理。纵观全网，虽然源码分析的文章和教程层出不穷，但思路大多依然埋没在vue代码的复杂细节中。那么，我们为何不干掉不感兴趣的功能，不care浏览器兼容性，只用最新的技术，拨开迷雾去写一个最简化的Vue呢？

此项目将按[Vue3.0公开的思路](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf)，用测试驱动开发的方法，一步一步写一个最简化的Vue，我会尽量确保每一个commit都容易理解。建议跟随下面步骤做，你将会对Vue有个清晰的理解。

## 测试驱动开发～why?

软件工程上，按我的理解，完全自上而下的设计(瀑布模型)，已经是过时的方法。即使超大型计算机项目，比如操作系统级别的工程，也是宏观自上而下，微观上下结合(敏捷开发)。而TDD是一种上下结合的编程实践，对于每个模块，首先设计测试用例，再写代码实现出来。有以下好处：

1. 控制质量，便于回归测试，提高开发效率
2. test case即文档
3. 粗略的顶层设计后（包括产品设计和技术设计），即可自下而上开始编程，避免过渡设计

## 步骤

由于tdd具有强大的test case即文档的基因，所以要理解每一步做了什么事情，只需要看对应的test case代码即可。

下面每步将按diff的形式给出，必要的地方会加comment。大段整体的阐述会写在diff页面的底部评论区，针对某段代码的comment会穿插其中。欢迎留言和提issue。

### 阶段1: Basic

这部分，我们从0做起，实现一些基础feature，不求做到完善

1. [TDD环境搭建](https://github.com/zzz945/write-vue3-from-scratch/blob/master/01.TDD%20Environment%20Setup.md)

2. [Data代理](https://github.com/zzz945/write-vue3-from-scratch/commit/3d4b919252a98a9f6898329016a17aa1d6d2da70)

3. [实现$watch](https://github.com/zzz945/write-vue3-from-scratch/commit/e69f5e870014be7417d08fd0368d8aa6b9cba10e)

4. [html原生元素渲染](https://github.com/zzz945/write-vue3-from-scratch/commit/89df7464fec10653b2e12e4cb42756d71312a5dd)

5. [支持method](https://github.com/zzz945/write-vue3-from-scratch/commit/6540bcfb03ad6d64cd28e5be069e553976f00939)

6. [支持lifecycle](https://github.com/zzz945/write-vue3-from-scratch/commit/93ba39e19e2ad2401fe07d4702d95bed6db31a90)

7. [html原生元素事件监听](https://github.com/zzz945/write-vue3-from-scratch/commit/2f9297b1c389095ebc58f4742fa770abc33186c5)

8. [实现mvvm](https://github.com/zzz945/write-vue3-from-scratch/commit/664aef66528ce3c464cea4abea90ec223654b6af)

9. [阶段1成果：Basic Demo](https://github.com/zzz945/write-vue3-from-scratch/commit/1b12d416a8e9d0e59f1be5b421c378b06bc1f490)

运行npm run test后点击弹出浏览器页面中的DEBUG按钮即可看到效果 

### 阶段2: 完善mvvm

这部分我们完善mvvm到实现vue2.x的所有feature，并实现vue3.0公开的一个重要feature, 官方说法是"Detection of property addition / deletion"，在vue2.x中，我们需要用$set。

1. [[mvvm]data支持深层object](https://github.com/zzz945/write-vue3-from-scratch/commit/1d6d3f0676de5cd42ded7b0a650200e6c1a0441e)

2. [[mvvm]data中object支持新增属性](https://github.com/zzz945/write-vue3-from-scratch/commit/61eb32a033418f7c9a0fc7d06c9ec097084fec0c)

3. [[mvvm]data中object支持删除属性](https://github.com/zzz945/write-vue3-from-scratch/commit/e33f9a6e568a304d9b9a8030051e9b5114de8881)

4. [[mvvm]支持array](https://github.com/zzz945/write-vue3-from-scratch/commit/d55b3947626ac63ac2a1b7b74379594ad3273d09)

5. [阶段2成果：mvvm in depth demo](https://github.com/zzz945/write-vue3-from-scratch/commit/158b38d5fd786094d4225f243dc90a9f8009a5e4)

运行npm run test后点击弹出浏览器页面中的DEBUG按钮即可看到效果

6. [简单重构和补充注释](https://github.com/zzz945/write-vue3-from-scratch/commit/84fbcca866edeabe5c7c884e0a65893e8bbd744c)

整理心情，再出发

### 阶段3

1. Component vnode render (TODO)

2. Handle dom event (TODO)

3. Computed (TODO)

4. Watch (TODO)

5. Component event and action (TODO)

6. Watcher scheduler (TODO)

7. Patch (TODO)

## 补充

### virtual dom vs shadow dom

上面对于virtual dom和shadow dom有些混淆，为了不误导大家，这里推荐两篇文章

1. https://develoger.com/shadow-dom-virtual-dom-889bf78ce701

2. https://svelte.dev/blog/virtual-dom-is-pure-overhead

所以，未来vue的发展有两种可能：

1. 可能还会做virtual dom，但virtual dom实际渲染出来会是一个web component，现在vue的scoped css，也将被shadow dom取代。

2. 但还有一种可能。virtual dom存在的意义是由于考虑到操作dom开销大，所以要merge对dom操作。但操作shadow dom会快很多，所有我对未来virtual dom是否还有必要保持怀疑。

