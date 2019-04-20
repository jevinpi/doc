# 文档操作
mongodb内的文档的常用操作。

## 插入文档
MongoDB 使用 insert() 或 save() 方法向集合中插入文档，语法如下：
### 插入单条数据
```
db.COLLECTION_NAME.insert(document)
> db.test.insert({name: 'mongo'})
```
以上test是集合名称，如果该集合不存在数据库中，MongoDB会自动创建该集合并插入文档。
### 插入多条数据
```
> db.collection.insertMany([{"name": 'mongo'}, {'name': 'mysql'}])
```

## 更新文档
MongoDB 使用 update() 和 save() 方法来更新集合中的文档。二者之间存在一些区别。
### update()方法
update() 方法用于更新已存在的文档。语法格式如下：
```
db.collection.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)
```
**参数说明**
* query : update的查询条件，类似sql update查询内where后面的。
* update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
* upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
* multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
* writeConcern :可选，抛出异常的级别。
```
db.collection.update({name: 'test'}, {$set:{}})
```

### save() 方法
```
db.collection.save(
   <document>,
   {
     writeConcern: <document>
   }
)
```

## 删除文档

## 查询文档