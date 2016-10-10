title: 微信小程序上手开发和使用总结
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
photos: 
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
　　和jQuery等其他js框架不同的，小程序不能直接操作DOM元素，只能通过改变数据来控制页面元素的状态，这样有点类似React的思想。所以我觉得小程序的思想就是面向数据，而不是面向元素。

## 数据绑定
　　上一节我们说过注册页面时需要传入一个object参数，这个参数可以挂载很多页面的生命周期函数，同时，也能将页面的数据挂载进去。页面的数据可以直接挂载到object参数的data对象中去。

```javascript
Page({
	data:{
		name:'xyf'
	},
	onLoad:function(){
	}
})
```

## 数据获取
　　this.data.name

## 数据改变
　　this.setData()

# 页面渲染

