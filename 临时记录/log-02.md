## 1、普通函数与箭头函数

[参考1](https://juejin.cn/post/6844903805960585224)

[参考2](https://zhuanlan.zhihu.com/p/57204184)

- 普通函数this：
  1. this永远指向 调用 包含 自己（this本身） 的 函数 对应的对象。
  2. this所在的函数是A()，调用这个函数A()的对象是obj,this就是指向这个obj。
- 箭头函数this：
  1. 箭头函数体内的this对象，就是定义该函数时所在的作用域指向的对象，而不是使用时所在的作用域指向的对象;
  2. this所在的函数假设是A()，这个函数所在的作用域是{},这个作用域的对象obj，this就指向这个obj

**个人理解**

- 普通函数的this是函数的调用对象，如果一个对象内的嵌套层级比较深并且不知道顶层实例的名称，那在普通函数内是很难获取到this之上的内容的，此时可以通过在箭头函数内获取到顶层作用域的引用，即this，来获取普通函数内this之上的内容。

## 2、构造函数的new都做了些什么

[参考1](http://javascript.ruanyifeng.com/oop/basic.html#toc2)

① 创建一个空对象，作为将要返回的对象实例。

②将这个空对象的原型，指向构造函数的`prototype`属性。

③将这个空对象赋值给函数内部的`this`关键字。

④ 开始执行构造函数内部的代码。

***

`new`命令简化的内部流程，可以用下面的代码表示

```js
function _new(/* 构造函数 */ constructor, /* 构造函数参数 */ params) {
  // 将 arguments 对象转为数组
  var args = [].slice.call(arguments);
  // 取出构造函数
  var constructor = args.shift();
  // 创建一个空对象，继承构造函数的 prototype 属性
  var context = Object.create(constructor.prototype);
  // 执行构造函数
  var result = constructor.apply(context, args);
  // 如果返回结果是对象，就直接返回，否则返回 context 对象
  return (typeof result === 'object' && result != null) ? result : context;
}
// 实例
var actor = _new(Person, '张三', 28);
```

