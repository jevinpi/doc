<!-- # <center>LOL数据爬虫</center> -->

## 数据格式
> 基本图片的
```javascript
  "image": {
    "full": "Aatrox.png", // 图片名称
    "group": "champion" // 图片所在的组
  }
```

## 资源地址前缀
|名称|前缀|例子|
|-|-|-|
|基础|`http://ossweb-img.qq.com/images/lol/img/`|除了皮肤其他的前缀都是这个地址+group+full|
|头像|`http://ossweb-img.qq.com/images/lol/img/champion/`|`http://ossweb-img.qq.com/images/lol/img/champion/Akali.png`|
|被动|`http://ossweb-img.qq.com/images/lol/img/passive/`|`http://ossweb-img.qq.com/images/lol/img/passive/Akali_passive.png`|
|技能|`http://ossweb-img.qq.com/images/lol/img/spell/`|`http://ossweb-img.qq.com/images/lol/img/spell/AkaliQ.png`|
|皮肤|`http://ossweb-img.qq.com/images/lol/web201310/skin/`|`http://ossweb-img.qq.com/images/lol/web201310/skin/big266000.jpg`|

