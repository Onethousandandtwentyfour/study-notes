## 1. Map

​	map是一组键值对的结构，具有极快的查找速度。

创建map实例

```js
//无参
const mapIns1 = new Map();
//有参
const mapIns2 = new Map([['key1','val1'],['key2','val2'],['key3','val3']]);
//methods
mapIns1.set('key','val');
mapIns1.get('key');
mapIns1.has('key');//boolean
mapIns1.delete('key')；//map中无值继续delete,会返回undefined
//重复给同一个key赋值，后面的val会把前一个val覆盖掉
```

## 2.Set

set是一组key的集合，不存储value，set不会重复存储同名的key，所以在set中，没有重复的key。

创建set实例

```js
//set 区分数字键和非数字键
//无参
const setIns1 = new Set();
//有参
const setIns2 = new Set(['key1','key2','key3']);
//methods
setIns1.add('key');
setIns.delete('key');
```

## 3.Object

- 静态方法
  - Object.create
  - Object.assign
  - Object.defineProperty
  - Object.keys/Object.values
  - Object.getPrototypeOf
  - Object.getOwnPropertyNames
  - Object.getOwnPropertyDescriptor
- 实例方法
  - hasOwnProperty
  - isPrototypeOf
  - toString
  - valueOf
  - toLocaleString

## 4.import.meta





































16000 -  300 = 15700

15700 * 0.7  =  10990   &*0.8 = 8792    -  2000  =  6792 *16/23  = 4724

15700 - 10990 = 4710   &*0.8 = 3768  *16/23 =  2621

