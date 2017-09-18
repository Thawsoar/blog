
---
title: JavaScript小案例(3)
date: 2017-06-14 21:45:58
type: "index"
tags: [JavaScript]
categories: JavaScript
---

#### 时钟效果演示
```HTML
<html>
<head>
<meta charset="gb2312">
<title>案例6 时钟效果演示</title>
<script>
function time() {
    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var second = now.getSeconds();
    minutes<10?"0"+minutes:minutes;
    second<10?"0"+second:second;
    al.innerHTML=hr+":"+minutes+":"+second;
    setTimeout("time()",1000);
}
function myMain() {
    time();
}
</script>
</head>
```
<!-- more -->

```HTML
<body onload="myMain()">
<script>
var today = new Date();
var day = new Array("日","一","二","三","四","五","六");
var day0 = today.getDay();
var date1 = "今天是"+(today.getFullYear())+"年"+(today.getMonth()+1)+"月"+today.getDate()+"日<br>星期"+day[day0];
document.write('<center>');
document.write(date1+"<br>");
document.write("<p id='al'></p>");
var hr = today.getHours();
if(hr>=23||(hr>=0&&hr<6)) {
       document.write("午夜时分，赶快休息吧！");
            }
            if(hr>=6&&hr<12)
            {
                document.write("上午好，祝有愉快的一天！");
            }
            if(hr>=12&&hr<14)
            {
                document.write("午饭时间，要填饱肚子！");
            }  
            if(hr>=14&&hr<18)
            {
                document.write("下午好,保持住工作的热情！");
            }
            if(hr>=18&&hr<23)
            {
                document.write("晚上好，晚餐吃得满意吗？");
}
document.write("<p id='a2'>您将在本网页停留时间</P>");
var second = 0;
var minute = 0;
var hour = 0;
window.setInterval("OnlineStayTime();",1000);
function OnlineStayTime() {
    second++;
    if(second == 60) {
        second = 0;
        minute++;
    }
    if(minute == 60) {
        minute =0;
        hour++;
    }
a2.innerHTML= "您在本网页停留时间" + hour + "小时" + minute + "分" + second+ "秒" ; 
}
document.write("</center>");
</script> 
</body>
</html>
```