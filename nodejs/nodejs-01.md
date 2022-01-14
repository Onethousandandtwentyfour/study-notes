# NODEJS

## 1.全局属性

- *全局对象* 
  - `global ` 
    - `process`   
    - `console`  
- *全局函数* 
  - `setTimeout ` 
  - `clearTimeout ` 
  - `setInterval`  
  - `clearInterval`  
  - `module`/`require` 
  - `setImmediate`
  - `clearImmediate`
  - `Buffer ` 用于处理二进制数据
- *全局变量* 
  - `__filename `   当前执行文件的绝对路径
  - `__dirname`  当前执行文件的绝对目录

## 2.核心模块

- **http** 提供HTTP服务器功能
- **url** 解析URL
- **fs** 与文件系统交互
- **querystring** 解析URL的查询字符串
- **child_process**  新建子进程
- **util** 提供一系列实用小工具
- **path** 处理文件路径
- **crypto** 提供加密和解密功能，基本上是对OpenSSL的包装

## 3.基础API

### 3.1 path

- **path.basename**  

  - path.win32.method
  - path.posix.method

- **path.parse**    

  - `parse.parse()` 方法用来解析文件路径，返回 对应的元信息对象

  - ```js
    path.parse('/home/user/dir/file.txt');
    //result
    { 
      root: '/',
      dir: '/home/user/dir',
      base: 'file.txt',
      ext: '.txt',
      name: 'file' 
    }
    ```

- **path.format**   

  -  `path.format()` 方法从对象返回路径字符串，是 `path.parse` 的反操作

  - ```js
    path.format({
      root: '/ignored',
      dir: '/home/user/dir',
      base: 'file.txt'
    });
    // 返回: '/home/user/dir/file.txt'
    ```

- **path.noemalize** 

  - `path.normalize()` 方法规范化给定的 path，解析 `..`  和 `.`

  - ```js
    path.normalize('/foo/bar//baz/asdf/quux/..'); // 返回：/foo/bar/baz/asdf
    ```

- **path.join** 

  - `path.join()` 使用操作系统规定的分隔符将参数中的 path 片段连接，并且规范化

  - ```js
    path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'); // 返回：/foo/bar/baz/asdf
    ```

- **path.relative(from,to)** 

  - `path.relative()` 方法根据当前工作目录返回 from 到 to 的相对路径

  - ```js
    path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb');
    // 返回: '../../impl/bbb'
    ```

- **path.resolve** 

  - `path.resolve()` 方法将路径或路径片段的序列解析为绝对路径

  - ```js
    path.resolve('/foo/bar', './baz');
    // 返回: '/foo/bar/baz'
    
    path.resolve('/foo/bar', '/tmp/file/');
    // 返回: '/tmp/file'
    
    path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
    // 如果当前工作目录是 /home/myself/node，
    // 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
    ```

- 获取基本信息

