title: Git命令学习
date: 2016-09-11 09:48:00
description: 
categories:
- 编程
tags:
- git
toc: true
author:
comments:
original:
permalink: 
photos:
---
　　git是一个开源的分布式版本控制系统，可以很高效的处理不同规模的项目的版本管理。
<!-- more -->


## 1. 创建版本库

### 创建目录
```
mkdir example
cd example
```
### 将这个目录变成版本库
```
git init
```
目录下多一个.git目录，用来跟踪管理版本库


## 2.将文件添加到版本库

### 追踪文件
```
git add filename
```
或者一次性添加所有未追踪的文件
```
git add .
```
### 提交到仓库
```
git commit -m "you description"
```

## 3.查看当前仓库的状态

```
git status
```

这个命令用来查看仓库的详细状态，添加-s查看简要的状态(s表示short)

```
git status -s
```

简要状态下前面的符号代表的意思：

* ??? 代表未追踪该文件
* M 表示修改文件(Modify)
* A 表示添加(Add)
* D 表示删除(Delete)

## 4.对比文件差异

此命令比较的是工作目录中当前文件和暂存区域快照之间的差异,也就是修改之后还没有暂存起来的变化内容
```
git diff
```




