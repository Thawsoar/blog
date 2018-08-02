---
title: Hexo Next-Theme 内嵌标签
date: 2018-08-02 16:16:35
tags: "index"
categories:
---

#### 文本引用标签
<blockquote class="blockquote-center">
人的一切痛苦，本质上都是对自己的无能的愤怒。
</blockquote>

```html

<blockquote class="blockquote-center">
人的一切痛苦，本质上都是对自己的无能的愤怒。
</blockquote>

{% centerquote %}
人的一切痛苦，本质上都是对自己的无能的愤怒。
{% endcenterquote %}

{% cq %} 
人的一切痛苦，本质上都是对自己的无能的愤怒。 
{% endcq %}

```
<!-- more -->

#### 图片标签

{% fullimage http://orrscanlu.bkt.clouddn.com/-Uploads-201706-5934d3483e671.jpg, angle yan, angle %}

```html

<img src="/image-url" class="full-image" />

{% fullimage /image-url, alt, title %}

{% fi /image-url, alt, title %}

```

#### Bootstrap Callout 

```
{% note class_name %} Content (md partial supported) {% endnote %}
```

{% note default %} default {% endnote %}
{% note primary %} primary {% endnote %}
{% note success %} success {% endnote %}
{% note info %} info {% endnote %}
{% note warning %} warning {% endnote %}
{% note danger %} danger {% endnote %}

#### 代码块标签

{% codeblock Array.map %}
array.map(callback[, thisArg])
{% endcodeblock %}

```
{% codeblock Array.map %}
array.map(callback[, thisArg])
{% endcodeblock %}
```
#### 视频标签

```
{% youtube video_id %}
```

####iframe

```
{% iframe url [width] [height] %}
```

#### raw (原始标记)
```
{% raw %}
<i>content</i>
{% endraw %}
```
{% raw %}
<i>content</i>
{% endraw %}

