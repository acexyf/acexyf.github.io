title: 微信小程序上手开发和使用总结（上）
date: 2016-10-09 09:58:02
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
photos: /images/Front-Tiny-WeChat/interface.png
---
　　最近微信小程序一下子火了起来，我也学习了一下，写了几个简单的demo，分享一下自己的使用心得，希望对大家有帮助。
<!-- more -->
> 我们提供了一种新的开放能力，开发者可以快速的开发一个小程序。小程序可以在微信内被便捷地获取和传播，同时具有出色的使用体验。

# 搭建环境
　　要开始做项目，首先要安装微信小程序的开发工具。官网的版本比较旧，笔者分享一个下载链接，大家可以去下载，[微信小程序开发工具下载](http://pan.baidu.com/s/1o86hgue)，下载完直接安装后新建项目就可以使用了。当然，由于还处在内测阶段，腾讯只邀请了部分企业参与内侧，所以AppID数量很稀少，读者在添加项目的时候可以选择无AppID。添加项目后打开小程序的开发工具是这样的：
![微信小程序开发工具界面](/images/Front-Tiny-WeChat/interface.png)
调试按钮可以打开调试界面，如果读者用惯了Chrome浏览器，想必对这个界面肯定不会陌生；如果需要切换到其他的项目，可以直接点关闭按钮，而不用关闭整个工具。

# 项目结构
　　整个项目由两部分组成，一个是描述整体程序的app文件和多个框架页面文件组成。
## app文件
　　描述整体程序的app文件必须放在文件的跟目录，由三个文件组成，app.js、app.json和app.wxss。
* app.js:程序的整体逻辑
* app.json:程序的公共设置
* app.wxss:小程序的公共样式(非必须)

在app.json文件中可以对小程序进行全局配置，比如页面路由、窗口表现、网络超时、多个tab等；在app.js中我们使用App()注册小程序的，它接受一个object对象作为它的参数，这个参数指定了小程序的生命周期函数。object函数说明：

| 属性      | 描述         | 触发  |
|  -        |       -      |  -    |
| onLaunch  | 小程序初始化 | 初始化完成后 |
| onShow    | 小程序显示   | 小程序由后台进入前台 |
| onHide    | 小程序隐藏 | 小程序由前台进入后台 |

**注意：**

* App()函数只能定义一次，并且只能在app.js中定义。
* onLaunch()函数在整个小程序的生命周期只调用一次，其他两个函数调用多次。

## 框架页面文件
　　项目框架页面可以配置多个，建议页面的文件名称和文件名保持一致。比如有一个下单页book，其中的文件可以设置为book.js、book.wxml、book.wxss、book.json。
* xxx.js:页面逻辑
* xxx.wxml:页面结构
* xxx.wxss:页面样式(非必须)
* xxx.json:页面配置(非必须)

我们在框架页面也需要注册页面，注册页面通过Page()函数，这个函数也接受一个object函数，用来指定函数的生命周期函数和初始化的数据。

| 属性      | 类型         | 描述  |
|  -        |       -      |  -    |
| data      |   object     |  页面初始化数据   |
| onLoad    |  Function    |  页面加载时   |
| onReady   |  Function    |  页面初次渲染完成   |
| onShow   |  Function    |  页面显示时   |
| onHide   |  Function    |  页面隐藏时   |
| onUnload |  Function    |  页面卸载时   |
| onPullDownRefreash  |  Function    |  页面下拉时   |

**注意：**

* onLoad()函数在页面加载时只调用一次。可以获取上个页面传来的参数，默认保存在data参数中，可以通过data.param的方式获取。
* onUnload()页面卸载时调用，比如调用redirectTo或者navigateBack时。

# 数据处理
　　和jQuery等其他js框架不同的，小程序不能直接操作DOM元素，只能通过改变数据来控制页面元素的状态，这样有点类似React的思想。所以我觉得小程序的思想是面向数据，而不是面向元素。

## 数据绑定
　　上一节我们说过注册页面时需要传入一个object参数，这个参数可以挂载很多页面的生命周期函数，同时，也能将页面的数据挂载进去。页面的数据可以直接挂载到object参数的data对象中去。

```javascript
Page({
	data:{
		name:'xyf'
	},
	myname:'test'
	onLoad:function(){
	}
})
```

　　这里我们定义了两个数据，一个数据定义在data对象中，另一个数据直接定义Page的参数中。我们可以将data中的数据渲染到页面中，使用Mustache语法(双大括号)将要渲染的变量包起来，如下：

```html
<view>{{name}}</view>
```

如果需要在组件的属性内渲染数据，也需要用双大括号包起来：

```html
<view class="item-{{name}}"></view>
```

在双大括号中，我们可以进行简单的运算和判断，比如三元运算，算数运算，字符串运算等。

```html
<view class="{{name=='xyf'?'yes':'no'}}">{{name+' is a smart boy'}}</view>
```


## 数据获取和更改
　　对于data中的数据，我们必须通过this.data.name这种方式来获取，对于data外面的数据，我们可以通过this.myname的方式来获取。

```javascript
onLoad:function(){
	console.log(this.data.name); //'xyf'
	console.log(this.myname);    //'test'
}
```

　　对于data中的数据，要想改变它的值，必须要调用setData()方法来改变，而要改变data外的数据，可以直接给他进行赋值。

```javascript
onLoad:function(){
	this.setData({
		name:'Corner'
	});
	console.log(this.data.name); //'Corner'
	this.data.name='Nick';
	console.log(this.data.name); //'Corner'
	this.myname='mytest';
	console.log(this.myname);    //'myest'
}
```

**注意：**
* 在函数中注意this的作用域。在map函数或者异步回调函数中要使用this，要在函数外先把this赋值给that，然后用that进行操作。
* setData()对象参数的值不能为undefined。每次setData进行赋值时都要对要赋的值进行非空判断，确保不是undefined，否则会报错。

总结一下，两种方式定义的数据区别如下：

* 能否被渲染：页面只能动态渲染data中的数据，data外的数据不能被渲染到页面上，所以data中放一些需要页面动态渲染的数据
* 获取方式：data中的数据通过this.data.[param]方式获取，data外的数据通过this.[param]方式获取。
* 赋值方式：data中的数据只能通过setData()函数进行赋值，而data外的数据可以直接赋值。

# 页面渲染
　　对于data中的简单变量，我们可以通过双大括号的方式进行渲染，但是如果对于一些稍微复杂一点的数据结构(比如数组)，双大括号就不能满足我们的需求了。我们需要引入另外两种渲染方式，条件渲染和列表渲染。

## 条件渲染
　　我们使用wx:if="{{condition}}"的来判断是否需要渲染该模块，还可以添加wx:elif和wx:else渲染。

```html
<view wx:if="{{length > 5}}"> 大于 </view>
<view wx:elif="{{length > 2}}"> 中等 </view>
<view wx:else> 小于 </view>
```

　　也可以直接在大括号中使用布尔类型的值控制页面元素隐藏和显示。如果data中flag为false，那么类名为demo的这个view组件就不会渲染到页面上去。

```html
<view class="demo" wx:if="{{flag}}">
显示
</view>
```

## 列表渲染
　　有时候我们需要将一个数组渲染到页面上，比如几个用户信息，比如点评列表，这时候就需要用到列表循环。
　　列表循环使用wx:for来绑定一个数组，就可以将数组中的每个数据循环遍历到组件中。默认情况下每个元素的变量名为item，每个变量的索引值为index。

```html
<view wx:for="{{['a','b','c','d']}}">
	这是第{{index}}个元素，元素内容为{{item}}
</view>
```

　　在列表遍历时我们并没有定义item和index，小程序自动为我们添加了wx:for-index="index"和wx:for-item="item"。因此在嵌套列表渲染时，注意index和item所代表的值和对象。需要我们自己定义变量名和索引，避免混乱。


# 总结和期待
　　微信小程序还在内测阶段就引起了这么多关注，作为一个程序员，尤其是一名前端程序员，上手和熟悉微信小程序的开发无疑会让我们越来越“吃香”。网上也在热议微信小程序是否会颠覆或者代替原生App，我觉得两者还是有以下区别的：

* 产品形态：微信小程序更加接近于HTML5产品，开发上也使用JavaScript进行开发，性能比H5好，但是要比原生App性能低。而且微信小程序整体文件大小限制在1MB以内，估计只能运行一些小型的应用和游戏，一些大型的应用肯定还是要用App的。
* 用户习惯：很多用户已经用惯了App，要想改变用户的习惯还是挺难的。用户操作肯定是越简单越好。比如现在微博App打开就能用，但是如果有了微博小程序，需要进入微信才能打开，相信用户还是挺反感中间多余的“步骤”。


　　个人感觉微信小程序的开发也存在着不足之处，希望在以后的版本中能够改进：

* 开发工具不能实时运行结果：每次都需要编译才能看到结果，程序猿表示每次看效果都比较麻烦。
* 不支持ES6：现在ES6越来越流行，确实给开发带来了不少的简洁和便利。每次开发还要使用原生js，程序猿表示鸭梨山大啊。
* 组件太少，不支持自定义组件：能够使用的组件偏少，大部分情况下只能使用view和text，不能够满足复杂的业务场景。




