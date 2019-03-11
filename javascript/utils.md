# <center>常用javascript函数</center>

## 设置cookie
```javascript
/**
 * 获取一级域名
 * @return {*}
 */
const getDomain = function () {
	var host = location.hostname;
	var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	if (ip.test(host) === true || host === 'localhost') return host;
	var regex = /([^]*).*/;
	var match = host.match(regex);
	if (typeof match !== "undefined" && null !== match) host = match[1];
	if (typeof host !== "undefined" && null !== host) {
		var strAry = host.split(".");
		if (strAry.length > 1) {
			host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
		}
	}
	return '.' + host;
};

/**
 * 设置cookie
 * @param {string} c_name 设置cookie的key
 * @param {string} value 设置cookie的value
 * @param {number} expiredays 过期时间，ms
 * @return {*}
 */
const setCookie = function (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";domain=" + getDomain();
};
```

## 获取cookie
```javascript
/**
 * 设置cookie
 * @param {string} c_name 需要获取的cookie的key
 * @return {*}
 */
const getCookie = (c_name) => {
    var name = c_name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
};
```

## 深克隆对象
```javascript
/**
 * 避免内存指向的问题，深克隆对象
 * @param {*} obj  需要克隆的对象
 * @param {Array<Object>} cache 用来缓存已克隆的内容，默认为空，调用函数时不传，递归时使用
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

function deepCopy (obj, cache = []) {
  // 类型不是object直接返回原值
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // copy完成返回对象，结束递归
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  
  cache.push({
    original: obj,
    copy
  })

  // 递归操作
  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}
```
## javascript数据类型检查
```javascript
/**
 * 用来验证数据类型
 * @param {*} data 需要验证的数据
 * @return {boolean}
 */
const typesCheck = {

  isPrototype( data ) {
    return Object.prototype.toString.call(data).toLowerCase()
  },

  isArray( data ) {
    return this.isPrototype( data ) === '[object array]'
  },

  isJSON( data ) {
    return this.isPrototype( data ) === '[object object]'
  },

  isFunction( data ) {
    return this.isPrototype( data ) === '[object function]'
  },

  isString( data ) {
    return this.isPrototype( data ) === '[object string]'
  },

  isNumber( data ) {
    return this.isPrototype( data ) === '[object number]'
  },

  isBoolean( data ) {
    return this.isPrototype( data ) === '[object boolean]'
  },

  isUndefined( data ) {
    return this.isPrototype( data ) === '[object undefined]'
  },

  isNull( data ) {
    return this.isPrototype( data ) === '[object null]'
  }

}
```

## canvas保存到本地
```javascript
//图片下载操作,指定图片类型
function download(canvasEle,type) {
    /*
        canvasEle: 所需要导出的canvas的dom节点；
        type: 指定图片类型
    */
    //设置保存图片的类型
    var imgdata = canvasEle.toDataURL(type);
    //将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type) {
        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    }
    imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
    //将图片保存到本地
    var saveFile = function (data, filename) {
        var link = document.createElement('a');
        link.href = data;
        link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
    }
    var filename = new Date().toLocaleDateString() + '.' + type;
    saveFile(imgdata, filename);
};
```