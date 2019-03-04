# <center>ajax原生请求</center>
所有现代浏览器均支持 XMLHttpRequest 对象（IE5 和 IE6 使用 ActiveXObject）。
## 创建 XMLHttpRequest 对象
所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象。
```
var xmlhttp;
if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
```
## 向服务器发送请求
如需将请求发送到服务器，我们使用 XMLHttpRequest 对象的 open() 和 send() 方法：
```
xmlhttp.open("GET","test1.txt",true);
xmlhttp.send();
```
## 服务器响应
获得来自服务器的响应，请使用XMLHttpRequest 对象的 responseText 或 responseXML 属性。
```
console.log(XMLHttpRequest.responseText, XMLHttpRequest.responseXML)
responseText:：获得字符串形式的响应数据
responseXML：获得XML形式的响应数据
```
## onreadystatechange 事件
当请求被发送到服务器时，我们需要执行一些基于响应的任务。
每当 readyState 改变时，就会触发 onreadystatechange 事件。
readyState 属性存有 XMLHttpRequest 的状态信息。

|属性|描述|
|---|---|
|onreadystatechange|存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。|
|readyState|存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。* 0: 请求未初始化; 1: 服务器连接已建立; 2: 请求已接收; 3: 请求处理中; 4: 请求已完成，且响应已就绪|
|status|200: 'OK' 404: 'NOT FOUND'|