1. path.basename: 返回 path 最后一部分
2. path.delimiter: 返回操作系统路径界定符，Windows 返回 `;` POSIX 返回 `:` 
3. path.dirname: 返回文件目录名
4. path.extname: 返回路径的拓展名（jquery.min.js 拓展名是 .js）
5. path.isAbsolute 检测路径是否是绝对路径
6. path.sep: 返回路径分隔符，Windows 返回 `\` POSIX 返回 `/`

### 3.2 事件

Node.js 大部分异步操作使用事件驱动，所有可以触发事件的对象都继承了 `EventEmitter` 类

#### 3.2.1 事件订阅 

const ee = new EventEmitter();

- **on**   

  - ```js
    ee.on('foo',()=>console.log('abc'));
    ```

  - EventEmitter 实例会维护一个 listener 数组，每次 listener 默认会被添加到数组尾部

  - 每次添加 listener 不会检查是否添加过，多次调用 on 传入相同的 eventName 和 listener，会导致 listener 被添加多次

- **prependListener** 

  - 通过 prependListener 可以把 listener 添加到 listener 数组头部

- **once** 

  - 如果希望 listener 被触发一次后就不再触发，可以使用 once 来绑定事件

#### 3.2.2 事件触发

- **emit**

#### 3.2.3 事件移除

- **off/removeListener/removeAllListeners** 
  - removeListener() 最多只会从监听器数组中移除一个监听器。 如果监听器被多次添加到指定 eventName 的监听器数组中，则必须多次调用 removeListener() 才能移除所有实例

### 3.3 process

#### 3.3.1 基础属性

- `title`	进程名称，默认值node，程序可以修改，可以让错误日志更清晰
- `pid`   当前进程pid
- `ppid`    当前进程的父进程的pid
- `platform`  运行进程的操作系统
- `env`   当前Shell的所有环境变量

#### 3.3.2  stdin/stdout

Nodejs和标准输入，输出设备交互对象也通过process对象提供

`stdin` 获取控制台的输入

`stdout` 输出对象

#### 3.3.3 process.execPath

process.execPath 属性返回执行当前脚本的 Node 二进制文件的绝对路径

#### 3.3.4 process.argv   

process.argv 属性返回一个数组，内容是执行脚本时的参数，但数组前两个固定

1. 执行当前脚本的 Node 二进制文件的绝对路径
2. 当前执行文件绝对路径

```js
node process.js a --b=2
/*
结果
[
  '/usr/local/bin/node',
  '/Users/undefined/node-demo/process.js',
  'a',
  '--b=2'
]
*/
```

#### 3.3.5 process.execArgv

process.execArgv 属性返回一个数组，成员是命令行下执行脚本时，在 Node 可执行文件与脚本文件之间的命令行参数

```js
node --inspect process.js
/*
结果
[ '--inspect' ]
*/
```

#### 3.3.6 常用方法

- process.chdir()：切换工作目录到指定目录
- process.cwd()：返回运行当前脚本的工作目录的路径，也就是执行 node 命令时候的目录

- process.exit()：退出当前进程
- process.memoryUsage()：返回 Node.js 进程的内存使用情况

#### 3.3.7 进程事件

**process 对象是 EventEmitter 对象实例，可以监听一些系统核心事件** 

- **exit** 当 Node.js 进程因以下原因之一即将退出时，则会触发 exit 事件：**(此时无法阻止退出事件循环，并且一旦所有 exit 事件的监听器都已完成运行时，Node.js 进程将终止)**

  - 显式调用 process.exit() 方法

  - Node.js 事件循环不再需要执行任何其他工作

  - ```js
    process.on('exit', (code) => {
      console.log(`退出码: ${code}`);
    });
    ```

- **uncaughtException**  当前进程抛出一个没有被捕捉的错误时，会触发`uncaughtException`事件

  - ```js
    process.on('uncaughtException', function (err) {
      console.error(err.stack);
    });
    ```

- **beforeExit**  当 Node.js 清空其事件循环并且没有其他工作要安排时，会触发 `beforeExit` 事件。 通常 Node.js 进程将在没有调度工作时退出，但是在 `beforeExit` 事件上注册的监听器可以进行异步调用使 Node.js 进程继续

  - ```js
    process.on('beforeExit', (code) => {
      console.log('进程 beforeExit 事件的代码: ', code);
    });
    
    process.on('exit', (code) => {
      console.log('进程 exit 事件的代码: ', code);
    });
    
    console.log('此消息最新显示');
    
    // 打印:
    // 此消息最新显示
    // 进程 beforeExit 事件的代码: 0
    // 进程 exit 事件的代码: 0
    ```

- **message** 如果使用 IPC 通道 fork Node.js 进程，子进程收到父进程使用 `childprocess.send()` 发送的消息，就会触发 `message` 事件

  - ```js
    process.on('message', (m) => {
      console.log('子进程收到消息', m);
    });
    ```

#### 3.3.8  process.nextTick(callback)

process.nextTick() 方法将 callback 添加到下一个时间点的队列执行

### 3.4 定时器

#### 3.4.1 api 

1. `setTimeout` 
2. `setInterval` 
3. `setImmediate` 
4. `process.nextTick` 

#### 3.4.2 轮询机制 

[参考1](https://juejin.cn/post/6844903657264136200) [参考1.1](https://yuqingc.github.io/posts/2020/async-events/) 

[vue的nextTick是微任务，确可以获取到最新的dom信息](https://segmentfault.com/q/1010000039973370) 

（微任务和宏任务的执行顺序没变，在微任务队列执行之前，永远不会执行下一个宏任务）

**Nodejs的事件轮询机制是`libuv`的实现；每次事件轮询分为*6*个阶段** 

- **timers 阶段**：这个阶段执行timer（`setTimeout`、`setInterval`）的回调
- **I/O callbacks 阶段**：执行一些系统调用错误，比如网络通信的错误回调
- **idle, prepare 阶段**：仅node内部使用
- **poll 阶段**：获取新的I/O事件, 适当的条件下node将阻塞在这里
- **check 阶段**：执行 `setImmediate()` 的回调
- **close callbacks 阶段**：执行 `socket` 的 `close` 事件回调

## 4.文件操作

**fs模块**  

### 4.1 API风格

#### 4.1.1 callback风格

Node.js 默认的异步操作是 callback 风格 `callback(err, returnValue)`

1. err: 如果程序处理出现异常，错误信息放在回调函数的第一个参数，如果没有错误 err 为 null

2. returnValue：程序正常处理完成后结果放在回调函数第二个参数

3. ```js
   const fs = require('fs');
   
   fs.stat('.', (err, stats) => {
     if(err) {
     	// 处理错误。
     } else {
     	 // 使用 stats
     }
   });
   ```

#### 4.1.2 promisify风格

fs.promises API 提供了一组和 callback 风格对应的方法，返回 Promise 对象而不使用回调，避免出现 callback 嵌套的回调地狱问题

- *方式一*： API 可通过 `require('fs').promises` 或 `require('fs/promises')`访问。**require('fs/promises') v14 后可用**

  - ```js
    const fs = require('fs').promises;
    // const fs = require('fs/promises');
    
    fs.stat('.').then(stats => {
      // 使用 stats
    }).catch(error => {
      // 处理错误
    });
    ```

- *方式二：* `util`模块提供了promisify方法可以把所有标准 callback 风格方法转成 promise 风格方法

  - ```js
    const util = require('util');
    const fs = require('fs');
    
    const stat = util.promisify(fs.stat);
    stat('.').then(stats => {
      // 使用 stats
    }).catch(error => {
      // 处理错误
    });
    ```

#### 4.1.3 同步方法

很多时候需要读写文件后才能进行某些操作，在没有性能问题的场景可以使用 fs 提供的同步函数来降低代码复杂度。

fs 为大部分方法提供了一个同步版本，命名规则是方法名称后面添加 `Sync` ，比如 fs.readFile 和 fs.readFileSync，stat 方法也有对应的同步版本。

```js
const fs = require('fs');
try {
	const stats = fs.statSync('.');
  // 使用 stats
} catch(error) {
	// 处理错误
}
```

### 4.2 常用API

#### 4.2.1 fs.stat

获取文件基本信息

```js
Stats {
  dev: 16777220,
  mode: 16877,
  nlink: 3,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 4301278483,
  size: 96,
  blocks: 0,
  atimeMs: 1588483554315.173,
  mtimeMs: 1588483370684.5703,
  ctimeMs: 1588483370684.5703,
  birthtimeMs: 1588483342193.8625,
  atime: 2020-05-03T05:25:54.315Z,
  mtime: 2020-05-03T05:22:50.685Z,
  ctime: 2020-05-03T05:22:50.685Z,
  birthtime: 2020-05-03T05:22:22.194Z
}
```

stats 对象还提供了几个非常有用的属性、方法获取文件的更多信息，比较常用的有

1. stats.isDirectory()：判断文件是否是个文件夹
2. stats.isFile()：判断文件是否是普通文件
3. stats.isSymbolicLink()：判断文件是否是软链接
4. stats.size：获取文件字节数

#### 4.2.2 fs.readFile

```js
fs.readFile(path[, options], callback)
```

- path:String 要读取的文件路径
- Options:String|Object    
  - String   指定字符编码
  - Object   { encoding: 'utf8', flag: 'r' }
- callback:Function  回调会传入两个参数 (err, data)，其中 data 是文件的内容

##### 4.2.2.1 fs.open、fs.read、fs.close

fs.readFile 使用相当简单，在大部分读取小文件的时候我们都应该使用这个方法，但 fs.readFile() 会把文件全部内容读取，如果想精确读取部分文件内容，Node.js 也提供了类似 C 语言 fopen、fgetc、fclose 的操作

在 Node.js 中读取一个文件同样有三步

1. fs.open()：可以打开一个文件，获取分配到的文件描述符
2. fs.read()：用于从文件描述符中读取数据
3. fs.close()：用于关闭文件描述符，大多数操作系统都会限制同时打开的文件描述符数量，因此当操作完成时关闭描述符非常重要。 如果不这样做将导致内存泄漏，最终导致应用程序崩溃

##### 4.2.2.2 fs.createReadStream

对于大文件读取一般使用流的方式，关于流的简单原理在后面章节有专门介绍，本章介绍一下使用 fs 创建可读文件流

```
fs.createReadStream(path[, options])
```

1. path
2. options（比较常用的有）
   - fd: 如果指定了 fd，则 ReadStream 会忽略 path 参数，使用指定的文件描述符（不会再次触发 open 事件）
   - autoClose: 默认值: true，文件读取完成或者出现异常时是否自动关闭文件描述符
   - start: 开始读取位置
   - end: 结束读取位置
   - highWaterMark: 默认值: 64 * 1024，普通可读流一般是 16k

 ```js
  const fs = require('fs');
  
  const rs = fs.createReadStream('./test.txt', { start: 11, end: 36 });
  
  rs.on('open', fd => {
    console.log(`文件描述符 ${fd} 已分配`);
  });
  
  rs.on('ready', () => {
    console.log('文件已准备好');
  });
  
  rs.on('data', chunk => {
    console.log('读取文件数据:', chunk.toString());
  });
  
  rs.on('end', () => {
    console.log('文件读取完成');
  });
  
  rs.on('close', () => {
    console.log('文件已关闭');
  });
  
  rs.on('error', (err) => {
    console.log('文件读取发生发生异常:', err.stack);
  });
 ```

#### 4.2.3 fs.writeFile

```
fs.writeFile(file, data[, options], callback)
```

1. file：文件名或文件描述符
2. data：常用的主要是 string 和 buffer
3. callback(err)

当 `file` 是文件名时，则异步地写入数据到文件，如果文件已存在，则**覆盖文件内容**

```js
const fs = require('fs');

