title: Explain-Js-This
date: 2016-09-18 12:02:50
description:
categories:
- 编程
tags:
- JS
- 前端
toc:
author: Corner
comments:
original:
permalink:
photos:
---
  在js中this的用法
<!-- more -->

# 1.全局作用域中的this

在全局作用域中，this指向了Window对象。

```
this.name='xyf';
console.log(this);
```
在上面我们把name挂载到了全局作用域Window下面，其实我们在用var声明变量的时候也是把变量挂载到Window下面。所以上面的操作等价于下面的操作
```
var name='xyf';
console.log(this);
```

# 2.函数中的this
在js中函数分为普通的函数和构造函数，主要的区别就是函数的调用形式。普通函数能够直接调用，而构造函数是不能调用，需要用new实例化。
### 普通函数中的this
普通函数的中this指向了Window对象
```
function show(name){
	this.name=name;
}
show('xyf');
```
这时候函数show作为一个普通函数调用，虽然看起来像构造函数，但是内部的this却指向了Window对象，如果你在控制台打印Window对象，它下面挂载了name属性

### 构造函数中的this
构造函数中的this则指向了它所实例化的对象
```
function show(name){
	this.name=name;
}
var myshow=new show('xyf');
console.log(myshow.name);  //'xyf'
```
在这里如果你直接调用show('xyf')跟普通函数没有区别，通过new实例化一个myshow对象，这时候this就指向了这个实例化出来的对象


# 3.对象中的this

对象中的this指向了当前对象

```
var person={
	name='origin',
	setName:function(name){
		this.name=name
	},
	getName:function(){
		return this.name;
	}
}
person.setName('xyf');
console.log(person.getName()); //'xyf'
```

但是如果对象的函数中嵌套了其他函数，this的指向就被改变了。

### 嵌套自执行函数
```
var person={
	name='origin',
	setName:function(name){
		(function(name){
			this.name=name;
		})(name);
	},
	getName:function(){
		return this.name;
	}
}
person.setName('xyf');
console.log(person.getName()); //'origin'
```
这时候自执行函数中的this指向了全局对象Window，所以setName()函数并不能产生作用。


### 嵌套回调函数
```
var person={
	name='origin',
	setName:function(name){
		$('.temp').on('click',function(e){
			this.name=name;
		});
	},
	getName:function(){
		return this.name;
	}
}
person.setName('xyf');
console.log(person.getName()); //'origin'
```

这里的this指向了$('.temp')这个对象。为了避免这些情况，我们先将this赋值给局部变量that，然后使用that。这时候that就指向了我们需要的对象。
```
var that=this;
(function(name){
	that.name=name;
})(name);
```

### 特别声明
如果将一个对象中的函数赋值给一个变量，再通过该变量调用这个函数，此时函数中的this指向Window对象，即使这个操作在回调函数中。
```
var person={
	name:"person",
	setName:function(name){
		this.name=name
	},
	getName:function(){
		return this.name;
	}
}
var temp={
	name:"temp",
	tempFun:function(){
		$('.temp').on('click',function(){
			var fun=person.getName;
			fun(); //''
		})
	}
}
temp.tempFun();
```

# 4.使用apply和call函数改变this指向
这两个函数都能够手动指定被调用函数内部this指向哪个对象。

```
function person(name){
	this.name="";
	this.setName=function(name){
		this.name=name;
	}
}

var p1=new person('p1');
var p2=new person('p2');
p1.setName('p1');
p2.setName('p2');

//p1.setName.apply(p2,['c']);
p1.setName.call(p2,'c');
console.log(p2.name); //'c'
```
当对象p1使用apply函数后，p1对象中的this就指向了对象p2，此时对象p1的setName函数的操作就作用在了p2对象上。






