## 1.前端模块化

为什么模块很重要=》因为有了模块，我们就可以更方便地使用别人的代码，想要什么功能，就加载什么模块；但是，这样做有一个前提，那就是大家必须以同样的方式编写模块，否则你有你的写法，我有我的写法，岂不是乱了套！

[摘抄自这里](https://www.cnblogs.com/chenguangliang/p/5856701.html)

### 1.1 来由

前端项目越来越大，越来越臃肿，代码体量大了之后不好维护等。

### 1.2 解决方式

1.2.1 对项目代码文件进行分割，既将一个js分为多个js文件，按照一定的顺序进行加载；

1.2.2 JS中的模块规范（CommonJS，AMD，CMD）

1.2.3 规范的实现库：

- commonjs => commonjs => NodeJS的模块化参照的是CommonJS规范 => webpack运行在Nodejs环境，所以也使用的Commonjs规范。
  - require是同步执行的
  - commonjs不能直接运行在浏览器环境
- AMD => requirejs（预加载）
- CMD => seajs（懒加载）

## 2.webpack

竞品：parcel/glup/vite

### 2.1 安装

1.首先安装[nodejs](https://nodejs.org/zh-cn/)

2.全局安装webpack 

```shell
npm install webpack webpack-cli -g
```

本地安装（安装到项目内)

```shell
npm install webpack webpack-cli --save-dev
```

webpack 是webpack的主包

webpack-cli 可以通过命令行调用webpack的功能

-g 是--global的简写

--save安装到dependency(运行时依赖),可简写-S

--save-dev安装到d0evdependency(编译时依赖)，可简写为-D

## 3.webpack配置项

### 3.1 基础配置

命令行的方式配置不太直观，所以webpack允许我们通过创建并修改webpack.config.js文件来配置；

基础配置项:（以webpack.config.js为例）

```js
//const path = require('path');//nodejs提供的模块，用来获取项目路径、拼接路径等
module.exports = {
  entry:"",//入口
  output:{//打包后资源的存放配置信息
    filename:"",//资源名称 String|Array
    path:'',//资源存放目录，必须是绝对值(可通过nodejs的path模块获取到项目的绝对路径) String|Array
    clean:true,//每次打包时，是否清空上一次打包的资源
  },
  devtool:"",//sourcemap选项
  mode:"development"
}
```

### 3.2 Plugin(插件) 

- **扩展webpackd的功能** 

- **插件属于编译时依赖** 

- **webpack.config.js中配置的都是一个插件实例 ** 

#### 3.1 html-webpack-plugin 

```she
npm install html-webpack-plugin -D
```

自动将打包后的css/js引入到html模板内

配置：

```js
const Htmlwebpackplugin  = require('html-webpack-plugin');
module.exports = {
  plugins:[
    new Htmlwebpackplugin({
      template:"./public/index.html",//要生成的html结构参照的模板
      filename:"",//生成的html文件的名称
      inject:'body',//script资源插入的位置,默认为head
    }),
  ]
}
```

#### 3.2 webpack-dev-server

npx webpack --watch可以在修改代码后，自动触发webpack编译；但是不能及时刷新浏览器，这一点可以通过webpack-dev-server这个插件来补足；

webpack-dev-server也可以解决前端跨域问题；

```she
npm install webpack-dev-server -D
```

配置：

```js
module.exports= {
  devServer:{
    static:"./mydist",
  }
}
```

### 3.3 loader

#### 3.3.1 什么是loader

Webpack自身只能识别js和json这样的文件，对于css,png,ttf这样的文件是无法识别的，loader的作用就是将各种webpack不能识别的资源转换为webpack可以识别的资源；

#### 3.3.2 加载css

`style-loader` 把 CSS 插入到 DOM 中

`css-loader` 会对 `@import` 和 `url()` 进行处理，就像 js 解析 `import/require()` 一样

`sass-loader`  加载 Sass/SCSS 文件并将他们编译为 CSS

`less-loader`  将 Less 编译为 CSS

`stylus-loader`   将 Stylus 文件编译为 CSS

举例：

```js
module.exports={
  module:{
    rules:[
      {
        test:/\.(css|less)$/,
        use:['style-loader','css-loader','less-loader']
      }
    ]
  }
}
```

##### 3.3.3.2.1 css抽离和压缩

将html内style标签的内容转化为通过link标签导入html

- **mini-css-extract-plugin** 将style抽离到一个css文件中

  - ```js
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    module.exports={
      plugins:[
        new MiniCssExtractPlugin({
          filename:'style/main.css',
        }),
      ],
      module:{
        rules:[
          {
            test:/\.css$/,
            use:[
              MiniCssExtractPlugin.loader(),
              'css-loader'
            ]
          }
        ]
      }
    }
    ```

  - 

- **css-minimizer-webpack-plugin**  css文件压缩

  - ```js
    const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
    module.exports={
      optimization:{
       	minimizer:[
          new CssMinimizerPlugin(),
        ] 
      },
      mode:'',//选择什么环境下开启压缩
    }
    ```

#### 3.3.3 加载font

使用asset/resource进行处理

```js
module.exports={
  module:{
    rules:[
      {
        test:/\.(woff|oef|ttf)$/,
        type:"asset/resource"
      }
    ]
  }
}
```

#### 3.3.4 加载数据

##### 3.3.4.1 csv-loader/tcv-loader/xml-loader

安装csv-loader（可以处理csv和tcv），xml-loader

配置：

```js
module.exports={
  module:{
    rules:[
      {
        //解析的数据为array类型
        test:/\.(csv|tsv)$/,
      	use:['csv-loader']
      },
      {
        //解析的数据为JSON Object类型
        test:/\.xml$/,
      	use:['xml-loader']
      }
    ]
  }
}
```

##### 3.3.5 自定义JSON模块parser

yaml|toml|json5

先安装，再配置

```js
const toml = require('toml'),
      yaml = require('yaml'),
      json5 = require('json5');
module.exports={
  module:{
    rules:[
      {
        test:/\.toml$/,
        type:'json',
        parser:{
          parse:toml.parse
        }
      },
      {
        test:/\.yaml$/,
        type:'json',
        parser:{
          parse:yaml.parse
        }
      },
      {
        test:/\.json5$/,
        type:'json',
        parser:{
          parse:json5.parse
        }
      }
    ]
  }
}
```

### 3.4 资源模块

[资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader](https://webpack.docschina.org/guides/asset-modules/#resource-assets)

##### 3.4.1 webpack在处理资源时会用到的loader选项

- [`raw-loader`](https://v4.webpack.js.org/loaders/raw-loader/) 将文件导入为字符串；
- [`url-loader`](https://v4.webpack.js.org/loaders/url-loader/) 将文件作为 data URI 内联到 bundle 中；

- [`file-loader`](https://v4.webpack.js.org/loaders/file-loader/) 将文件发送到输出目录

##### 3.4.2 资源类型

- `asset/resource` => Resource资源 =》资源类型不变，将资源复制一份到执行文件夹

  - **通过使用 `file-loader` 实现** 

  - ```js
    module.export = {
      output:{
      },
      module:{
        rules:[
          {//匹配到.png类型的文件，使用file-loader来处理
            test:/\.png$/,
            type:"asset/resource"
        	}
        ]
      }
    }
    ```

- `asset/inline` => Inline资源 =》改变了资源类型，webpack默认将资源转为base64类型

  - **通过使用 `url-loader` 实现** 

  - ```js
    module.export = {
      output:{
      },
      module:{
        rules:[
          {//匹配到.svg类型的文件，使用url-loader来处理
            test:/\.svg$/,
            type:"asset/inline"
        	}
        ]
      }
    }
    ```

  - 自定义 data URI 生成器

    - ```js
      //webpack 输出的 data URI，默认是呈现为使用 Base64 算法编码的文件内容。
      //如果要使用自定义编码算法，则可以指定一个自定义函数来编码文件内容
      const svgToMiniDataURI = require('mini-svg-data-uri');
      module.exports = {
        module: {
          rules: [
            {
              test: /\.svg/,
              type: 'asset/inline',
               generator: {
                 dataUrl: content => {
                   content = content.toString();
                   return svgToMiniDataURI(content);
                 }
               }
            }
          ]
        },
      };
      //现在，所有 .svg 文件都将通过 mini-svg-data-uri 包进行编码
      ```

- `asset/source` => Source资源 => 导出资源的源代码（文本）

  - **通过使用 `raw-loader` 实现** 

  - ```js
    module.export = {
      output:{
      },
      module:{
        rules:[
          {//匹配到.abc类型的文件，raw-loader来处理 .abc为举例
            test:/\.abc$/,
            type:"asset/source"
        	}
        ]
      }
    }
    ```

  - 

- `asset` => 通用资源 => 根据资源大小自动在resource/inline之间切换

  - webpack 将按照默认条件，自动地在 `resource` 和 `inline` 之间进行选择：小于 8kb 的文件，将会视为 `inline` 模块类型，否则会被视为 `resource` 模块类型

  - 可以通过在 webpack 配置的 module rule 层级中，设置 [`Rule.parser.dataUrlCondition.maxSize`](https://webpack.docschina.org/configuration/module/#ruleparserdataurlcondition) 选项来修改此条件

  - ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.txt/,
            type: 'asset',
           	parser: {
             	dataUrlCondition: {
               	maxSize: 4 * 1024 // 4kb
             	}
           	}
          }
        ]
      },
    };
    ```

  - 

##### 3.4.3 修改打包后的资源名称和存放目录（有限制）

默认情况下，asset/resource 模块以 [hash][ext][query] 文件名发送到输出目录

```js
/*
[contenthash]|[hash]  webpack根据资源属性生成的hash码
[ext]  文件后缀
*/
//方式一：
output:{
   assetModuleFilename:  'images/[contenthash][ext]' //自定义输出文件名
}
//方式二
module:{
  rules:[
    {
      test:/\.png$/,
      
			type:"asset/resource",
      generator:{
        filename:'images/png/[contenthash][ext]'
      }
    }
  ]
}
//方式二 的优先级高于 方式一
Rule.generator.filename 与 output.assetModuleFilename 相同，并且仅适用于 asset 和 asset/resource 模块类型
```



