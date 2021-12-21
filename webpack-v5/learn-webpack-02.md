# 进阶

## 1. 提高开发效率完善团队开发规范

### 1.1 debug

#### 1.1.1 devtool => sourceMap

**常用模式**

- `eval`会将映射关系追加在每行代码段额结尾；可以通过浏览器找到代码行数
- `source-map`会生成一个.map文件用来存放映射关系；可以通过浏览器找到代码行数
- `hidden-source-map`会生成一个.map文件用来存放映射关系；不能通过浏览器找到代码行数
- `inline-source-map`在打包文件的最后追加本文件所有的映射关系；可以通过浏览器找到代码行数
- `eval-source-map`
- `cheap-source-map`
- `cheap-module-source-map`

#### 1.1.2 devServer

- `static`

- `compress`

- `port`

- `headers`

- `poxy`

  - 使用node的**http**模块编写一个简单的服务

  ```js
  const http = require('http');
  ```

- `https`
- `http2`
- 