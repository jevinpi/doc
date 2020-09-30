## 类装饰器
### 一般类装饰器
js中可以直接这样写
```js
function Deco() {
    return function (target: any) {
        target.prototype.bol = true;
    }
}

@Deco()
class Jevin {}
```
TS会报错，需要加属性
```js
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

class DemoC {
    hello: string;
    newProperty: string;
}

@classDecorator
class Jevin extends DemoC {
    constructor() {
        super();
        console.log(111111);
    }
}
let jj = new Jevin();
```

### 重载构造函数
```js
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));


// 输出  
//class_1 {
//  property: 'property',
//  hello: 'override',
//  newProperty: 'new property' }
```
可见new时指定的值 world 被覆盖为 override，并添加了新属性 newProperty。