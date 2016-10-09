title: Git命令学习（上）
date: 2016-09-11 09:48:00
description: 
categories:
- 编程
tags:
- git
toc: true
author: Corner
comments:
original:
permalink: 
photos:
---
　　git是一个开源的分布式版本控制系统，可以很高效的处理不同规模的项目的版本管理。git的命令比较多，在这篇文章中主要介绍了各种git命令的基本操作。本文比较基础，适合入门。
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
　　目录下多一个.git目录，用来跟踪管理版本库，你也可以把线上的项目克隆到本地，使用下面的命令

```
git clone [url]
```

## 2.将文件添加到版本库

### 追踪文件
```
git add [filename]
```
或者一次性添加所有未追踪的文件
```
git add .
```
### 提交到仓库
```
git commit -m "[you description]"
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

* ?? 表示添加文件后而未追踪的文件
* M 表示修改文件(Modify)
* A 表示添加文件后追踪了该文件(Add)
* D 表示删除文件(Delete)
　　
简要状态下颜色的不同也有区别。如果是红色，则表示该文件修改后没有追踪；是绿色则表示修改后追踪了改文件。

## 4.对比文件差异

　　git diff(difference)此命令比较的是工作目录中当前文件和暂存区域快照之间的差异,也就是修改之后还没有暂存起来的变化内容
```
git diff
```
　　如果使用add命令追踪该文件后，diff命令失效。

## 5.显示提交的日志
```
git log
```
　　log命令用于显示从最近到以前的提交日志，commit后面显示的一长串字符数字是该次提交所对应的版本号，每次都不会重复的。log命令显示的信息比较多，可以加上 --pretty=oneline 参数
```
git log --pretty=oneline
```
　　在下面的版本回退中需要用到提交日志的版本号，这时候就需要复制这个版本号。在windows下复制git窗口中的内容的快捷键是Ctrl+Insert，粘贴是Insert

## 6.版本回退
```
git reset --hard [LogId]
```
　　reset命令用于控制版本回退到之前提交时的状态。这边的LogId就是上一节中复制出来的版本号。

## 7.撤销修改
```
git checkout -- [filename]
```
　　checkout命令让你在工作区做的修改全部撤销，回到上一次commit时的状态。

## 8.删除文件
　　如果你在工作区删除了一个文件，那么status就会提醒你工作区和暂存区不一致。这时候你有两种选择，一个是git rm命令确认删除，
```
git rm [filename]
```
　　这个命令相当于同时进行了删除命令和追踪文件命令，其等价命令如下：
```
rm [filename]
git add [filename]
```
　　另一个是通过checkout命令找回删除的文件
```
git checkout -- [filename]
```
