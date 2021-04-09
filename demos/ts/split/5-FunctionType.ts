/**
 * 函数类型
*/

// 1. 函数声明
function firstFn(x: string, y: number): number {
  return y;
}

// 2. 函数表达式
let myFn = function(x: number, y: number): number {
  return x + y;
}
// TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
// 例如: let mySum: (x: number, y: number) => number

// 3. 接口定义函数
interface interFn {
  (x: number, y: number): number;
}
let myFn2: interFn;
myFn2 = function(x: number, y: number) {
  return x + y;
}

// 4. 可选参数，类似于接口中的可选属性，使用 ? 表示可选参数
// 注意点: 可选参数必须接在必需参数后面。
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
      return firstName + ' ' + lastName;
  } else {
      return firstName;
  }
}

// 5. 参数默认值
// es6 允许给函数参数设置默认值，TypeScript 会将添加了默认值的参数识别为可选参数，此时不受「可选参数必须接在必需参数后面」的限制
function buildName2(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName;
}

// 6. 重载
// 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
// example：前两次定义输入 number返回 number，输入 string 返回 string，最后一次是函数实现。
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}