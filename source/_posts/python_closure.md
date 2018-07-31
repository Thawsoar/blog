
---
title: python 闭包简要笔记
date: 2018-7-25 22:48:58
type: "index"
tags: [python]
categories: python
---

### python
#### 闭包简要笔记

- [廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001431835236741e42daf5af6514f1a8917b8aaadff31bf000)

#### 案例
>- 一个函数可以返回一个计算结果，也可以返回一个函数。
返回一个函数时，牢记该函数并未执行，返回函数中不要引用任何可能会变化的变量。
>- 如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，无论该循环变量后续如何更改，已绑定到函数参数的值不变.

``` python
def count():
    def f(j):
        def g():
            return j*j
        return g
    fs = []
    for i in range(1, 4):
        fs.append(f(i)) # f(i)立刻被执行，因此i的当前值被传入f()
    return fs
f1, f2, f3 = count()
f1() #>>> 1
f2() #>>> 4
f3() #>>> 9
```
<!-- more -->

#### 练习
利用闭包返回一个计数器函数，每次调用它返回递增整数

- 方法一

``` python
def createCounter():
	a = [0]
	def counter():
	    a[0] += 1
	    return a[0]
	return counter
```
>- 在python2中，没有nonlocal这个关键字，我们可以把闭包变量改成可变类型数据进行修改，比如列表。

- 方法二

``` python
def createCounter():
   s = 0
   def counter():
       nonlocal s
       s = s + 1
       return s
   return counter
```
>- 在python3中，可以用nonlocal 关键字声明 一个变量， 表示这个变量不是局部变量空间的变量，需要向上一层变量空间找这个变量。


