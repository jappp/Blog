/**
 * 类型推论 Type Interface
 * 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型
 */
let typeInterface = 'seven';
typeInterface = 7; // error: 因为虽然没有定义类型，但是会根据定义的时候赋值推论出为 string 类型，无法重新赋值为 number 类型

// 如果定义的时候没有赋值，默认为 any 类型
let myNumber;
myNumber = 'seven';
myNumber = 7;



/**
 * 联合类型 Union Type
 * 取值可以为多种类型中的一种
*/
let unionType: string | number;

// 当不确定联合类型的变量到底是哪个类型时，只能访问此联合类型公用的属性或方法
function unionFn(something: string | number) {
  return something.length; // error: length 不是 string 和 number 的共有属性，所以会报错
}

// 联合类型变量被赋值时，会根据类型推论 Type Interface 推导出类型，此时只能访问推导出类型所拥有的属性或方法
unionType = 'seven';
console.log(unionType.length);
unionType = 7;
console.log(unionType.length); // error: 类型推论出 number，没有 length 属性所以报错