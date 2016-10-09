title: js中闭包的用法整理
date: 2016-09-20 21:48:47
description:
categories:
- 编程
tags:
- 前端
- js
toc:
author: Corner
comments:
original:
permalink:
photos:
---
　　闭包在js中比较常见，是js的一种特色，但同时也是js的一个难点。很多面试题都喜欢考核对js闭包的理解。这篇文章整理了js的一些常见的用法。
<!-- more -->

# 什么是js闭包
　　对于js闭包，官方的解释是这样的：

> 一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。

　　第一次读估计很难理解，什么绑定变量的环境表达式、表达式的一部分，都是些什么鬼。用通俗一点的话来说就是：

> 一个函数中有许多变量，这些变量变成了函数的一部分。闭包就是能够获取到函数内部变量的函数。

　　因此，闭包也称为闭包数据，闭包的本质也就是函数。
　　要理解闭包，首先要来理解两个概念：变量和作用域。在这里不多阐述，可以看笔者的另一篇文章[《深入理解js中的变量和作用域》](//xieyufei.com/2016/09/21/JS-Variate-Scope.html)。

# 闭包的产生
　　由于函数作用域的封闭性，函数外部并不能访问函数内部的变量。

```javascript
function func(){
  var n=999;
}
console.log(n); // n is not defined
```

　　但是有时候我们需要用到函数内部的变量，这时候闭包就派上用处了。我们将上面的代码改造一下，就能够获取到func函数内部的变量。

```javascript
function func(){
  var n=999;
  add=function(){
    n++;
  }
  function show(){
    return n;
  }
  return show;
}
var tempShow=func();
console.log(tempShow()); //999
add();
console.log(tempShow()); //1000
```

　　这里的tempShow函数其实就是一个闭包show函数。它是通过最外层的func函数运行后进行赋值的。tempShow函数运行后就获取到了func函数内部的变量n。
　　那为什么func函数运行之后变量n没有被垃圾回收机制回收掉呢？在[《深入理解js中的变量和作用域》](//xieyufei.com/2016/09/21/JS-Variate-Scope.html)中我们说过了，全局变量是保存在静态存储区的，由于静态存储区中的变量是不会被回收掉的。而在这里我们将函数show赋值给全局变量tempShow，而函数show是函数func的子函数，因此，函数func也保存在静态存储区了。所以我们可以在任何地方调用tempShow方法。
　　在这段代码中，很巧妙的定义了一个add函数，没有在add前使用var关键字，因此函数add是一个全局变量而不是局部变量，可以在函数的外部调用对变量n进行操作。函数add也是一个闭包函数。
　　理解了上面的代码，相信下面的代码也不难理解了。

```javascript
var name = "The Window";
var object = {
　　name : "My Object",
　　getNameFunc : function(){
　　　　return function(){
　　　　　　return this.name;
　　　　};
　　}
};
var temp=object.getNameFunc();
console.log(temp()); //The Window
```

　　在这里出现了一个新的变量this，读者们可以通过笔者的这篇文章[《Js中this的用法》](//xieyufei.com/2016/09/18/Explain-Js-This.html)大致的了解this。由于函数temp调用的环境不在object内部进行了调用，因此函数中的this指代了全局变量window。为了达到获取object内部name的效果，我们对上面的代码进行改造：

```javascript
var name = "The Window";
var object = {
　　name : "My Object",
　　getNameFunc : function(){
　　　　var that = this;
　　　　return function(){
　　　　　　return that.name;
　　　　};
　　}
};
var temp=object.getNameFunc();
console.log(temp()); //My Object
```

　　或者这样改造，使用bind方法，将temp函数的作用域绑定到object上。

```javascript
var name = "The Window";
var object = {
　　name : "My Object",
　　getNameFunc : function(){
　　　　var that = this;
　　　　return function(){
　　　　　　return that.name;
　　　　};
　　}
};
var temp=object.getNameFunc().bind(object);
console.log(temp()); //My Object
```

　　闭包不仅能够返回一个函数，还能够返回其他类型的数据，比如下面的代码返回了一个数组对象。

```javascript
function createFunctions(){
  var result = new Array();
  for (var i=0; i < 10; i++){
    result[i] = function(){
      return i;
    };
  }
  return result;
}
var funcs = createFunctions();
for (var i=0; i < funcs.length; i++){
  console.log(funcs[i]()); //10个10
}
```





