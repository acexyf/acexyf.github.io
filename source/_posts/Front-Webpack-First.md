title: 搭建自己的Webpack项目:入门（一）
date: 2016-10-21 12:15:07
description:
categories:
- 编程
tags:
- 前端
- Webpack
toc:
author: Corner
comments:
original:
permalink:
photos:
---
　　作为当下最流行的前端打包工具，webpack有自己无与伦比的优势和功能特性，使用webpack打包自己的项目能够大大地提高我们的开发效率。小编整理了一下webpack在项目中的最佳实战分享给大家。
<!-- more -->

# 什么是webpack
　　随着网页内容的越来越丰富，在我们的网页上我们经常要用到很多的脚本文件，比如幻灯模块的脚本、列表模块的脚本和搜索模块的脚本等等。如果不对这些文件进行统一的打包，整个页面就会非常的凌乱。
　　于是，webpack就诞生了，我们可以把它想象成一台洗衣机+烘干机+叠衣机(据说岛国已经发明类似的机器人了)，我们可以把杂七杂八的衣服、裤子、袜子等等都丢进去，然后它就会帮我们洗干净、烘干、叠整齐了，一系列工作全自动完成，不需要我们亲自动手，怎么样，是不是很心动。

![stage](/images/Front-Webpack-First/what-is-webpack.png)

　　借用webpack官网的一张图来解释一下webpack的工作原理。左边就是我们杂乱的页面资源，有脚本文件、样式文件、图片文件等等，各种文件之间互相引用。经过webpack的打包整理，生成静态文件。
　　webpack的工作方式是：通过一个配置文件找到入口文件，从这个入口文件找到你项目依赖的所有资源文件，使用对应的资源加载器(loaders)来处理这些资源文件，最后打包成一个脚本文件。

# 安装webpack
　　使用webpack之前需要安装webpack，在这里我们需要在两个地方安装：全局目录和项目目录，在项目目录下执行以下命令：

```javascript
//全局安装的作用是直接在命令行中使用
npm install -g webpack
//安装到项目目录，使用webpack的功能
npm install --save-dev webpack
```

# 使用webpack



