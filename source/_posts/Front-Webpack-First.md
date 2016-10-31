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

# 一、什么是webpack
　　随着网页内容的越来越丰富，在我们的网页上我们经常要用到很多的脚本文件，比如幻灯模块的脚本、列表模块的脚本和搜索模块的脚本等等。如果不对这些文件进行统一的打包，整个页面就会非常的凌乱。
　　于是，webpack就诞生了，我们可以把它想象成一台洗衣机+烘干机+叠衣机(据说岛国已经发明类似的机器人了)，我们可以把杂七杂八的衣服、裤子、袜子等等都丢进去，然后它就会帮我们洗干净、烘干、叠整齐了，一系列工作全自动完成，不需要我们亲自动手，怎么样，是不是很心动。

![stage](/images/Front-Webpack-First/what-is-webpack.png)

　　借用webpack官网的一张图来解释一下webpack的工作原理。左边就是我们杂乱的页面资源，有脚本文件、样式文件、图片文件等等，各种文件之间互相引用。经过webpack的打包整理，生成静态文件。
　　webpack的工作方式是：通过一个配置文件找到入口文件，从这个入口文件找到你项目依赖的所有资源文件，使用对应的资源加载器(loaders)来处理这些资源文件，最后打包成静态文件。

<a class="prevent_reptile" href="//www.xieyufei.com" style="font-size:24px">谢小飞博客专用防爬虫链接，想要看最新的前端博客请点这里</a>

# 二、安装webpack
　　使用webpack之前需要安装webpack，在这里我们需要在两个地方安装：全局目录和项目目录，在项目目录下执行以下命令：

```javascript
//全局安装的作用是直接在命令行中使用
npm install -g webpack
//安装到项目目录，使用webpack的功能
npm install --save-dev webpack
```

# 三、使用webpack
　　在开始上手项目之前首先来搭建我们的目录结构。

<a class="prevent_reptile" href="//www.xieyufei.com" style="font-size:24px">谢小飞博客专用防爬虫链接，想要看最新的前端博客请点这里</a>

## 目录结构说明
　　我们可以把项目目录搭建成如下，当然只是给大家做一个参考而已：

```html
-- package.json
-- webpack.config.js
-- public/
   -- images/
   -- javascript/
   -- stylesheet/
-- view/
-- build/
```

　　package.json使用``npm init``命令可以自动生成，在这里不过多的阐述；build目录主要是webpack构建的产物，自动生成；这里的核心文件就是我们的webpack.config.js文件，需要自己手动编写。

## webpack配置文件
　　``webpack.config.js``配置文件通过exports导出一个对象，这个对象中有三个模块比较重要：entry、output和module，具体如下：

```javascript
var webpack = require('webpack');
var path = require('path')
module.exports = {
    entry: {
        index: './public/javascript/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        publicPath: './build/'
    },
    module: {
        loaders: []
    },
    plugins:{}
}
```

<a class="prevent_reptile" href="//www.xieyufei.com" style="font-size:24px">谢小飞博客专用防爬虫链接，想要看最新的前端博客请点这里</a>

### entry属性
　　entry属性是页面的主入口，所有页面的文件都在这个入口文件中进行引用。
　　当然，一个项目肯定有不止一个页面，需要多个入口，entry属性可以这样配置：
```javascript
entry: {
    index: './public/javascript/index.js',
    list: './public/javascript/list.js',
	//...多个页面的入口
},
```

### output属性
　　在webpack打包之后，生成的js文件、css文件、图片文件等等就会放到output属性所指定的文件目录下。
　　path属性就是所在文件夹的路径，需要使用绝对路径，这里用path的resolve方法进行解析；filename属性指定了输出的文件名，[name]表示入口的属性名叫什么就输出对应的文件，比如这里的index输入的文件名就是index.bundle.js。
　　publicPath是以http方式请求的静态资源的路径，webpack-dev-server(webpack的一个插件)会根据你请求的url来匹配这个publicPath下的文件。

### module属性
　　module属性主要存放解析资源文件的各个加载器，每一个对象表示了一个加载器。
　　test属性表示正则匹配，用来匹配文件的后缀名；loader属性表示如果文件相匹配，则调用对应的加载器来解析文件。比如样式加载器有css-loader、sass-loader。
　　加载器的后缀都是``-loader``，在loader属性中配置加载器不用写后缀，配置不同的加载器需要使用``!``分隔并串联起来。