const data = Buffer.from('Hello, Node.js');
fs.writeFile('./test.txt', data, err => {
  if (err) throw err;
  console.log('文件已被保存');
});
```

##### 4.2.3.1 fs.write

fs.write 有两种重载

1. fs.write(fd, buffer[, offset[, length[, position]]], callback)：参数含义和 fs.read 几乎相同
2. fs.write(fd, string[, position[, encoding]], callback)：只能把字符串内容全部写入文件

两个的区别就是使用 buffer 可以只写入 buffer 中 `offset ~ length + offset` 的内容，而使用字符串只能把字符串内容全部写入文件

```js
const fs = require('fs');

const data1 = Buffer.from('Hello, Node.js');
const data2 = 'Hello, Node.js';

const fd = fs.openSync('./test.txt', 'w');
console.log(fd)

fs.write(fd, data1, err => {
  if (err) throw err;
  console.log('data1 已被写入');
});

fs.write(fd, data2, err => {
  if (err) throw err;
  console.log('data2 已被写入');
});

setTimeout(() => {
  fs.close(fd, console.log);
}, 100);
```

##### 4.2.3.2 fs.appendFile

`fs.appendFile(path, data[, options], callback)` 将数据追加到文件尾部，如果文件不存在则创建该文件

```js
const fs = require('fs/promises');

