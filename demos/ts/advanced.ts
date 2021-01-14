/* 类型别名 */
// 类型别名与字符串字面量类型都是使用 type 进行定义。
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}



/* 字符串字面量类型 */
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'



/* 元组 */
// 数组中元素的数据类型都一般是相同的（any[] 类型的数组可以不同），如果存储的元素数据类型不同，则需要使用元组
let tap: [string, number];
tap[1] = 1;

// 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
tap = ['Tom', 25];
tap.push('male');
tap.push(true);



/* 枚举 */
// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。 枚举使用 enum 关键字来定义：
// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
enum Color {Red, Green, Blue = "blue".length};

// 常数枚举
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];




/* 类 */
/* 
  TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。

  public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
  private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
  protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
*/

// readonly 只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。
class Animal {
  // public readonly name;
  public constructor(public readonly name) {
    // this.name = name;
  }
}

// 抽象类 abstract 用于定义抽象类和其中的抽象方法。
// 1. 不允许被实例化
abstract class Animal2 {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

let a = new Animal2('Jack'); // 报错

// 2. 抽象类中的抽象方法必须被子类实现
abstract class Animal3 {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal3 {
  // public sayHi() {
  //   console.log(`Meow, My name is ${this.name}`);
  // }
}

let cat5 = new Cat('Tom');
