title: 微信小程序上手开发和使用总结（下）
date: 2016-10-11 16:53:26
description:
categories:
- 编程
tags:
- 前端
- WeChat
toc:
author: Corner
comments:
original:
permalink:
photos:
---
　　在[微信小程序上手开发和使用总结（上）](//xieyufei.com/2016/10/09/Front-Tiny-WeChat.html)中介绍了微信小程序的基本用法、数据处理和页面渲染等，这篇文章整理一下微信小程序的事件绑定及模板的用法。
<!-- more -->

# 模板
　　WXML提供模板组件给我们使用，可以在模板定义公用的代码片段，然后在需要引用的地方进行调用。

## 定义模板
　　定义模板使用name属性作为模板的名字，然后在template标签中定义代码片段：

```html
<template name="mytemplate1">
  <view>
    <text>firstName:{{firstName}}</text>
    <text>lastName: {{lastName}}</text>
  </view>
</template>
<template name="mytemplate2">
  <view wx:for="{{persons}}">
  	<text>firstName:{{item.firstName}}</text>
    <text>lastName: {{item.lastName}}</text>
  </view>
</template>
```

## 使用模板
　　使用模板我们用is属性引用定义好的模板，然后把模板所需要的值通过data属性传给模板。比如需要遍历persons数组，我们可以将整个persons作为对象传给模板，也可以遍历persons后将每个对象传给模板，具体取决于所应用的场景。

```html
<view wx:for="{{persons}}">
  <template is="mytemplate1" data="{{...item}}"></template>
</view>
<template is="mytemplate2" data="{{persons}}"></template>
```

　　需要的数据结构如下
```javascript
Page({
	data:{
		persons:[
			{firstName: 'Hulk', lastName: 'Hu'},
	    	{firstName: 'Shang', lastName: 'You'},
	    	{firstName: 'Gideon', lastName: 'Lin'}
		]
	}
})
```

**注意：**

* is属性也可以使用Mustache语法进行动态渲染，决定使用哪个模板
* data如果传的是对象类型的数据，需要用“...”进行“解构”，在模板中可以直接调用对象的属性；如果是其他数据类型则不需要用“...”

# 事件




