const data1 = Buffer.from('Hello,');
const data2 = Buffer.from(' Node.js');

fs.appendFile('./test.txt', data1)
  .then(() => {
    fs.appendFile('./test.txt', data2);
    console.log('文件内容追加完成');
  });
```

##### 4.2.3.3 fs.createWriteStream

`fs.createWriteStream(path[, options]) `用来创建一个[可写的文件流](https://www.yuque.com/sunluyong/node/writable)，options 和 fs.createReadStream 几乎相同

options（比较常用的有）

- fd: 默认值 null，如果指定了 fd，则会忽略 path 参数，使用指定的文件描述符（不会再次触发 open 事件）
- mode：默认值 0o666

- autoClose: 默认值: true，当 'error' 或 'finish' 事件时，文件描述符会被自动地关闭
- start: 开始写入文件的位置，不设置默认覆盖

```js
const fs = require('fs');

fs.createReadStream('./test.txt')
  .pipe(fs.createWriteStream('./copy.txt'));
```

#### 4.2.4 fs.Dir & fs.Dirent

fs.Dir 是可迭代的目录流的类，fs.Dirent 是遍历 fs.Dir 获得的目录项，可以是文件或目录中的子目录

##### 4.2.4.1 fs.Dir

- dir.path：目录的只读路径
- dir.read()：不传入 callabck 函数则返回 Promise，读取迭代器下一个目录项，返回一个 Promise，resolve 后得到 fs.Dirent 或 null（如果没有更多的目录项要读取）

- dir.close()：不传入 callabck 函数则返回 Promise，关闭目录的底层资源句柄

##### 4.2.4.2 fs.Dirent

- dirent.name
- dirent.isDirectory()

- dirent.isFile()
- dirent.isSymbolicLink()

#### 4.2.5 待续...（监听文件变化/其他常用API）

## 5. Buffer和Stream

### 5.1 Buffer

#### 5.1.1 bit 与 Byte

1. bit 是我们常说的比特，比特币就是以此命名的，bit 是二进制的最小信息单位，1 bit 就是我们说的 1位，64 位操作系统 CPU一次能处理 ![img](https://cdn.nlark.com/yuque/__latex/5212463e37406b73b693fe832f7bc8c2.svg) 位的数据
2. Byte 被翻译为字节，是**计量**存储或者传输流量的单位，硬盘容量、网速等说的都是字节，一个英文字符是一个字节，也就是我们说的 1B，中文字符通常是两个字节（Node.js 中使用三个字节）

```Plain Text
1 byte = 8 bit
```

而 Buffer 处理的是字节![img](https://cdn.nlark.com/yuque/__latex/b0dc5e05c01fe45ec018dee390cf449c.svg) ， 从 0 开始计数，Buffer 中的 255 标识一个每位都是 1 的字节，Buffer 类的实例类似于 0 到 255 之间的整型数组。

Buffer 对象实在过于常用，被直接内置到全局变量中，使用时候无需 require 引入。

### 5.2 Stream

#### 5.2.1 fs.createReadStream  可读流(上游)

定义：*可读流是生产数据用来供程序消费的流*

#### 5.2.2 fs.createWriteStream  可写流(下游)

#### 5.2.3 双工流

## 6. Web应用

### 6.1 创建http服务器

```js
//示例
const http = require('http');
const server = http.createServer((req,res)=>{
  res.write('hello\n');
  res.end();
});
server.listen(9527,()=>{
  	console.log('服务监听9527端口');
});
```

#### 6.1.1 req

req 代表本次 http request，是一个可读流，常用有几个属性

- url：本地请求的地址
- method：HTTP 请求的方法（GET、POST、DELETE、PUT 等）

- headers:：请求的 HTTP header

#### 6.1.2 res

res 代表本次http response，是一个可写流，常用的属性方法有

- writeHead(statusCode,[, StatusMessage[, headers]])：发送响应首部，包含状态码、状态信息、响应头
- write(chunk)：向响应主体中写入字符串或者 buffer

- end(chunk)：向服务器发出信号，可以携带最后发送的数据，表明已发送所有响应头和主体，每个响应都需要调用一次

- getHeader(name)：返回指定 name 的 header
- getHeaders()：返回包含了所有 header 信息的对象

- setHeader(name, value)：设置响应头，和 writeHead() 合并，有冲突时优先使用 writeHead()
- statusCode：设置响应 HTTP status
