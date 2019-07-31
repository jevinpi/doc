## 在泛型里使用类类型
在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型
```typescript
function create<T>(c: {new (): T; }): T {
    return new c();
}
```
一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。
```typescript
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
```
`createInstance`函数`return new c();`这句话是类的实例化，意思是该函数的返回是个实例，而传进来的参数c是个类，而不是类的实例，故要使用`(c: new () => A)`标明c是个类，而不是(c: Animal)类的实例，从下面的调用也可以看出传递的是类而不是实例。我们知道js里面是没有类的，ES6里面的class也只是个语法糖，编译后依然为一个function。所以去修饰一个class也就是修饰一个function，但是修饰的是构造函数，所以这边加以区别，前面有个`new`。

简而言之，保持泛型的原则，传入值和传出值得类型保持一致。

## 类静态部分和实例部分
```typescript
/**
 实例接口
 */
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick:()=>void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {//这个和泛型中使用类类型相同，
    return new ctor(hour, minute);//需要类型为ClockInterface的两个参数的构造器类，只是二者写法有点区别
}

class DigitalClock implements ClockInterface {//这边实现的接口不能是直接的构造器
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```