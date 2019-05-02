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

const HeroSchema = new Schema({
  name: String,
  title: String,
  age: Number,
  active: Boolean
})
```
如果需要在Schema定义后添加其他字段，可以使用add()方法
```
HeroSchema.add({ name: 'string', color: 'string', price: 'number' });
```

## Model
>  Model是由Schema编译而成的假想（fancy）构造器，具有抽象属性和行为。Model的每一个实例（instance）就是一个document，document可以保存到数据库和对数据库进行操作。简单说就是model是由schema生成的模型，可以对数据库的操作。  

Mongoose会将集合名称设置为模型名称的小写版。如果名称的最后一个字符是字母，则会变成复数；如果名称的最后一个字符是数字，则不变；如果模型名称为"MyModel"，则集合名称为"mymodels"；如果模型名称为"Model1"，则集合名称为"model1"。例如下面例子中最后的集合名称是"heros"
```
let heroModel = mongoose.model('Hero', HeroSchema)
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
## 文档查询
文档查询一般用的是以下三种方法和一种操作符，分别是：
### find
返回查找的全部符合数据
第一个参数是条件，第二参数是输出字段，第三个参数是配置查询参数，第四个参数是回调函数.  
> Model.find([conditions], [projection], [options], [callback])
例子:
```javascript
//搜索名字为Akali且年龄大于等于18的所有数据，输出全部
heroModel.find({name: 'Akali', age: {$gte: 18}}, function (err, docs) {} )
//只输出name和_id字段
heroModel.find({name: 'Akali', age: {$gte: 18}}, 'name', function (err, docs) {} )
//无需输出id
heroModel.find({name: 'Akali', age: {$gte: 18}}, {name: 1, _id: 0}, function (err, docs) {} )
```

### findById
根据id查询
> Model.findById(id, [projection], [options], [callback])
```
heroModel.findById('5cc7a6f615597c0ac40a549c,', function (err, docs) {} )
```
### findOne
返回查找的第一个数据，其他使用与find一样
> Model.findOne([conditions], [projection], [options], [callback])
```javascript
heroModel.findOne({name: 'Akali', age: {$gte: 18}}, function (err, docs) {} )
```

### $where
复杂查询使用`$where`操作符，可以使用javascript语句作为查询的一部分
```javascript
heroModel.findOne({$where: 'this.age1==this.age2'}, function (err, docs) {} )
```

## 文档更新
```js
update()
updateMany()
find() + save()
updateOne()
findOne() + save()
findByIdAndUpdate()
fingOneAndUpdate()
```

### update
第一个参数conditions为查询条件，第二个参数doc为需要修改的数据，第三个参数options为控制选项，第四个参数是回调函数
> Model.update(conditions, doc, [options], [callback])
`options`有以下选项
```
safe (boolean)： 默认为true。安全模式。
upsert (boolean)： 默认为false。如果不存在则创建新记录。
multi (boolean)： 默认为false。是否更新多个查询记录。
runValidators： 如果值为true，执行Validation验证。
setDefaultsOnInsert： 如果upsert选项为true，在新建时插入文档定义的默认值。
strict (boolean)： 以strict模式进行更新。
overwrite (boolean)： 默认为false。禁用update-only模式，允许覆盖记录。
```
例子：
```js
heroModel.update({name: 'Akali'}, {gae: 33}, {upsert : true}, cb)
```

### updateMany
`updateMany`与update的区别就是更新多个文档，即使设置了{multi:false}也不起作用

### find() + save()
如果更新麻烦可以通过此方法联合使用，即先通过find查找，再保存。例子：
```js
heroModel.find({age: {$lt: 20}}, function(err, docs) {
	docs.forEach(item => {
		item.age += 10
		item.save()
	})
})
```
同理，我们可以用`findOne() + save()`进行更新,也可以用扩展的`findOneAndUpdate`,`findByIdAndUpdate`进行更新

### updateOne
更新找到的第一条数据，后面数据不更新，用法与update一致

### 文档删除
文档删除有三种方式
### remove
remove有两种形式，一种是文档的remove()方法，一种是Model的remove()方法
Model的remove，是删除所有满足条件的记录:
```
model.remove(conditions, [callback])
```
如果不想写回调函数的话，可以通过exec来代替，两者至少写一种，否则删除不会成功例子
```
heroModel.remove({name: 'Akali'}).exec()
```
文档的删除，则是删除该条记录，且回调可以省略，例子
```
heroModel.find({title: '战士'}).exec(function(err, docs) {
  docs.forEach(val => {
    val.remove()
  })
})
```

### findOneAndRemove
查找符合条件的第一条记录并删除,与Model的remove一样，回调函数不可省略
```
Model.findOneAndRemove(conditions, [options], [callback])
```

### findByIdAndRemove
查找符合id的记录并删除,与Model的remove一样，回调函数不可省略
```
Model.findByIdAndRemove(conditions, [options], [callback])
```

## 前后钩子
前后钩子可以理解为
前后钩子即pre()和post()方法，又称为中间件，是在执行某些操作时可以执行的函数。中间件在schema上指定，类似于静态方法或实例方法等。可以在数据库执行下列操作时，设置前后钩子
```
validate
save
remove
count
find
findOne
findOneAndRemove
findOneAndUpdate
insertMany
update
```
### pre
pre方法是指在执行操作之前执行的方法，之前以find方法为例，添加方法
```js
HeroSchema.pre('find', function(next) {
	console.log('the first pre')
	next()
})
HeroSchema.pre('find', function(next) {
	console.log('the second pre')
	next()
})

heroModel.find(function(err, docs) {
	console.log('find finish')
})
// 调试信息顺序
// the first pre
// the second pre
// find finish
```

### post
post方法是指在执行某些操作前最后执行的方法，以find为例，添加方法
```js
HeroSchema.post('find', function() {
	console.log('the first post')
})
HeroSchema.post('find', function() {
	console.log('the second post')
})

heroModel.find(function(err, docs) {
	console.log('find finish')
})
// 调试信息顺序
// the first post
// the second post
// find finish
```

## 查询后处理

