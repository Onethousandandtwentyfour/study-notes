# Vue笔记

#### 1.渐进式

​	镶嵌

#### 2.特点

​	1》解耦视图和数据
​	2》可复用的组件
​	3》前端路由技术
​	4》状态管理
​	5》虚拟DOM

#### 3.安装

​	1》CDN引入

```js
//dev
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
//product
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
```

​	2》下载后引入
​	3》NPM（vue-cli）

#### 4.响应式

#### 5.MVVM

#### 6.Vue的options

​	1》el:String|HTMLElement
​	2》data:Object|Function 
​	3》methods:Object<String:Function>
​	tips:对象内的函数称之为方法

#### 7.生命周期

​	1》beforeCreated
​	2》created
​	3》beforeMounted
​	4》mounted
​	5》beforeUpdate
​	6》update
​	7》activated  （被 keep-alive 缓存的组件激活时调用）
​	8》deactivated  （被 keep-alive 缓存的组件停用时调用）
​	9》beforeDestroy
​	10》destroyed
​	11》errorCaptured

#### 8.语法

​	1》mustache语法|双大括号语法
​	2》指令
​			(1) v-once: 锁定图层
​			(2) v-html
​			(3) v-text
​			(4) v-pre  : 不解析mustache
​			(5) v-cloak: 斗篷

```js
在vue解析之前，div中有一个属性v-cloak,
在vue解析之后，div中没有v-cloak
实际编写项目时，template中生成的都是虚拟Dom，基本用不到这个指令
```


​			(6) v-bind 简写 ：	

```js
绑定class:
	对象语法=》  :class="{key:value}"
	数组语法=》  :class="['value'|value]"
绑定style:使用环境，通过外部style定制components
	对象语法=》  :style="{key:value}"
	数组语法=》	:style="[{key:value}...]"
如果class|style绑定规则比较复杂，可以使用computed|methods
```

​			(7) v-on 简写 @

```js
参数传递：$event
修饰符:click.stop   冒泡
click.prevent   默认
click.native   
keyup.enter  键别名
...
```

​			(8) v-for 

```js
for...in... 
for...of... 
for in 一般用来遍历对象的key、for of 一般用来遍历数组的value
```



​	3》computed

```
computed:{
	//计算属性一般是没有set方法，只读属性
	propertyName:{
		set:function(){
		
		},
		get:function(){
		
		},
	}
}
```

#### 9.ES6补充

```js
1.变量作用域：变量在什么范围是可用的。
es5的var只有全局作用域和函数作用域，没有块级作用域，声明的变量会被随意修改，需要通过闭包解决（闭包产生了函数作用域）
es6的let&const是有块级作用域的
常量的含义是指向的对象不能修改，但可以修改对象内部的属性
对象字面量增强写法
```

#### 10.数组中的响应式

```js
1.pop 删除数组最后一个元素 unpop  在数组最后一项之后追加元素
2.shift 删除数组第一个元素 unshift  在数组首项之前插入元素
3.splice 替换|新增|删除
4.sort 排序
5.reverse 反转
6.arr[i]=newVal 不是响应式的，Vue.$set(arr,i,newVal)解决
```

























