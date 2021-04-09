/**
 * 数组的类型
*/
// 1. 最简单的方法是使用「类型 + 方括号」来表示数组
let fibonacci: number[] = [1, 1, 2, 3, 5];

// 2. 数组泛型
let arrayGeneric: Array<number> = [1, 1, 2, 3, 5];

// 3. 接口表示数组
// NumArray 表示只要索引的类型是数字时，那么值的类型必须是数字。
interface NumArray {
  [index: number]: number;
}
let interfaceAyy: NumArray = [1, 1, 2, 3, 5];

// 这种方式太复杂，一般用来表示类数组
function sum() {
  // 约束当索引的类型是数字时，值可以为任意值，必须有 length 和 callee 两个属性
  interface arrayLike {
    [index: number]: any;
    length: number;
    callee: Function;
  };
  let args: arrayLike = arguments;
}

// 常用类数组都有自己的定义 如 IArguments，NodeList，HTMLCollection
function fn() {
  let args: IArguments = arguments;
}
// IArguments 是 TypeScript 内置类型，和我们上面定义的 arrayLike 一致.