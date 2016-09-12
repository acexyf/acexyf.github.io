title: JAVA处理跨域问题
date: 2016-05-28 13:58:00
description: 
categories:
- 编程
tags:
- JAVA
- 异步跨域
toc: true
author:
comments:
original:
permalink: 
photos:
---
　　在写前端脚本的时候我们经常会遇到发送数据到后台的情况，但是由于浏览器的限制，不同域名之间的数据是不能互相访问的，那前端怎么和后端如何进行数据之间的交换呢？
<!-- more -->


JavaScript由于安全性方面的考虑，不允许页面跨域调用其他页面的对象，那么问题来了，什么是跨域问题？
答：这是由于浏览器同源策略的限制，现在所有支持JavaScript的浏览器都使用了这个策略。那么什么是同源呢？所谓的同源是指三个方面“相同”：
1. 域名相同
2. 协议相同
3. 端口相同
下面就举几个例子来帮助更好的理解同源策略。

| URL        |      说明      | 是否允许通信  |
| ---------- | -------------- | ------------- |
| http://www.a.com/a.js <br> http://www.a.com/b.js       | 同一域名           |  允许    |
| http://www.a.com/a.js <br> http://www.b.com/a.js       | 不同域名           |  不允许  |
| http://www.a.com:8000/a.js<br>http://www.a.com/b.js    |  同一域名不同端口  |  不允许  |
| https://www.a.com/a.js <br> http://www.a.com/b.js      | 同一域名不同协议   |  不允许  |


在JAVA中处理跨域问题，通常有以下两种常用的解决方法。

#### 第一种解决方法
后台代码在被请求的Servlet中添加Header设置：

```
response.setHeader("Access-Control-Allow-Origin", "*");
PrintWriter out =null;
try
{
	out = response.getWriter();
} catch (IOException e)
{
	// TODO Auto-generated catch block
	e.printStackTrace();
}
out.print("{'status':'ok'}");
out.flush();
out.close();
```

Access-Control-Allow-Origin这个Header在W3C标准里用来检查该跨域请求是否可以被通过，如果值为*则表明当前页面可以跨域访问。默认的情况下是不允许的。
在前端JS中需要向Servlet发出请求，请求代码如下所示：

```
$.ajax({
  url: "your url",
  type:"get or post",
  dataType:"json",
  data:{
    ....
  },
  success:function(data){
    ...
  }
```

#### 第二种解决方法
通过jsonp跨域请求的方式。JSONP和JSON虽然只有一个字母的区别，但是他们完全就是两回事，很多人很容易把他们搞混。JSON是一种数据交换的格式，而JSONP则是一种非官方跨域数据交互协议。
首先来说一下前端JS是怎么发送请求。代码如下所示：

```
$.ajax({
  url:"your url",
  type:"get or post",
  async:false,
  dataType : "jsonp",
  //服务端用于接收callback调用的function名的参数
  jsonp:"callbackparam",
  //callback的function名称
  jsonpCallback:"success_jsonpCallback",
  success:function(data){
    console.log(data);
  },
  error:function(data){
    console.log(data);
  }
});
```

这里的callbackparam和success_jsonpCallback可以理解为发送的data数据的键值对，可以自定义，但是callbackparam需要和后台约定好参数名称，因为后台需要获取到这个参数里面的值（即success_jsonpCallback）。
下面，最重要的来了，后台怎么样获取和返回数据呢。代码如下所示:

```
  PrintWriter out =null;
  String callback=req.getParameter("callbackparam");
  String json=callback+"({'status':'ok'})";
  try
  {
    out = resp.getWriter();
  } catch (IOException e)
  {
    // TODO Auto-generated catch block
    e.printStackTrace();
  }
  out.print(json);
  out.flush();
  out.close();
```

首先需要获取参数名为callbackparam的值，这里获取到的值就是“success_jsonpCallback”。然后将这个值加上一对小括号。小括号里放入你需要返回的数据内容，比如这里我返回一个JSON对象。当然你也可以返回其他对象，比如只返回一个字符串类型数据也可以。最后前端JS返回的数据就是这样的：

```
success_jsonpCallback({'status':'ok'})
```

浏览器会自动解析为json对象，这时候你只需要在success回调函数中直接用data.status就可以了。





