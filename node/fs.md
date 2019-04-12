```javascript

```
## 模块引入
```javascript
cosnt fs = require('fs')
```
所有的方法都存在同步和异步两个操作，异步的形式总是将完成回调作为其最后一个参数。 传给完成回调的参数取决于具体方法，但第一个参数始终预留用于异常。 如果操作成功完成，则第一个参数将为 null 或 undefined

## 删除文件
```javascript
// 异步
fs.unlink(filename, callback)
// 同步
fs.unlinkSync(filename, callback)
```

## 重命名
```javascript
// 异步
fs.rename(oldname, newname, callback)
// 同步
fs.renameSync(oldname, newname, callback)
```

## 查找文件夹
`fs.exist()`目前不推荐使用，推荐使用以下方法：
```javascript
fs.access(dir, function (err) {
  if (err) {
    // 不存在该文件夹，重新创建
    fs.mkdirSync(dir)
  }
})
```

