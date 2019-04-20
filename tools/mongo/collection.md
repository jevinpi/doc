# collection操作

## 查询所有集合
显示当前db的所有collection
```javascript
show tables;
```

## 创建集合
```javascript
db.createCollection(COLLECTION_NAME, option)
```
|112|212|
|---|----|
|12ssad|撒按sa时|

option是以下可选参数：

|字段|类型|描述|
|----|----|----|
|capped|布尔|（可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，当达到最大值时，它会自动覆盖最早的文档。当该值为 true 时，必须指定 size 参数。|
|autoIndexId|布尔|（可选）如为 true，自动在 _id 字段创建索引。默认为 false。|
|size|数值|（可选）为固定集合指定一个最大值（以字节计）。如果 capped 为 true，也需要指定该字段。|
|max|数值|（可选）指定固定集合中包含文档的最大数量。|

在插入文档时，MongoDB 首先检查固定集合的 size 字段，然后检查 max 字段

在mongodb中，并不需要创建集合，当插入文档时，会自动创建对应的集合