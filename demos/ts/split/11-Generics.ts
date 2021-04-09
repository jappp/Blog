/**
 * 泛型 Generics
 * 指在定义函数、接口或类时，不预先指定具体的类型，而在使用的时候再指定类型的一种类型
*/
// 1. example：
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  console.log(result)
  return result;
}
createArray(3, 'x');
// 在函数名后添加<T>，T用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用


// 2. 多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

// 3. 泛型约束
// 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法
// 泛型约束就是只允许函数传入包含对应属性的变量
interface Lengthwise {
  length: number;
}

function indentity<T extends Lengthwise>(arg: T): T {
  // 约束了泛型 T 必须符合接口 Lengthwise 的形状
  return arg;
}

// 4. 泛型接口
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}
let createArray2: CreateArrayFunc<any>;
createArray2 = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
      result[i] = value;
  }
  return result;
}

// 5. 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

// 泛型的默认参数
function createArray3<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
      result[i] = value;
  }
  return result;
}