// //1.let和const命令
// console.log('ddd')
// var a = [1,2,3];
// console.log(a)
// for (var i = 0; i < 10; i++) {
//   a[i] = function () {
//     console.log(i);
//   };
//   a[i]()
// }


// var b = function(s) {
//     console.log(s)
// }

// b(a)

// {
//   var a = 10;
//   var b = 1;
// }
// console.log(a);
// console.log(b);
 
// for (let i = 0; i < 10; i++) {
//   console.log(i);
// }

// var a = [];
// for (var i =0; i <5; i++) {
//   a[i] = function () {
//     console.log(i);
//   };
// }
// a[4]();

// var a = [];
// for (let i = 0; i < 10; i++) {
//   a[i] = function () {
//     console.log(i);
//   };
// }
// a[6]();

// for (let i = 0; i < 3; i++) {
//   let i = 'abc';
//   console.log(i); 
// }

// console.log(foo);
// var foo = 2;

// console.log(bar);
// let bar = 2;

// var tmp = 123;

// if(true) {
//   tmp = 'abc'; 
//   let tmp;
// }

// var tmp = 456;
// if (tmp = 456) {
//   let tmp;
//   tmp = 123;
//   console.log(tmp);
// }

// function bar(x = 2, y = x) {
//   return [x , y];
// }
// console.log(bar());

// //2.变量的解构赋值

// let [a, b, c] = [1, 2, 3];
// console.log(a, b);

// let [foo, [[bar], baz]] = [1, [[2], 3]];
// console.log(foo)
// console.log(bar)
// console.log(baz)
// let [ , , third] = [1, 2, 3];
// console.log(third)
// let [x, , y] = [1, 2 ,3];
// let [head, ...tail] = [1, 2, 3, 4];
// // console.log(tail)
// let [x, y, ...z] = ['a'];
// console.log(z)
// let [a, [b], d] = [1, [2, 3], 4];
// console.log(b)
// let [x, y = 'b'] = ['a'];
// console.log(x);
// let [x = 1] = [null];
// console.log(x);

// function f() {
//   console.log('aaa');
// }
// let [x = f()] = [1];
// console.log(x);

// let x;
// if ([1][0] === undefined) {
//   x = f();
// } else {
//   x = [1][0];
// }
// console.log(x);

// let [x = 1, y = x] = [];
// let [x = 1, y = x] = [2];
// let [x = 1, y = x] = [1, 2];
// let [x = y, y = 1] = [];

// let {foo, bar} = {foo: "aaa", bar: "bbb"};
// console.log(foo);
// console.log(bar);
// let {baz} = {foo: "aaa", bar: "bbb"};
// let obj = {first: 'hello', last: 'world'}
// let {first: f, last: l};
// f
// l
// let { foo:baz } = { foo: "aaa", bar: "bbb" };
// console.log(baz);
// console.log(foo);
// let obj = {
//   p: [
//     'Hello',
//     { y:'World' }
//   ]
// };
// let { p, p:[x, { y } ]} = obj;
// console.log(x);
// console.log(y);
// console.log(p);
// const node = {
//   loc: {
//     start: {
//       line: 1,
//       column: 5
//     }
//   }
// };
// let {loc, loc: { start }, loc: { start: {line}} } = node;
// console.log(loc);
// console.log(line);
// console.log(start);
// let obj = {};
// let arr = [];
// ({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
// console.log(obj);
// console.log(arr)
// var {x, y = 5} = {x: 1};
// console.log(y);

// var {x = 3} = {x = undefined};
// var {x = 3} = {x = null};

// let x;
// ({x} = {x: 1});

// let { log, sin, cos } = Math;

// let arr = [1, 2, 3];
// let {0 : first, [arr.length - 1] : last} = arr;
// console.log(first);
// console.log(last);

// const [a, b, c, d, e] = 'hello';
// console.log(a);

// let {length : len} = 'hellowrold'
// console.log(len);

// let {toString: s} = 123;
// s === Number.prototype.toString

// function add([x, y]){
//   return x + y;
// }
// console.log(add([1, 2]));

// var a = [[1, 2], [3, 4]].map(([a, b]) => a + b);
// console.log(a);

// function move({x = 0, y = 0} = {}) {
//   return [x, y]
// }

// var b = [1, undefined, 3].map((x = 'yes') => x);
// console.log(b);

// function example() {
//   return [1, 2, 3]
// }
// let [a, b, c] = example();
// console.log([a, b, c]);

// function example() {
//   return {
//     foo: 1,
//     bar: 2
//   };
// }
// let {foo, bar} = example();
// console.log({foo, bar});

// // function f([x, y, z]) {...};
// // f([1, 2, 3]);

