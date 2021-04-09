/**
 * 枚举enum 限制取值在一定范围内
*/
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

// 1. 手动赋值
enum Days2 {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

// 2. 常数项和计算所得项
// 前面我们所举的例子都是常数项，一个典型的计算所得项的例子: 
enum Color {Red, Green, Blue = "blue".length};