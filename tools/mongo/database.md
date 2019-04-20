# 创建数据库

## 语法
MongoDB创建数据库的语法格式如下：
```
use DATABASE_NAME
```
如果数据库不存在，则创建数据库，否则切换到指定数据库。

## 查看数据库列表
```
show dbs
```

## 注意
刚刚我们通过`use`创建的数据库直接通过`show`方法查看是没有的，通过向该数据库插入数据则可以显示，例如：
```
> use test
switched to db test
> show dbs
admin   0.000GB
local   0.000GB
> db.runoob.insert({"name":"jevin"})
WriteResult({ "nInserted" : 1 })
> show dbs
local   0.078GB
runoob  0.078GB
test    0.078GB
````