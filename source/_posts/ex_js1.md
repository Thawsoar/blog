
---
title: JavaScript小案例(1)
date: 2017-06-14 21:37:58
type: "index"
tags: [JavaScript]
categories: JavaScript
---

#### 成绩输入系统
```HTML
<html>
<head>
<meta charset="gb2312">
<title>案例5 成绩输入系统</title>
<style type="text/css">
<!--
td {
width: 100px;
font-size: 12px;
height: 20px;
text-align: center;
}
-->
</style>
</head>
<body>
```
<!-- more -->
```HTML
<script>
var i=0;sum=0;avg=0;
var name1=new Array("丽丽","王明","周三");
var km=new Array("英语","高数","动态脚本");
document.write("<table width=\"500px\" border=\"1\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\"><tr><td>姓名</td>");
  for(n in km) {
    document.write("<td>"+km[n]+"</td>");
  }
  document.write("<td>总分</td><td>平均分</td><td>等级</td></tr>");
  for(n in name1) {
    document.write("<tr><td>"+name1[n]+"</td>");
    while(i<km.length) {
      ts="输入"+name1[n]+"的"+km[i]+"成绩:";
      var record = parseFloat(prompt(ts,""));
      if(isNaN(record)||(record<0)||(record>100)) {
        alert("你输入的数值为"+record+",不合法，请重新输入");
        continue;
      }
      document.write("<td>"+record+"</td>");
      i++;
      sum = sum+record;
    }
    document.write("<td>"+sum+"</td>");
    avg=Math.round(sum/km.length);
    document.write("<td>"+avg+"</td>");
    if(avg<60){
      document.write("<td>不合格</td>");
    } else if (avg>=60&&avg<70) {
      document.write("<td>及格</td>");
    }else if (avg>=70&&avg<80) {
      document.write("<td>中等</td>");
    }else if (avg>=80&&avg<90) {
      document.write("<td>良好</td>");
    }else if (avg>=90&&avg<100) {
      document.write("<td>优秀</td>");
    }
    document.write("</tr>");
    i=0;
    sum=0;
  }
  doucment.write("/<table>");
</script>
</body>
</html>
```



