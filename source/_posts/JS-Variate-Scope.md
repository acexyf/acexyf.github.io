title: 深入理解js中的变量和作用域
date: 2016-09-21 10:51:58
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
　　如果把整个js比作是一个作战的军队，作用域就像是军队中的一个个编制单位，负责整编士兵；而变量就像军队中的最小单位---士兵。
<!-- more -->

# 变量
## 变量分类
　　js中的变量分为两种：全局变量和局部变量。全局变量很好理解，就是在js任何地方都能够调用的变量；而局部变量就只能在函数的内部才能够调用的变量。
```javascript
var a=10;
function show(){
  console.log('a:'+a); //a:10
  var b=2;
  console.log('inside b:'+b); //inside b:2
}
show();
console.log('outside b:'+b); //b is no defined
```
　　在上面的程序中，变量a就是一个全局变量，在函数的内部能够调用。但是这里的变量b就是局部变量，当函数结束调用后，变量b就被回收了，因此在函数外部调用失败。

**另外需要特别注意的是：**
　　如果在声明局部变量时不用var声明，那么这个变量自动“提升”为全局变量。
```javascript
var a=10;
function show(){
  console.log('a:'+a); //a:10
  b=2;
  console.log('inside b:'+b); //inside b:2
}
show();
console.log('outside b:'+b); //outside b:2
```

　　对比两段代码，如果你在声明b=2时没有写var，那么b就隐式地声明为全局变量，在函数外面还是能够被调用到的。
　　虽然使用全局变量能够在任何地方调用，很方便，但是全局变量的优点也给他带来了缺点：

1. 一直占用内存：全局变量保存在静态存储区，如果全局变量过多会占多大量内存，严重影响页面的性能。
2. 影响了函数的独立性：一般函数都是传入参数和传出返回值进行运算的，如果函数依赖于全局变量，破坏了函数的这种独立性，同时也降低了函数的可移植性。

*因此我们在定义变量时一般要尽可能少的定义全局变量。*

## 变量声明

> 函数声明优先于变量声明

　　下面我们通过一段代码来说明.
```javascript
var a; 
function a(){
}
console.log(typeof a); //function
```

　　或许有人是认为函数声明在后面的原因，那么调换一下位置。

```javascript
function a(){
}
var a; 
console.log(typeof a); //function
```

　　调换位置后变量a的类型还是function，这时候声明变量a的语句没有起作用，被函数声明覆盖了。因此函数声明优先于变量的声明。
　　但是如果我们在声明的同时给a进行赋值。

```javascript
function a(){
}
var a='xyf'; 
console.log(typeof a); //string
```

　　我们将其调换一下位置再次进行验证。

```javascript
var a='xyf'; 
function a(){
}
console.log(typeof a); //string
```

　　可以看到，给变量a进行赋值后，不管变量a在哪，其类型变为字符串类型，上面两段代码相当于如下代码：

```javascript
function a(){
}
var a;
a='xyf';
console.log(typeof a); //string
```

　　a最后被赋值为字符串，因此a的类型自然是字符串

# 作用域
## 块级作用域
　　js中作用域只有一个函数作用域和全局作用域，一个很大的特点就是js中**没有块级作用域**。函数作用域是比较容易理解的，那么什么是块级作用域呢？

> 任何一对花括号（｛和｝）中的语句集都属于一个块，在这之中定义的所有变量在代码块外都是不可见的，我们称之为块级作用域。

　　理解了块级作用域，来看一下下面的小例子。

```javascript
console.log(v); //undefined
var v = "world";
```

　　这段代码很好理解，由于变量v在没有赋值前使用了，所以是undefined。其实这里存在着声明的提前。

> 当前作用域内的声明都会提升到作用域的最前面，包括变量和函数的声明

　　由于js作用域中的声明都会被提升到作用域的最前面，所以，上面的代码相当于：

```javascript
var v;
console.log(v); //undefined
v = "world";
```

　　这样就能很清晰地理解为什么变量v是undefined的了。
　　下面我们把变量v放到一个方法中去：

```javascript
if(true){
  var v = "hello";
}
console.log(v); //hello
```

　　在这里由于js没有块级作用域，所以if方法没有“形成”一个封闭的作用域，并不能够“阻挡”外面的代码获取里面的变量。

## 函数作用域
　　我们再把变量v放到函数中去：

```javascript
function show(){
  var v='world';
}
show();
console.log(v); //undefined
```

　　由于show函数是一个函数作用域，“阻挡”外面的代码获取里面变量（并不能阻挡里面的代码获取外面的变量），所以函数外部并不能获取到函数里面的变量v。因此证明了js中只有函数作用域，没有块级作用域。
　　再来看下面的一段代码：

```javascript
var v='hello';
function show(){
  console.log(v); //undefined
  var v='world';
}
show();
```

　　很多人看到这边都会很疑惑，不是说这边show函数中能够获取到函数外面的变量的么？但是由于这边是一个函数作用域，而函数作用域存在着变量声明的提前，因此，上面的代码相当于下面的代码：

```javascript
var v='hello';
function show(){
	var v;
	console.log(v); //undefined
	v='world';
}
show();
```

　　这里把变量v的声明放到了整个函数作用域的最前面，因此显示为undefined。理解了上面的代码，相信下面的代码也不难理解了。

```javascript
var v = "hello";
(function(){
  console.log(v);
  var v = "world";
})();
```

　　在这里自执行函数形成了函数作用域

## 需要注意的是

> 变量提升只提升函数的声明，并不提升函数的定义

```javascript
show(); //show is not a function
var show=function(){
	//...
}
show(); //成功运行
```

　　或许有人有疑问，为什么这边定义的函数就不能执行呢？在这里我们需要明白函数在js中是如何进行定义的。函数有两种定义方式，一种是函数声明，另一种是函数表达式。那么什么是函数声明什么是函数表达式呢？

```javascript
//函数声明
function show(){
	//....
}
//函数表达式
var show=function(){
	//...
}
```

　　乍一看，他们长得很像，写法都差不多，但是实际上还是有区别的。js的解析器对函数声明和函数表达式并不是一视同仁的对待的，有点“种族歧视”的意思在里面。
　　函数声明就像是“一等公民”，js会优先读取，确保在执行前就已经被解析了，所以函数声明放在当前作用域的任何地方都能够被调用，甚至放到调用函数声明之后面。
　　而函数表达式就显得比较“普通”，和一般的变量一样，只有到执行到该行时才进行解析，因此，调用函数表达式要在定义后进行使用。



