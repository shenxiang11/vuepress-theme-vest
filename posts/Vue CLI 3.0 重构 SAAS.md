---
title: Vue CLI 3.0 重构 SAAS
category: code
tags:
- 前端
- Vue.js
---

SAAS 原先代码质量差，没有代码规范，加上不断的新需求，迭代会变得愈加困难，所以后面一段时间会进行 SAAS 代码重构工作（设计师对界面也进行了优化）。

<!-- more -->

## 项目基本目录结构

- coverage 单元测试覆盖率报告，执行测试后自动生成
- dist 
- node_modules
- public 存放一些不需要 webpack 处理的资源
  - index.html
  - static 文件夹
  - favicon.ico
- src 前端项目源码
  - api
    - auth.js
    - common.js 通用api调用，写在这里意味着不同模块间可能都会用到
  - assets 
  - components 通用组件，写在这里意味着不同模块间可能都会用到，最好是 100% 的测试覆盖率
  - lib 通用的函数
  - modules
    - auth
      - pages 页面 .vue 文件
      - components 如果有的话
      - router router 配置
      - main.js 模块入口文件
  - store vuex 配置
  - app.vue
- tests 单元测试（暂定）
- .browserslistrc
- ```.editorconfig``` 编辑器配置
- ```.eslintrc.js``` ESLint 配置
- .gitignore
- babel.config.js
- ```jest.config.js``` jest单元测试配置
- package.json
- postcss.config.js
- ```vue.config.js``` 相当于 webpack 配置

## 拆分模块（基本按导航来拆分）

使用 Vue CLI 3.0 天然支持的方式，只需修改 vue.config.js，无需添加其余任何 Webpack 配置。

```javascript{4,5,6,7,8}
// vue.config.js
module.exports = {
  pages: {
    auth: { // 授权模块
      entry: 'src/modules/auth/main.js',
      template: 'public/index.html',
      filename: 'auth.html',
    },
    gym: {
      entry: 'src/modules/gym/main.js',
      template: 'public/index.html',
      filename: 'gym.html',
    },
    ordercenter: {
      entry: 'src/modules/ordercenter/main.js',
      template: 'public/index.html',
      filename: 'ordercenter.html',
    },
    marketing: {
      entry: 'src/modules/marketing/main.js',
      template: 'public/index.html',
      filename: 'marketing.html',
    },
  },
  devServer: {
    proxy: {
      '/saas': {
        target: 'https://devminiapp.commafit.club',
        changeOrigin: true,
        secure: false,
        headers: {
          Referer: 'https://devminiapp.commafit.club/saas',
        },
      },
    },
  },
};
```

生产的目录结构：

![dist目录结构](https://raw.githubusercontent.com/shenxiang11/picgo/master/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-06-24%20%E4%B8%8B%E5%8D%889.01.07.png)

只是有了多个 .html 文件，代表着各自模块，文件里是对各自模块资源的引用。

![](https://raw.githubusercontent.com/shenxiang11/picgo/master/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-06-24%20%E4%B8%8B%E5%8D%8810.18.37.png)

同模块之间是 Vue Router 单页面跳转；不同模块之间是 location 跳转，就是应为生成了多个 html 文件，不同模块需要的资源被其引用，需要跳转到对应的 html 下。

## 代码风格规范

### 代码注释

差的注释（和没有一样）：

![](https://raw.githubusercontent.com/shenxiang11/picgo/master/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-06-24%20%E4%B8%8B%E5%8D%8810.39.53.png)


```javascript
/*
 * @Author: tadpole 
 * @Date: 2019-01-08 16:26:30 
 * @Last Modified by: tadpole
 * @Last Modified time: 2019-01-08 17:36:18
 */

let date,
  allTime,
  week_day,
  week_num

/**
 * 时间戳转换为日期 周几
 * @param {*} time 时间戳
 */
function timeModule(time) {
  // ...
}
```

### ESLint —— airbnb + plugin:vue/essential(?)

原则上，不允许使用开发者个人使用任何方式禁用规范；可以团队讨论，移除一些不合理过于严格的规则。

### 编辑器规则

缩紧四格？使用 Tab 缩进？

```
[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 100
```

### 遵守 Vue 官方风格指南

[https://cn.vuejs.org/v2/style-guide/](https://cn.vuejs.org/v2/style-guide/)

### 控制台报错、console 问题

不允许有纯前端的报错；console，不管是不是使用 console 调试，打包后的代码都应该删除。

### 代码审查？

涉及到协作，指定人员审查。

## 添加单元测试

分享会详细讲，通过下面的链接先做了解：

[https://vue-test-utils.vuejs.org/zh/guides/](https://vue-test-utils.vuejs.org/zh/guides/)

若果分享会上讲的不明白，后续根据实际重构的例子，可以前端团队内再讲下。

## 合理利用 Vuex、Vue Router

- 原来项目中没有利用好 Vuex
- 页面的参数也没有体现的路由上，刷新页面后数据会丢失

vuex 多页面状态会丢失，利用 vuex-persistedstate 做本地持久化

## 利用 babel 优化代码

- 异步代码可以使用 async/await
- 可选型
- ...

## 最后

这个方案可能存在不合理的地方，最终协作者之间可以多多交流沟通。
