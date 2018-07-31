
---
title: python 装饰器简要笔记
date: 2018-7-27 11:58:58
type: "index"
tags: [python]
categories: python
---

### python函数式编程
#### 装饰器简要笔记

- [廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/0014318435599930270c0381a3b44db991cd6d858064ac0000)

#### 案例

设计一个decorator，可作用于任何函数上，在函数调用前后自动打印日志：
``` python

import functools

def log(func):   
    @functools.wraps(func)
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__) 
        return func(*args, **kw)
    return wrapper

@log  #把@log放到now()函数的定义处，相当于执行了语句： now = log(now)
def now():
    print('2018-7-27')

now()
# result
call now():
2018-7-27

```
> - log是一个decorator，接受一个函数作为参数，并返回一个函数
> - 函数对象有一个__name__属性，可以拿到函数的名字
> - 函数也是对象，它有__name__等属性，但你去看经过decorator装饰之后的函数，它们的__name__已经从原来的'now'变成了'wrapper',因此有些依赖函数签名的代码执行就会出错，可以使用Python内置的functools.wraps解决
> - wrapper()函数的参数定义是(*args, **kw),因此，wrapper()函数可以接受任意参数的调用。
> - Python的<b>@</b>语法，把decorator置于函数的定义处
<!-- more -->

#### 练习
请设计一个decorator，它可作用于任何函数上，并打印该函数的执行时间：

``` python
import time, functools

def metric(fn):
    @functools.wraps(fn)
    def wrapper(*args,**kw):
        startTime = time.time()
        fn(*args,**kw)
        endTime = time.time()
        execTime = (endTime - startTime) *1000
        print('%s executed in %s ms' % (fn.__name__, execTime))
        return fn(*args,**kw)
    return wrapper
# 测试
@metric
def fast(x, y):
    time.sleep(1)
    return x + y;

@metric
def slow(x, y, z):
    time.sleep(1.5)
    return x * y * z;

f = fast(11, 22)
s = slow(11, 22, 33)
if f == 33 and s == 7986:
    print('test success!')
```
![test.py](http://orrscanlu.bkt.clouddn.com/test_py.png)
---
#### 小结
- 在面向对象（OOP）的设计模式中，decorator被称为装饰模式。OOP的装饰模式需要通过继承和组合来实现，而Python除了能支持OOP的decorator外，直接从语法层次支持decorator。Python的decorator可以用函数实现，也可以用类实现。
- decorator可以增强函数的功能，定义起来虽然有点复杂，但使用起来非常灵活和方便

