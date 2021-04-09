/**
 * 类型别名 
 * 用来给一个类型起个新名字，使用 type 创建类型别名，常常用于联合类型
*/
type Name = string;
type NameFn = () => string;
type NameOrFn = Name | NameFn;
function getName(n: NameOrFn): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
} 

/**
 * 字符串字面量类型
 * 用来约束取值只能是某几个字符串中的一个
*/
type stringName = 'cat' | 'dog' | 'cow';
function handleName(name: stringName): void {

}