<a class="prevent_reptile" href="//www.xieyufei.com" style="font-size:24px">谢小飞博客专用防爬虫链接，想要看最新的前端博客请点这里</a>

### plugins属性
　　plugins属性是用来放webpack的插件，这个属性下面会用到

## 编写入口文件
　　在/public/javascript/目录下，编写我们的入口文件index.js，我们的入口文件非常简单，就在页面上打印一句话：
```javascript
/public/javascript/index.js
document.write('webpack works')
document.write(require('./module.js'))
```
　　还有我们的模块文件：
```javascript
/public/javascript/module.js
module.exports='It works from module.js.'
```
　　这样一个简单的webpack项目就完成了，通过在项目根目录使用webpack命令，在build文件中生成index.bundle.js文件就是我们的构建产物，在页面上直接引用这个js就能看到效果了

## 给页面点“颜色”看看
　　在页面上我们肯定会用到很多的样式文件，那么怎么在页面上使用呢？首先需要有对应的加载器，这里我们就要用到样式加载器。
　　首先安装我们的加载器：
```javascript
npm install css-loader style-loader sass-loader --save-dev
```

　　然后改写配置文件中的加载器模块：

```javascript
module: {
    loaders: [
		{ test: /\.css$/, loader: 'style!css' },
		{test: /\.scss$/, loader: "style!css!sass"}
    ]
}
```
　　css-loader会遍历css文件，找到所有的url(...)并且处理。style-loader会把所有的样式插入到你页面的一个style标签中。
　　接下来就可以编写我们的样式文件了：
```stylesheet
/stylesheet/style.css
body{background:#f5f5f5}
```
　　在index.js中我们添加对样式文件的引用：
```javascript
require('../stylesheet/style.css');
```
　　在根目录我们再次执行webpack命令，再次生成构建的js文件就能看到页面上有颜色了。

<a class="prevent_reptile" href="//www.xieyufei.com" style="font-size:24px">谢小飞博客专用防爬虫链接，想要看最新的前端博客请点这里</a>

## 提取公共的脚本并压缩
　　有时候多个公共脚本中有公用的部分，如果多写就显得有点多余，我们可以利用webpack的提取公共部分的插件来帮助我们提取。
　　在plugins属性中添加如下代码：
```javascript
plugins: [
    //压缩代码
    new webpack.optimize.UglifyJsPlugin(),
    //提取公共部分
    new webpack.optimize.CommonsChunkPlugin('common.js')
]
```
　　再次执行webpack命令，我们在build文件夹里看到多出了一个common.js文件，这个就是提取出的公共部分。

## 独立出样式文件
　　通过``style``标签引入样式可能会让页面的代码看起来非常的庞大非常的凌乱，有时候我们需要将所有的样式导出到一个独立的样式文件，然后通过``link``标签引入样式文件。
　　这时候我们就需要用新的插件。通过``npm install``命令安装extract-text-webpack-plugin插件。

```javascript
npm install extract-text-webpack-plugin --save-dev
```
　　安装完插件我们就需要在``webpack.config.js``文件中进行配置了。

```javascript
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    // ...省略部分代码
    module: {
        loaders: [
            // ...省略部分代码
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtractTextPlugin("[name].css")
    ]
}
```
　　我们再使用webpack命令打包一下，看到``build``文件夹中看到多了一个index.css文件，就是插件提取出来的所有页面样式，都在一个文件中。

## 使用高逼格的ES6
　　ES6简洁的语法糖、性能的提升都让开发者对其深深的“迷恋”，下面来让我们的项目也来支持ES6的语法。
　　要想支持ES6首先要安装对应的解码器，es6的解码器就是babel，首先安装``babel-loader``：

```javascript
npm install babel-loader --save-dev
```
　　然后改写配置文件：
```javascript
loaders: [
    // ...省略部分代码
    { test: /\.js[x]?$/, loader: 'babel' }
]
```
　　配置完成后我们就可以在js中尽情地使用es6的语法糖了。

# 四、总结
　　在这里我们编写了webpack的配置文件，对配置文件的属性进行了详细地说明，也添加了webpack的几个插件。但是还是欠缺以下几点：

* 没有图片加载器
* 没有构建本地服务器，没有热加载
* 没有引导命令执行

　　本文所涉及到的代码都在[我的github仓库](//github.com/acexyf/WebpackTest)，需要的读者可以去fork，喜欢的给个赞啊亲。希望在后续的文章中对代码进行优化，添加更多的插件来丰富功能。





