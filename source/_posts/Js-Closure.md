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
  闭包在js中比较常见
<!-- more -->



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
console.log(object.getNameFunc()());
```



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
console.log(object.getNameFunc()());
```




```javascript
function createFunctions(){
  var result = new Array();
  for (var i=0; i < 10; i++){
    result[i] = function(){
      return i;
    };
  }
  console.log(i);
  return result;
}
var funcs = createFunctions();
for (var i=0; i < funcs.length; i++){
  console.log(funcs[i]());
}
```





