# Goal

Write a simplest vue from scratch using latest techniques without so much backward compatible noise. You'll have a clean understanding of vue after following my process.

## TDD Environment Setup

1. create repository

```sh
$ mkdir create-vue3-from-scratch
$ cd create-vue3-from-scratch
$ git init
```

2. add .gitngnore

> https://github.com/zzz945/write-vue3-from-scratch/commit/152224ee3fb730dad13b0cdfde37a7eee01abd7c#diff-a084b794bc0759e7a6b77810e01874f2

3. init package.json

```sh
$ npm init
```

4. install babel-loader

> https://github.com/babel/babel-loader#install

```sh
$ npm install -D babel-loader @babel/core @babel/preset-env webpack
```

6. install karma

> https://karma-runner.github.io/3.0/intro/installation.html

```sh
# Install Karma:
$ npm install karma --save-dev

# Install plugins that your project needs:
$ npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev

$ npm install -g karma-cli
```
 
7. install and config karma-webpack for test scripts to support es6

> https://github.com/webpack-contrib/karma-webpack
> https://github.com/zzz945/write-vue3-from-scratch/commit/9bf43f9b3ddc8f15a6b1d0e3ab77b725b339cb70#diff-a2a3b7b0c9c3b4b93b4aebf4e3ec3cfb

```sh
$ npm i -D karma-webpack
```

8.  Test Es6 in test case

> https://github.com/zzz945/write-vue3-from-scratch/commit/9bf43f9b3ddc8f15a6b1d0e3ab77b725b339cb70#diff-4cec89e9e60decc25f7c64c8c8568760

```sh
$ karma start
```

## Implement Vue3

1. Data proxy (TODO)

2. Dependence collection and notification (TODO)

3. Raw vnode render (TODO)

4. Component vnode render (TODO)

5. Handle dom event (TODO)

6. Computed (TODO)

7. Watch (TODO)

8. Component event and action (TODO)

9. Watcher scheduler (TODO)

10. Patch (TODO)
