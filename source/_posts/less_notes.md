
---
title: Less 即学即用简要学习笔记
date: 2017-12-03 22:05:58
type: "index"
tags: [css,less]
categories: less
---

### Less 即学即用简要学习笔记
#### Less

- [less 中文网](http://less.bootcss.com/)
- [less github](https://github.com/less/less.js)

#### 编译 

- node
	- `npm install less -g`
	- `lessc style.less > style.css`
- sublime
 	- `package install Less`
 	- `package install Less2Css`
<!-- more -->

#### 注释

- `/*被编译*/`
- `// 不被编译`

#### 声明变量

- 
@声明变量
``` less
@test_width: 300px;
```

#### 混合 

- 混合Mixin
``` less
.div {
	.box;
    width: @test_width;
 }
```

- 可带参数
``` less
.border(@border_width) {
	border: solid yellow @border_width;
} 
.test_hunhe {
	.border(30px);
}
```

- 混合默认带值
``` less
border(border_width:10px) {
	border: solid green @border_width; 
}
```

#### 匹配模式

``` less
.triangle(bottom,@w:5px,@c:#ccc) {
	border-width: @w;
	border-color: @c;
	border-style: solid dashed dashed dashed;
}
.triangle(@_,@w:5px,@c:#ccc) {
	width: 0;
	height: 0;
	overflow: hidden;
}
.sanjiao {
	.triangle(bottom)
}
```

<!-- <h4><center>运算</center></h4> -->
#### 运算
``` less
@test_width: 300px;
.box {
	width: @test_width +20;
}
```
#### 嵌套规则
``` less
.list {
	...
	li {
		...
	}
	a {
		...
		&:hover {
			color: red;
		}
	}
	span {
		...
	}
}
```
> & 代表它的上一层选择器

#### @arguments 变量

```less
.border_arg(@w:30px,@c:red,@xx:solid) {
	border: @arguments;
}
.test_arguments {
	.border_arg(40px);
}
```
> 编译后：
	`
	.test_arguments {
		border: 40px solid red;
	}
	`

#### 避免编译 使用 `~`

```less
.test {
	width: ~calc(300px - 30px);
}
```
> 编译后：`.test { width: calc(300px -30px)}`


#### !important关键字
```less
.test_important {
	.border_radius() !important
}
```


#### 导入
```less
@import "a"
@import (less) "a.css"
@import "b.less"
```