// let jsonData = {
//   id: 42,
//   status: "OK",
//   data: [867, 5309]
// };

// let {id, status, data: number} = jsonData;
// console.log(id, status, number);

// const map = new Map();
// map.set('first', 'hello')
// map.set('second', 'world')

// for (let [key, value] of map) {
//   console.log(key + " is " + value);
// }

// for (let [key] of map) {
//   console.log(key)
// }

// const { SourceMapConsumer, SourceNode } = require("source-map");

// // 4.字符串的扩展

// console.log("\u0061");
// console.log("\uD842\uDFB7");
// console.log("\u20BB7")

let a = 5;
let b = 10;

// tag`Hello ${ a + b } world ${ a * b }`;
// // 等同于
// tag(['Hello', , 'world', ,], 15, 50);

// function tag(stringArr, value1, value2){
//     //...
// }
// // 等同于
// function tag(stringArr, ...valus){
//     //...
// }

// tag(['Hello', , 'world', ,], 15, 50);
// function tag(s, v1, v2) {
//   console.log(s[0]);
//   console.log(s[1]);
//   console.log(s[2]);
//   console.log(v1);
//   console.log(v2);
//   return "OK";
// }

// let total = 30;
// let msg = passthru`The total is ${total} (${total*1.05} with tax)`;

// function passthru(literals) {
//   let result = '';
//   let i = 0;

//   while (i < literals.length) {
//     result += literals[i++];
//     if (i < arguments.length) {
//       result += arguments[i];
//     }
//   }
//   return result;
// }
// console.log(msg);

// console.log`123`

// tag`First line\nSecond line`

// function tag(strings) {
//   console.log(strings.raw[0]);
// }

// console.log(String.raw`Hi\n${2+3}!`);
// console.log(String.raw`Hi\u000A`);

// console.log(String.raw({ raw: 'test' }, 0, 1, 2));
// console.log(String.raw({ raw: ['t', 'e', 's', 't']}, 0, 1, 2));

// String.raw = function(strings, ...values) {
//   let output = '';
//   let index;
//   for (index = 0; index < string.raw.length; index++) {
//     output += strings.raw[index] + values[index];
//   }
//   output += strings.raw[index]
//   return output;
// }

// 5. 正则的扩展。
// 1.RegExp 构造函数
// var regex = new RegExp('xyz', 'i');
// // 等价于
// var regex = /xyz/i;

// console.log(new RegExp(/abc/ig, 'i').flags);

// // 正则 字符串
// match(); replace(); search(); split();

// /u 修饰符。 /y 修饰符 粘连(sticky)

// /abc/ig.source  // abc  .source 返回正则表达式的正文

// /abc/ig.flags  // 'gi'  .flags  返回正则表达式的修饰符

// //s s修饰符 可以匹配任意单个字符

// 6.数值的扩展

// 1、二进制和八进制表示法
console.log(0b111110111 === 503);
console.log(0o767 === 503);
// 1.1、严格模式下
(function(){
  console.log(0o11 === 011);
})()

// 1.2、二进制或者八进制转化十进制
console.log(Number('0b111'));
console.log(Number('0o10'));
// 1.3、isFinite判断是否为数组
console.log(Number.isFinite(15));
console.log(Number.isFinite(0.8));
console.log(Number.isFinite(NaN));
console.log(Number.isFinite(Infinity));
console.log(Number.isFinite(-Infinity));
console.log(Number.isFinite('foo'));
console.log(Number.isFinite('15')); 
console.log(Number.isFinite(true));
// 1.4、isNaN检查一个值是否为NaN
console.log(Number.isNaN(NaN));
console.log(Number.isNaN(15));
console.log(Number.isNaN('15'));
console.log(Number.isNaN(true));
console.log(Number.isNaN(9/NaN));
console.log(Number.isNaN('true' / 0));
console.log(Number.isNaN('true' / 'true'));
// console.log(isfinite('5'));

// 1.5、ES6  parseInt、parseFloat取整
console.log(Number.parseInt('12.34#'));
console.log(Number.parseFloat('12.345#'));

console.log(Number.parseInt === parseInt);
console.log(Number.parseFloat === parseFloat);
// 1.6、Number.isInteger()用来判断一个数值是否为整数。
console.log(Number.isInteger(25));
console.log(Number.isInteger(20.1));
console.log(Number.isInteger(20.0));
console.log(Math.pow(2, 53));
console.log(Math.pow(2, 53) === Math.pow(2, 53) + 1);
console.log(Math.pow(2, 53) === Math.pow(2, 53) - 1);

console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1);
console.log(Number.MAX_SAFE_INTEGER === 9007199254740991);

