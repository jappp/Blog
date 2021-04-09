/**
 * 类
 * TypeScript 使用三种访问修饰符 public，private，protected
 * public：属性和方法是公有的，可以在任何地方访问到
 * private：属性和方法私有，只能在声明它的类的内部访问
 * protected：属性和方法是受保护的，区别于private的是可以在子类中访问
*/

// 当构造函数修饰为 private 时，该类不允许被继承或者实例化：
class Animal {
  public name;
  private constructor(name) {
    this.name = name;
  }
}

// 当构造函数修饰为 protected 时，该类只允许被继承：
class Animal2 {
  public name;
  protected constructor(name) {
    this.name = name;
  }
}

// 抽象类 abstract 用于定义抽象类和其中的抽象方法 
// 不允许实例化
// 抽象类中的抽象方法必须被子类实现
abstract class AbstractClass {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}
