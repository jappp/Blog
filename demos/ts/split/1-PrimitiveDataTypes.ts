let isBool: boolean = true;
let isStr: string = '1';
let isNum: number = 2;

// void 空值，常用来表示没有任何返回值的函数
function testVoid(): void {
  console.log('test void');
}
// 声明 void 类型的变量无意义, 因为只能赋值为 null 或 undefined;
let isVoid: void = undefined;

/* 与 void 的区别是, undefined 和 null 是所有类型的子类型 */
let u: undefined = undefined;
let n: null = null;

// undefined 或者 null可以分配给其它类型变量
isNum = u; 
isNum = n;

/**
 * 但是 void 类型不行
 * example: isNum = isVoid;
 * error: 不能将类型“void”分配给类型“number”
*/

// any 类型代表所有类型
// 声明一个变量为any之后，对它的任何操作，返回的内容的类型都是任意值
let anyThing: any = '1';
anyThing = 2;

// 未声明类型的变量默认为 any
let something;
something = 'seven';
something = 7;