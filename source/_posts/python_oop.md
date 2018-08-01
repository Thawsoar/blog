
---
title: python面向对象程序设计简要笔记
date: 2018-08-01 15:28:58
type: "index"
tags: [python]
categories: python
---
![python_oop](http://orrscanlu.bkt.clouddn.com/oop.png)

- 面向对象编程——Object Oriented Programming，简称OOP，是一种程序设计思想。
- OOP把对象作为程序的基本单元，一个对象包含了数据和操作数据的函数。
- 面向过程的程序设计把计算机程序视为一系列的命令集合，即一组函数的顺序执行。
- 面向过程把函数继续切分为子函数，即把大块函数通过切割成小块函数来降低系统的复杂度。

- 而面向对象的程序设计把计算机程序视为一组对象的集合，而每个对象都可以接收其他对象发过来的消息，并处理这些消息，计算机程序的执行就是一系列消息在各个对象之间传递。

- 在Python中，所有数据类型都可以视为对象，当然也可以自定义对象。自定义的对象数据类型就是面向对象中的类（Class）的概念。

<!-- more -->

### python
#### oop简要笔记

- [廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/0014318645694388f1f10473d7f416e9291616be8367ab5000)

#### 类和实例 以及 访问限制

```py
# !/usr/bin/env python3
# -*- coding: utf-8 -*-
'oop'

class Student(object): 

    def __init__(self, name, score):
        self.__name = name 
        #在Python中，实例的变量名如果以__开头，就变成了一个私有变量（private
        #只有内部可以访问，外部不能访问
        self.score = score
    
    def get_name(self):
        return self.__name
    
    def set_name(self, name):
        self.__name = name
    
    def print_score(self, age):
        print('name:%s\nscore:%s\nage:%s' % (self.__name, self.score, age))

    def get_grade(self):
            if self.score >= 90:
                return 'A'
            elif self.score >= 60:
                return 'B'
            else:
                return 'C'
lisa = Student('lisa', 22)
lisa.print_score(12)
print(lisa.get_grade())
lisa.score = 99
print(lisa.score)
print(lisa.__name)  #>>> error
#不能直接访问__name是因为Python解释器对外把__name变量改成了_Student__name，
#所以，仍然可以通过_Student__name来访问__name变量
print(lisa._Student__name)

lias.__name = 'lili' 
#>>> 'lili'  
#外部代码似乎“成功”地设置了__name变量，但实际上这个__name变量和class内部的__name变量不是一个变量！
#内部的__name变量已经被Python解释器自动改成了_Student__name，而外部代码给lisa新增了一个__name变量。

```
>- 类是创建实例的模板，而实例则是一个一个具体的对象，各个实例拥有的数据都互相独立，互不影响；

>- 方法就是与实例绑定的函数，和普通函数不同，方法可以直接访问实例的数据；

>- 通过在实例上调用方法，我们就直接操作了对象内部的数据，但无需知道方法内部的实现细节。

>- 和静态语言不同，Python允许对实例变量绑定任何数据，也就是说，对于两个实例变量，虽然它们都是同一个类的不同实例，但拥有的变量名称都可能不同

---

#### 继承与多态
```python 

class Animal(object):   #定义一个class的时候，实际上就定义了一种数据类型
    #新的class称为子类（Subclass）
    #而被继承的class称为基类、父类或超类（Base class、Super class）
    def run(self):
        print('Animal is running...')

class Dog(Animal):
    pass

class Cat(Animal):
    def run(self):
        print('Cat is running...')


dog = Dog()
dog.run()  #>>> Animal is running...

cat = Cat()
cat.run()  #>>> Cat is running...

isinstance(dog, Dog) #>>> True 
isinstance(dog, Animal) #>>> True 

```

>- 继承可以把父类的所有功能都直接拿过来，这样就不必重零做起，
>- 子类只需要新增自己特有的方法，也可以把父类不适合的方法覆盖重写。这就是多态
>- 在继承关系中，如果一个实例的数据类型是某个子类，那它的数据类型也可以被看做是父类。但是，反过来就不行

#### 理解多态的好处

接上定义一个函数：接收一个自定义数据类型变量,即 Animal || Dog || Cat作为参数
```python

def run_twice(animal):
    animal.run()
    animal.run()

run_twice(Animal())
#>>>Animal is running...
#>>>Animal is running..
run_twice(Dog())
#>>> Dog is running...
#>>> Dog is running...

```

新增一个Animal的子类，不必对run_twice()做任何修改，实际上，任何依赖Animal作为参数的函数或者方法都可以不加修改地正常运行，原因就在于多态
```python
class Tortoise(Animal):
    def run(self):
        print('Tortoise is running slowly...')
run_twice(Tortoise())
#>>> Tortoise is running slowly...
#>>> Tortoise is running slowly...
```
>- 多态的好处就是，当我们需要传入Dog、Cat、Tortoise……时，我们只需要接收Animal类型就可以了，因为Dog、Cat、Tortoise……都是Animal类型，然后，按照Animal类型进行操作即可。由于Animal类型有run()方法，因此，传入的任意类型，只要是Animal类或者子类，就会自动调用实际类型的run()方法，这就是多态的意思：

>- 调用方只管调用，不管细节，而当我们新增一种Animal的子类时，只要确保run()方法编写正确，不用管原来的代码是如何调用的。这就是著名的“开闭”原则：

>- *对扩展开放：允许新增Animal子类；*

>- *对修改封闭：不需要修改依赖Animal类型的run_twice()等函数。*

#### 鸭子类型
>###### 即不要求严格的继承体系，一个对象只要“看起来像鸭子，走起路来像鸭子”，那它就可以被看做是鸭子。

- 对于静态语言（例如Java）来说，如果需要传入Animal类型，则传入的对象必须是Animal类型或者它的子类，否则，将无法调用run()方法。

- 对于Python这样的动态语言来说，则不一定需要传入Animal类型。我们只需要保证传入的对象有一个run()方法就可以了

- 动态语言的鸭子类型特点决定了继承不像静态语言那样是必须的。