## 安装
```javascript
npm install mongoose --save
```
安装成功之后，即可通过模块进行加载

## `connect`连接数据库
```
mongoose.connect(url(s), [options], [callback])
//url(s):数据库地址,可以是多个,以`,`隔开
//options:可选,配置参数
//callback:可选,回调
mongoose.connect('mongodb://数据库地址(包括端口号)/数据库名称')
```
### 指定用户连接
```
mongoose.connect('mongodb://用户名:密码@127.0.0.1:27017/数据库名称')
```
### 连接多个数据库
如果要连接多个数据库，只需要设置多个url以,隔开，同时设置mongos为true
```
mongoose.connect('urlA,urlB,...', {
   mongos : true 
})
```
### 例子
```javascript
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/test'
const DB_OPTIONS = {
  useNewUrlParser: true
}

/**
 * 连接mongodb
 * url(s):数据库地址,可以是多个,以`,`隔开
 * options:可选,配置参数
 * callback:可选,回调
 */
mongoose.connect(DB_URL, DB_OPTIONS, function (err) {
  if (err) {
    console.log('connect error')
  } else {
    console.log('connect success')
  }
})
```

## `disconnect`断开连接
```
mongoose.connection.on('disconnected', function () {
  console.log('disconnected the db')
})

setTimeout(() => {
  mongoose.disconnect()
}, 3000)
```

## Schema
> Schema主要用于定义MongoDB中集合Collection里文档document的结构,可以理解为mongoose对表结构的定义(不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法、静态模型方法、复合索引等)，每个schema会映射到mongodb中的一个collection，schema不具备操作数据库的能力
定义Schema有以下几种字段和类型
```
String      字符串
Number      数字    
Date        日期
Buffer      二进制
Boolean     布尔值
Mixed       混合类型
ObjectId    对象ID    
Array       数组
```
通过调用mongoose.Schema的方法来使用Schema，通过new来生成Schema
```javascript
const Schema = mongoose.Schema

const Hero = new Schema({
  name: String,
  title: String,
  age: Number,
  active: Boolean
})
```
如果需要在Schema定义后添加其他字段，可以使用add()方法
```
Hero.add({ name: 'string', color: 'string', price: 'number' });
```

## Model
>  Model是由Schema编译而成的假想（fancy）构造器，具有抽象属性和行为。Model的每一个实例（instance）就是一个document，document可以保存到数据库和对数据库进行操作。简单说就是model是由schema生成的模型，可以对数据库的操作。  

Mongoose会将集合名称设置为模型名称的小写版。如果名称的最后一个字符是字母，则会变成复数；如果名称的最后一个字符是数字，则不变；如果模型名称为"MyModel"，则集合名称为"mymodels"；如果模型名称为"Model1"，则集合名称为"model1"。例如下面例子中最后的集合名称是"heros"
```
let heroModel = mongoose.model('Hero', Hero)
```

## 文档新增
文档新增共三种方法，共同点是，当集合不存在时会自动创建集合，存在则直接插入。区别是`save`需要实例化`Model`，其他的不需要实例化，crate和insertMany则是传参不同，前者多参数，回调函数参数数量与传入一致，后者数组传递。
### save
> `save([options], [options.safe], [options.validateBeforeSave], [fn])`
```
let hero = new heroModel ({
  name: 'Akali',
  title: '离群之刺',
  age: 18,
  active: true
})
hero.save()
```

### create
> `Model.create(doc(s), [callback])`
```
heroModel.create({name: 'test1'}, {name: 'test2'}, function (err, doc1,doc2))
```

### insertMany
> `Model.insertMany(doc(s), [options], [callback])`
```
heroModel.create([{name: 'test1'}, {name: 'test2'}], function (err, docs))
```
