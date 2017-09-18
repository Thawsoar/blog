---
title: JavaScript小案例(2)
date: 2017-06-14 21:40:58
type: "index"
tags: [JavaScript]
categories: JavaScript
---
#### 评选学习之星
```HTML
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>案例9 评选学习之星</title>
<style>
.item{
   cursor:pointer;
   padding :4px;
   border: none;
   background-color:#FFF;
}
#unSelect,#selected { 
   overflow:auto;
   border:solid 1px #008;
   width:200px;
   height : 300px;
   text-align:center;
}
.itemOnMouseOver{
cursor:pointer;
border-bottom:solid 1px #8080FF;
padding :4px;
padding-top :3px;
padding-bottom:3px;
background-color:#9FF;
}
img{
   margin-right :2px;
   width:70px;
	height:70px;
	border:1px solid gray;
	cursor:pointer;

}
</style>
```
<!-- more -->
```HTML
<script>
function init(){
var unSel=document.getElementById("unSelect");
var names="张三,李四,王五,赵六,宋七,刘八,付九,田十".split(",");
var ids="张三,李四,王五,赵六,宋七,刘八,付九,田十".split(",");
for (var i = 0; i < names.length; i++) {
  var div=document.createElement("div");
  div.className="item";
  div.onclick=moveMe;
  div.onmouseover = function() {
    this.className = "itemOnMouseOver";
  };
  div.onmouseout=function() {
    this.className = "item";
  };
  div.memberId = ids[i];
  var img1=document.createElement("img");
  img1.src="images/p"+i+".jpg";
  div.appendChild(img1);
  div.appendChild(document.createTextNode(names[i]));
  unSel.appendChild(div);
}
}
function moveMe () {
  var unSel = document.getElementById("unSelect");
  var sel=document.getElementById("selected");
  if(this.parentNode==unSel) {
    sel.appendChild(this);
  }else {
    unSel.appendChild(this);
    this.className="item";
  }
}
function getSelectedMembers() {
  var sel=document.getElementById("selected");
  var members=sel.getElementsByTagName("div");
  var s="";
  for (var i = 0; i < members.length; i++) {
    s+=members[i].memberId;
    if(i!=members.length-1) {
      s+=",";
    }
  }
    alert("所选学习之星是"+s);
}
function moveAll (a,b) {
  var unsel=document.getElementById(a);
  var sel=document.getElementById(b);
  var members=unsel.getElementsByTagName("div");
  for (var i =members.length-1;i>=0;i--) {
    members[i].className="item";
    sel.appendChild(members[i]);
  }
}
function myMain() {
  init();
}
</script>
</head>
<body onload="myMain()">
<h2 align="center">评选学习之星</h2>
<table width="200" border="0" align="center">
  <tr>
    <td align="center">学习之星候选人</td>
    <td></td>
    <td align="center">已选学习之星</td>
  </tr>
  <tr>
    <td><div id="unSelect"></div></td>
    <td><input type="button" value="全选" onClick="moveAll('unSelect','selected')">      <input type="button" value="清空"  onClick="moveAll('selected','unSelect')"></td>
    <td><div id="selected"></div></td>
  </tr>
  <tr>
    <td colspan="3" align="center"><input type="button" value="选中的学习之星" onClick="getSelectedMembers()"></td>
  </tr>
</table>
</body>
</html>
```