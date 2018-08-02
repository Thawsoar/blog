
---
title: python 模块简要笔记
date: 2018-7-31 15:29:58
type: "index"
tags: [python]
categories: python
---

### python
#### 模块简要笔记

- [廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001431845183474e20ee7e7828b47f7b7607f2dc1e90dbb000)

##### 案例
编写一个hello模块

- 新建hello.py文件

```python
#!/usr/bin/env python3 
# -*- coding: utf-8 -*-

'a test module !!!'

__author__ = 'Tao Xiang'

import sys  #导入sys模块 使用sys这个变量，访问sys模块的所有功能。

def test():
    args = sys.argv  # argv变量，用list存储了命令行的所有参数。argv至少有一个元素，因为第一个参数永远是该.py文件的名称
    if len(args)==1:
        print('Hello,world!')
    elif len(args)==2:
        print('Hello, $s!' %args[1])
    elif:
        print('Too many arguments!')

if __name=='__main__':
    test()


```
<!-- more -->

>- 第1行和第2行是标准注释，第1行注释可以让这个hello.py文件直接在Unix/Linux/Mac上运行，第2行注释表示.py文件本身使用标准UTF-8编码；
>- 第4行是一个字符串，表示模块的文档注释，任何模块代码的第一个字符串都被视为模块的文档注释
>- 第6行使用__author__变量写入作者名字



```python
if __name__=='__main__':
    test()
```
>- 当我们在命令行运行hello模块文件时，Python解释器把一个特殊变量__name__置为__main__，而如果在其他地方导入该hello模块时，if判断将失败，因此，这种if测试可以让一个模块通过命令行运行时执行一些额外的代码，最常见的就是运行测试。

- 运行文件

```shell

$ python3 hello.py
Hello, world!
$ python hello.py Michael
Hello, Michael!

```

---

#### 作用域

```python
def _private_1(name):
    return 'Hello, %s' % name

def _private_2(name):
    return 'Hi, %s' % name

def greeting(name):
    if len(name) > 3:
        return _private_1(name)
    else:
        return _private_2(name)
```
>- 类似```_xxx```和```__xxx```这样的函数或变量就是非公开的（private），不应该被直接引用，比如_abc，__abc等
>- 外部不需要引用的函数全部定义成private，只有外部需要引用的函数才定义为public
>- private函数和变量“不应该”被直接引用，而不是“不能”被直接引用，是因为Python并没有一种方法可以完全限制访问private函数或变量，但是，从编程习惯上不应该引用private函数或变量