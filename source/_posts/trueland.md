
---
title: 珍岛响应式官网开发
date: 2017-10-22 21:45:58
type: "index"
tags: [项目,响应式]
categories: 项目实战
---
# 珍岛响应式官网开发项目

- 项目预览: https://thawsoar.github.io/trueland/index.html
- 源码地址: https://github.com/Thawsoar/trueland 


![效果预览](http://orrscanlu.bkt.clouddn.com/tureland.png)

## 1. 搭建页面骨架及项目目录结构

```
├─ /trueland/ ··················· 项目所在目录
└─┬─ /css/ ······················· CSS文件
  ├─ /font/ ······················ 使用到的字体文件
  ├─ /images/ ······················· 使用到的图片文件
  ├─ /js/ ························ JS脚本
  ├─ /about.html/ ·······················  关于页面
  ├─ /product.html/ ······················· 产品页面
  ├─ /favicon.ico ················ 站点图标
  └─ /index.html ················· 入口文件
```

### 1.1.约定编码规范

<!-- more -->

#### 1.1.1.HTML约定

- 在head中引入必要的CSS文件，优先引用第三方的CSS，方便我们自己的样式覆盖
- 在body末尾引入必要的JS文件，优先引用第三方的JS，注意JS文件之间的依赖关系
- 第三方资源可用外链 例如 jquery 可用bootcdn外链

#### 1.1.2.CSS约定

- 除了公共级别样式，其余样式全部由 模块前缀
- 尽量使用 直接子代选择器， 少用间接子代 避免错杀



### 1.2.HTML5文档结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>页面标题</title>
</head>
<body>
  
</body>
</html>
```

### 1.3.Viewport设置

```html
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

> html中插入视口设置，可以通过emmet __meta:vp__ 插入

### 1.4.浏览器兼容模式

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
```

> html中插入兼容模式设置，可以通过emmet __meta:compat__ 插入

### 1.5.favicon（站点图标）

```html
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
```

> html中插入图标链接，可以通过emmet __link:favicon__ 插入

### 1.6.引入相应的第三方文件

```html
<link rel="stylesheet" href="css/reset.css"> ............样式重置
<link rel="stylesheet" href="font/style.css"> ............引入iconMoon 字体图标
<link rel="stylesheet" href="css/index.css"> ............引入也基本样式
<link rel="stylesheet" href="css/unslider.css"> ............轮播图插件样式
<link rel="stylesheet" href="css/media.css"> ............自定义媒体查询样式
...
<script src="js/index.js"></script> ............js脚本
<script src="https://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script> ............bootcdn外链jquery
<script src="js/unslider-min.js"></script> ............bootcdn外链jquery
```

### 1.7.在我们默认的样式表中将默认字体设置为：

```css
body{
  font-family: "Helvetica Neue", 
                Helvetica, 
                Microsoft Yahei, 
                Hiragino Sans GB, 
                WenQuanYi Micro Hei, 
                sans-serif;
}
```

## 2.完成页面空结构

> 先划分好页面中的大容器，然后在具体看每一个容器中单独的情况

```html
<body>
  <!-- 头部区域 -->
  <div class="header-wrapper"></div>
  <!-- /头部区域 -->
  <!-- 导航 -->
  <div class="nav-wrapper"></div>
  <!-- /导航 -->
  <!-- 广告轮播 -->
  <div class="carousel"></div>
  <!-- /广告轮播 -->
  <!-- tips -->
  <div class="tips"></div>
  <!-- /tips -->
  <!-- 服务列表 -->
  <div class="services-wrapper></div>
  <!-- /服务列表 -->
  <!-- 产品推荐 -->
  <div class="product-wrapper></div>
  <!-- /产品推荐 -->
  <!-- 关于我们 -->
  <div class="about-wrapper></div>
  <!-- /关于我们 -->
  <!-- 关于我们 -->
  <div class="news-wrapper></div>
  <!-- /关于我们 -->
  <!-- 脚注区域 -->
  <footer></footer>
  <!-- /脚注区域 -->
</body>
```

## 3.构建顶部通栏

```html
<header>
  <div class="topbar"></div>
</header>
```

### 3.1.container类

- 用于定义一个固定宽度且居中的版心

```html
<div class="topbar">
  <div class="container">
    <!--
      此处的代码会显示在一个固定宽度且居中的容器中
      该容器的宽度会跟随屏幕的变化而变化
    -->
  </div>
</div>
```

### 3.2.使用flex布局

- display: flex;
- 方便响应式布局

### 3.2.字体图标

```css
@font-face {
  font-family: 'itcast';
  src: url('../font/MiFie-Web-Font.eot') format('embedded-opentype'), url('../font/MiFie-Web-Font.svg') format('svg'), url('../font/MiFie-Web-Font.ttf') format('truetype'), url('../font/MiFie-Web-Font.woff') format('woff');
}

[class^="icon-"],
[class*=" icon-"] {
  /*注意上面选择器中间的空格*/
  /*我们使用的名为itcast的字体就是上面的@font-face的方式声明的*/
  font-family: itcast;
  font-style: normal;
}

.icon-mobilephone::before{
  content: '\e908';
}
```


#### 字体文件格式

- eot : embedded-opentype
- svg : svg
- ttf : truetype
- woff : woff


## 4.轮播图

### 4.1.unslider JS插件使用

> 参照unsliderJS插件官网demo
> 相应的样式调整


### 4.小图片不需要使用背景的方式

- 小图如果还是使用背景的方式，当屏幕特别小时，效果很差
- 所以当使用小图时，改用img的方式

```javascript
// 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
if (isSmallScreen) {
  $item.html('<img src="' + imgSrc + '" alt="" />');
} else {
  $item.empty();
}
```

待续......


