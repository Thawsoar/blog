---
title: python_oop高级编程
date: 2018-08-03 14:16:58
tags: [python]
categories: python
---

#### `__slots__` 限制类实例的属性

```python
class Student(object):
    __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称

>>> s = Student() # 创建新的实例
>>> s.name = 'Michael' # 绑定属性'name'
>>> s.age = 25 # 绑定属性'age'
>>> s.score = 99 # 绑定属性'score'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Student' object has no attribute 'score'
```


{% note warning %}

由于`'score'`没有被放到`__slots__`中，所以不能绑定score属性，试图绑定score将得到AttributeError的错误。

使用`__slots__`要注意，`__slots__`定义的属性仅对当前类实例起作用，对继承的子类是不起作用的

除非在子类中也定义`__slots__`，这样，子类实例允许定义的属性就是自身的`__slots__`加上父类的`__slots__`
{% endnote %}

<!-- more -->

#### `@property`装饰器: 负责把一个方法变成属性调用

```python
class Student(object):

    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value

>>> s = Student()
>>> s.score = 60 # OK，实际转化为s.set_score(60)
>>> s.score # OK，实际转化为s.get_score()
60
>>> s.score = 9999
Traceback (most recent call last):
  ...
ValueError: score must between 0 ~ 100!
```
{% note warning %}
`self._score` 注意方法返回的属性要带 `_`
{% endnote %}

{% note info %}
`@property`广泛应用在类的定义中，可以让调用者写出简短的代码，同时保证对参数进行必要的检查，这样，程序运行时就减少了出错的可能性
{% endnote %}

#### 多重继承

![多重继承](http://orrscanlu.bkt.clouddn.com/mult_inherit.png)

```py
class Dog(Mammal, RunnableMixIn, CarnivorousMixIn):
    pass
```

{% note warning %}
不需要复杂而庞大的继承链，只要选择组合不同的类的功能，就可以快速构造出所需的子类。

由于Python允许使用多重继承，因此，MixIn就是一种常见的设计。

只允许单一继承的语言（如Java）不能使用MixIn的设计。
{% endnote %}


#### 定制类

- `__str__`