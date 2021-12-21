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

- `compress` Boolean 是否开启gzip压缩

- `port`  String 端口号

- `headers`  Object  请求头

- `poxy`  Object 请求代理

  - 使用node的**http**模块编写一个简单的服务

  ```js
  const http = require('http');
  ```

- `https`  Boolean | Object  
- `http2`  Boolean | Object  
- `historyApiFallback`    
- `host` 相同局域网下其他设备可以根据这里设置的ip访问本机项目
- `hot` 
- `liveReload` 

### 1.1.3 Eslint

### 1.1.4 githooks-husky

自定义git提交过程中的hooks回调

[Husky]([typicode.github.io/husky](https://typicode.github.io/husky))