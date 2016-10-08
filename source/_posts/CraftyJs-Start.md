title: CraftyJs初探
date: 2016-07-08 22:00:00
description: 
categories:
- 编程
tags:
- 前端
- 游戏引擎
- CraftyJs
toc: true
author: Corner
comments:
original:
permalink: 
photos:
---
　　前不久听了一趟分享课，分享课的主题是JS游戏的制作，但是如果是自己写游戏比较的繁琐，如果能应用一个游戏引擎，就能大大的简化游戏的开发速度和开发效率，于是我在网上参考了几个游戏引擎，找到了CraftyJs这个游戏引擎还是挺不错的，但是苦于网上的教程不是很全面，所以今天就开个坑，写个入门级的教程，仅供参考。
<!-- more -->

# 1. 初始化
首先从[官网](http://craftyjs.com/)上下载CraftyJs的脚本引用到项目中来。然后就可以开始写我们自己的程序了。
```
CraftyJs.init(this.config.width,this.config.height);
```
这段代码用于初始化整个stage，用官方的话来说就是舞台，所有的元素将在这整个舞台里活动。这个舞台的宽度是this.config.width(px)，高度是this.config.height(px)。如果有元素超出了舞台的范围，这个元素将被遮住，因为整个舞台设置了样式overflow:hidden将超出的元素隐藏掉。
```
Crafty.background("#f0f0f0");
```
你还可以通过background()方法给整个舞台设置背景颜色

# 2. 放置场景
当整个舞台初始化后就可以玩游戏了吧？不！你去剧院看戏一入座演员就给你演戏么，当然不是，还需要一些场景的带入和切换。这些场景比如加载动画、菜单选项等一系列。
```
Crafty.defineScene("loading", function() {
	Crafty.background("#000");
	Crafty.e("2D, DOM, Text").attr({
		w: 100,
		h: 20,
		x: 150,
		y: 120
	}).text("Loading").css({
		"text-align": "center"
	}).textColor("#FFFFFF");
});
```
我们可以使用Crafty.defineScene()方法来定义一个场景。在这里我们定义了一个叫loading的场景，里面只有一个元素就是一行"Loading"的字。但是定义好了场景并没有显示在舞台上，因为这个场景并没有被调用到。
```
Crafty.enterScene("loading");
```
通过enterScene()这个方法来展示刚才我们定义好场景，你会在舞台上看到这个场景。这个展示舞台的方法可以在任何地方被调用。但是需要注意的是这个方法会清除舞台上所有的元素，除了那些有"Persist"组件的元素（组件这一名词下面会解释到）。

# 3. 实体/组件系统
现在到了CraftyJS最重要的部分来了，就是CraftyJS独特的实体/组件系统。这个系统有点面向对象编程的意思。整个系统分为两个部分。
### 组件系统
所谓的组件，有点类似JAVA中的对象（不是现实里的对象），看不见摸不着，是对实体的抽象。每个组件里封装了对应的方法，可以在实体中直接调用。CraftyJS中有很多已经被预先定义好的组件可以直接拿来使用，而且组件可以被重复地继承。
### 实体系统
实体是真正看得见的元素，是对组件的“实例化”。一个单一的实体能够继承多个实体。
```
var square = Crafty.e('2D, DOM, Color');
```
这样就通过e()方法定义了几个叫"square"的实体。这个实体继承了三个组件"2D"、"DOM"和"Color"，这三个组件预先在CraftyJS中就已经被定义好了。如果你觉得单单使用这三个组件还不够，你可以后续往"square"这个实体中再添加组件。
```
square.addComponent("Text");
```
通过addComponent()方法向实体中加入"Text"组件，这个方法支持一次添加多个组件。
```
square.addComponent("Text,Mouse");//这是可以的
```
你还可以通过has()方法判断某个实体中是否含有某个组件
```
square.has("Mouse");
```
这个方法返回一个boolean类型的值。但是需要注意的是这个方法一次性只能判断一个组件存在，并不支持同时判定多个组件比如：
```
square.has("2D,DOM");//这是错误的
```
如果你对某个组件不满意，你还可以把它删掉，这个方法也不支持传入两个以上的组件名称
```
square.removeComponent("2D");
```
# 4. 常用的组件、属性和方法
一些常用的组件是CratyJs帮我们定义好了，我们直接使用就可以了。
### "2D"组件
2D组件是CraftyJS预先给我们定义好的一个组件，是最常用的组件之一。他提供了一个attr()的方法让我们来设置实体的属性值。
```
square.attr({
  x: 150,
  y: 150,
  w: 100,
  h: 100,
  alpha: 0.5,
  rotation: 45,
  visible:true
  });
```
这里的x和y是实体相对于舞台左上角的位置，单位都为像素(px)。w和h是实体的宽度和高度，单位也是像素(px)。alpha是实体的透明度，取值范围是0到1。visible代表实体是否可见，只能接受boolean类型的参数。x、y、w、h如果不设置值，默认为0。
### "Text"组件
Text组件有四个方法可以使用，分别是text()、textColor()、textFont()和unselectable()。text()方法用于设置组件里面的内容。
```
Crafty.e("2D,DOM,Text").text("hello world!");
```
text()方法支持传入一个方法，但是这个方法必须要返回一个字符串类型的参数，否则这个组件的内容将会显示undefined(未定义)。
```
Crafty.e("2D, Canvas, Text").text(function () { 
	return "hello world!";
});
```
textColor()方法用来设置组件文字的颜色，你可以使用HEX、rgb或者rgba的方式来定义颜色。
```
Crafty.e("2D, DOM, Text").textColor('#FF0000')
		.textColor('rgba(0, 255, 0, 0.5)')
		.textColor('white');
```
textFont()方法用来设置文字的字体。如果有多个字体的属性，传入一个对象的方式进行设置，Crafty支持设置的属性有以下几个：
```
Crafty.e("2D, DOM, Text").textFont({ 'type': 'italic', 'family': 'Arial' , 'size':'20px', 'weight':'bold', 'lineHeight':'30px'});
```
unselectable()方法设置Text组件中的内容不能被高亮选中。Canvas的Text是不能被高亮选中的，所以这个方法只对DOM的Text组件有效。
```
Crafty.e("2D, DOM, Text").text('This text cannot be highlighted!').unselectable();
```