## redux来源
redux是集成了flux和elm的设计思想而来，做为状态管理工具，将模型的操作逻辑在特定的层处理（reducer）。

## action
Action 是把数据从应用传到 store 的有效载荷。它是 store 数据的唯一来源。一般我们会约定Action内有一个type字段。
例如常见的todo里面
```javascript
{
  type: 'ADD_TODO',
  text: 'add a new todo'
}
```

## reducer


## store