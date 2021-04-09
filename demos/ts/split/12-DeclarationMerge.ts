/**
 * 声明合并
 * 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型
*/
// 1. 函数合并，之前在函数重载的时候提到过，通过重载定义多个函数类型
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

// 2. 合并的属性的类型必须是唯一的
interface Alarm {
  price: number;
}
interface Alarm {
  price: string;  // 类型不一致，会报错
  weight: number;
}

// 3. 接口中方法的合并，与函数的合并一样
interface Method {
  price: number;
  alert(s: string): string;
}
interface Method {
  weight: number;
  alert(s: string, n: number): string;
}
// 相当于：
interface Method {
  price: number;
  weight: number;
  alert(s: string): string;
  alert(s: string, n: number): string;
}