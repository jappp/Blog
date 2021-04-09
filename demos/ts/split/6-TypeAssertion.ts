/**
 * 类型断言
 * 用来手动指定一个值的类型
*/
// 1. 将一个联合类型断言为其中一个类型
// 之前提过不确定联合类型变量类型时, 只能访问联合类型中共有的属性和方法
// 使用类型断言：值 as 类型，不确定类型时就访问其中一个类型特有的属性和方法
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
      return true;
  }
  return false;
}

