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

# 一、模板
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

# 二、事件
　　什么是事件呢，简单来说，事件就是逻辑层到逻辑层的通讯方式。就是在页面上通过触发某个操作（就是我们说的事件），在逻辑层进行一系列的操作，最终来改变数据。
　　比如在一个输入框中用户输入了一段文字，但是data中的数据并没有随之改变，因此我们需要在输入框上绑定对应的输入事件来更改数据。

## 事件分类
　　事件也有分类，可以分为冒泡事件和非冒泡事件。“冒泡”这个词很形象的表现了事件向上传递的过程，这两种事件的区别也在于是否会向父节点进行传递。
　　一些常用的冒泡事件，除以下的事件外都是非冒泡事件：

|     名称     |            触发              |
|       -      |             -                |
| touchstart   | 手指开始触摸                 |
| touchmove    | 手指触摸后移动               |
| touchend     | 手指触摸动作结束             |
| touchcancel  | 触摸被打断，比如来点，弹框等 |
|    tap       | 触摸后离开，有点像点击click  |
|   longtap    |    长按，超过350ms才离开     |

## 事件对象
　　当事件函数被调用时，从逻辑层有一个默认的事件对象传到函数中，不同的事件所包含的事件对象的属性有所区别，一些常用的事件对象的属性如下：

|     属性     |     类型    |    说明              |
|       -      |      -      |     -                |
|   type       |    String   |   事件类型           |
|   timeStamp  |    Int      |从页面加载到事件触发的时间戳|
|   target     |   Object    |触发事件的组件的一些属性值集合|
|currentTarget |   Object    | 当前组件的属性值集合  |
|   touches    |   Array     | 触摸点信息的数组      |
|   detail     |   Object    |  额外的信息         |

### target和currentTarget区别
　　当不存在嵌套时，target和currentTarget没有区别。但是当嵌套触发事件是，current和currentTarget的区别就体现出来了。

```html
<view class="A" bindtap="handle1">
  outer
    <view class="B" bindtap="handle2">
    inner
    </view>
  </view>
```

　　点击组件B，当触发handle2事件时，收到target和currentTarget对象是一样，都指向组件B；而当点击组件B触发handle1事件时，target对象指向了组件B，currentTarget对象则组件A。总结一下：

* target对象指向了所触发事件的对象
* currentTarget对象指向了绑定事件所在的对象

### 向detail中添加内容
　　在组件中定义数据，当触发事件时，这些数据通过事件对象传给逻辑层。书写规则：以“data-”开头，多个字符用“-”连接，不能含有大写，可以绑定多个data值。例如data-element-name，最终会在event.currentTarget.dataset中转为elementName属性，属性的值就是定义的数据。

# 三、异步数据
　　小程序还提供发送异步的方法request(object)，发起的是https请求。一个小程序，同时只有有5个网络请求链接。object的参数如下：

| 参数命 | 类型 | 说明 |
| - | - | - |
| url  | Sring  | 服务器接口地址 |
| data  | Object  | 请求的参数 |
| header  | Object | 设置请求头header，header不能设置Referer |
| method  | String  | 请求方式，默认GET |
| success  | Function  | 请求成功的回调方法 |
| fail  | Function  | 请求失败的回调方法 |
| complete  | Function  | 请求完成的回调方法(请求成功、失败都会调用) |

　　跟jQuery不同的是，小程序请求的数据不是直接在success方法的res中(res是一个对象，还包括请求成功的状态码等)，而是在res.data中。示例代码如下：

```javascript
wx.request({
  url: '/url',
  data: {
     x: '',
     y: ''
  },
  header: {
      'Content-Type': 'application/json'
  },
  success: function(res) {
    console.log(res.data) //接收到的数据
  }
})
```


