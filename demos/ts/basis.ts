let isDone: boolean = true;
let maxNum: number = 1;
let myName: string = 'Tom';
let u: undefined = undefined;
let n: null = null;

//严格模式下会报错
// let num: number = undefined;
// let unusable: void = null;

// void空类型，可表示无返回值的函数
function alertName(): void {
  alert('My name is Tom');
}



/* 任意值类型，可重新赋值 */
// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);

// 类型推论 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型
let myNumber = 'seven'; // 等于string类型定义
myNumber = 7; // 报错



/* 联合类型 */
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

//   Property 'length' does not exist on type 'number'.
// number类型没有length属性,所以报错
function getLength(something: string | number): number {
  return something.length;
}



/* 对象的类型——接口 Interfaces */
interface Person {
  readonly id: number; // 只读属性
  name: string;
  age?: number; // 可选属性, 不允许添加未定义的属性
  [propName: string]: string | number | undefined; // 任意属性, 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
}

// 约束了 tom 的形状必须和接口 Person 一致
// 定义的变量比接口增加或减少了属性是不允许的：
let tom: Person = {
  id: 15,
  name: 'Tom',
  age: 25
};  



/* 数组类型 */
// 1. 「类型 + 方括号」
let fibonacci: number[] = [1, 1, 2, 3, 5];

// 2. 数组泛型
let fibonacci2: Array<number> = [1, 1, 2, 3, 5];

// 3. 接口
interface NumberArray {
  [index: number]: number;
}
let fibonacci3: NumberArray = [1, 1, 2, 3, 5];

// 类数组
// 常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
function sum() {
  let args: {
      [index: number]: number;
      length: number;
      callee: Function;
  } = arguments;
}



/* 函数类型 */
function sum0(x: number, y: number): number {
  return x + y;
}

// 接口用于函数
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}

// 可选参数, 与接口中的可选属性类似
// 可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
      return firstName + ' ' + lastName;
  } else {
      return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tom2 = buildName('Tom');

// 参数默认值
// 在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数：
// 此时就不受「可选参数必须接在必需参数后面」的限制了
function buildName2(firstName: string = 'Tom', lastName: string) {
  return firstName + ' ' + lastName;
}
let tomcat2 = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');

// 剩余参数
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
      array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);

// 重载
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}



/* 类型断言 */
// 用途: 1.将一个联合类型断言为其中一个类型
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
// 2. 将一个父类断言为更加具体的子类
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
      return true;
  }
  return false;
}

// 3. 将任何一个类型断言为 any
(window as any).foo = 1;

// 4. 将 any 断言为一个具体的类型
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom3 = getCacheData('tom') as Cat;
tom3.run();



/* 声明文件 */
/* 
  declare var 声明全局变量
  declare function 声明全局方法
  declare class 声明全局类
  declare enum 声明全局枚举类型
  declare namespace 声明（含有子属性的）全局对象
  interface 和 type 声明全局类型
  export 导出变量
  export namespace 导出（含有子属性的）对象
  export default ES6 默认导出
  export = commonjs 导出模块
  export as namespace UMD 库声明全局变量
  declare global 扩展全局变量
  declare module 扩展模块
  /// <reference /> 三斜线指令
*/



/* 内置对象 */
// ECMAScript 标准提供的内置对象有： Boolean、Error、Date、RegExp 等
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
// DOM 和 BOM 提供的内置对象有：Document、HTMLElement、Event、NodeList 等
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});