console.log(Number.MAX_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER === -9007199254740991);
// 1.7、 Math.trunc()用于去除一个数的小数部分，返回整数部分。
console.log(Math.trunc(4.1));
console.log(Math.trunc(4.9));
console.log(Math.trunc(-4.1));
console.log(Math.trunc(-4.9));
console.log(Math.trunc(-0.1234)); 

console.log(Math.trunc('123.456'));
console.log(Math.trunc(true));
console.log(Math.trunc(false));
console.log(Math.trunc(null));
// 1.8、Math.sign方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。
console.log(Math.sign(-5));
console.log(Math.sign(5));
console.log(Math.sign(0));
console.log(Math.sign(-0));
console.log(Math.sign(NaN));


// 1.9、Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。

console.log(Number.isSafeInteger('a'));
console.log(Number.isSafeInteger(null));
console.log(Number.isSafeInteger(NaN));
console.log(Number.isSafeInteger(Infinity));
console.log(Number.isSafeInteger(-Infinity));

console.log(Number.isSafeInteger(3));
console.log(Number.isSafeInteger(1.2));
console.log(Number.isSafeInteger(9007199254740990));
console.log(Number.isSafeInteger(9007199254740992));

console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1));
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1));
// 2.0 Math.cbrt方法用来计算一个数的立方根
console.log(Math.cbrt(-1));
console.log(Math.cbrt(0));
console.log(Math.cbrt(1));
console.log(Math.cbrt(2));

console.log(Math.cbrt(8));
console.log(Math.cbrt(NaN));

// 2.1 Math.clz32()
console.log(Math.clz32(0));
console.log(Math.clz32(1));
console.log(Math.clz32(1000));
console.log(Math.clz32(0b01000000000000000000000000000000));
console.log(Math.clz32(0b00100000000000000000000000000000));
console.log(Math.clz32(0));
console.log(Math.clz32(1));
console.log(Math.clz32(1 << 1));
console.log(Math.clz32(1 << 2));
console.log(Math.clz32(1 << 29));

console.log(Math.clz32());
console.log(Math.clz32(NaN));
console.log(Math.clz32(Infinity));
console.log(Math.clz32(null));
console.log(Math.clz32('foo'));
console.log(Math.clz32([]));
console.log(Math.clz32({}));
console.log(Math.clz32(true));

// 2.2 Math.imul()
//返回两个数以 32 位带符号整数形式相乘的结果，返回的也是一个 32 位的带符号整数。
console.log(Math.imul(2, 4));
console.log(Math.imul(-1, 8));
console.log(Math.imul(-2, -2));

// 2.3 Math.fround方法返回一个数的32位单精度浮点数形式。
console.log(Math.fround(0));
console.log(Math.fround(1));
console.log(Math.fround(2 ** 24 - 1));
//如果参数的绝对值大于 224，返回的结果便开始丢失精度。

console.log(Math.fround(2 ** 24));
console.log(Math.fround(2 ** 24 + 1));
//Math.fround方法的主要作用，是将64位双精度浮点数转为32位单精度浮点数。如果小数的精度超过24个二进制位，返回值就会不同于原值，否则返回值不变（即与64位双精度值一致）。

// 未丢失有效精度
console.log(Math.fround(1.125));
console.log(Math.fround(7.25));

// 丢失精度
console.log(Math.fround(0.3));
console.log(Math.fround(0.7));
console.log(Math.fround(1.0000000123));
//对于 NaN 和 Infinity，此方法返回原值。对于其它类型的非数值，Math.fround 方法会先将其转为数值，再返回单精度浮点数。

console.log(Math.fround(NaN));
console.log(Math.fround(Infinity));

console.log(Math.fround('5'));
console.log(Math.fround(true));
console.log(Math.fround(null));
console.log(Math.fround([]));
console.log(Math.fround({}));

// 2.4 Math.hypot方法返回所有参数的平方和的平方根。

console.log(Math.hypot(3, 4));
console.log(Math.hypot(3, 4, 5));
console.log(Math.hypot());
console.log(Math.hypot(NaN));
console.log(Math.hypot(3, 4, 'foo'));
console.log(Math.hypot(3, 4, '5'));
console.log(Math.hypot(-3));

//Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。

console.log(Math.expm1(-1));
console.log(Math.expm1(0));
console.log(Math.expm1(1));

// 7 函数的扩展
function log(x, y) {
  y = y || 'world'
  console.log(x, y)
}
log('hello')
log('hello', 'China')

function log(x, y = 'world') {
  console.log(x, y);
}
log('Hello')
log('hello', 'china')

function point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
const p = new point();
console.log(p);

let x = 99;
function foo(p = x + 1) {
  console.log(p);
}
console.log(foo());