/**
 * 对象的类型-接口 interface
 * 约束对象的形状必须与接口一致
*/
interface Person {
  readonly id: number; // 只读属性
  name: string;
  age: number;
  color?: string; // 可选属性，该属性可以不存在
  [propName: string]: any; // 任意属性
}

let cat: Person = {
  name: '123',
  age: 22,
  anyName: 2
}

// 注意点: 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
interface Person2 {
  name: string;
  age?: number;
  [propName: string]: string;
}

let tom: Person2 = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};
// error: 上述例子中, 任意类型是 string, 但是可选属性 age 是 number 类型, number 不是 string 子类型所以报错

// 多个类型的任意属性使用联合类型
// [propName: string]: string | number;