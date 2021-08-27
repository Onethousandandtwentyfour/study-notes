# Svg图文交互动画-1.1

**开发时如果使用的是公众号后台的图片，请使用google chrome的无痕模式开发才能正常使用图片**

[了解svg-01](https://www.zhangxinxu.com/wordpress/2017/08/svg-foreignobject/)

[了解svg-02](http://www.webfront-js.com/articaldetail/73.html)

[了解svg-03](https://www.oxxostudio.tw/articles/201409/svg-26-patterns.html)

[了解图文交互](https://juejin.cn/post/6935831676740173832)

## 前置注意点

- 微信图文内元素不能使用选择器（id,class,属性选择器等等,对svg的动画触发又极大影响），只能写行内样式（style），且一些css属性值，类如translate不能写负数（<0）;display属性也不能用

## 1.点击播放gif

**描述：通过点击，开始播放GIF**

### 1.1 实现方式一

- svg嵌套，播放的gif图透明切在最顶层；
- gif类型的图片，初始opacity为0是不播放的，当opacity为1后才会播放；（如果是只播放一次的gif，在0=>1后继续1=>0，0=>1；此时gif不会重新播放，而是会停留在最后一帧。）
- [示例](./example/1.1-点击播放gif.html)

```ejs
<!-- 外层svg -->
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
  viewBox="0 0 750 585" style="
    background-color:deepskyblue;
    pointer-events: none;
  ">
  <foreignObject x="0" y="0" width="750" height="585">
   	<!--  内层svg，用来设置gif -->
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
      viewBox="0 0 750 585"
      style="background-image:                         url(https://mmbiz.qpic.cn/mmbiz_gif/UK8IkQ76Wndj71BFj9fMqxbN7Mtf7qm6UceiaSf5jIo7gIBEOJYsOMgsI1ZuSznmgh9YFiawiaUqvJ8DMV0S2Fpsw/0?wx_fmt=gif); 
             background-size: contain;background-repeat: no-repeat; 
             background-position: center 0;
             pointer-events: painted;"
      opacity="0">
      <animate attributeType="CSS" attributeName="opacity" fill="freeze" restart="never" calcMode="linear"
        keyTimes="0;0.001;1" values="0;1;1" dur="1000s" begin="click"></animate>
    </svg>
  </foreignObject>
</svg>
```

## 2.点击图片弹出

**描述：点击对应位置，弹出图片弹窗**

### 2.1 实现方式一

- svg嵌套，弹出的图片透明且在最顶层
- [示例](./example/2.1-点击弹出图片.html)（仅在图文环境生效）

```ejs
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
  viewBox="0 0 750 320" style="
    background-image: url(https://mmbiz.qpic.cn/mmbiz_png/UK8IkQ76Wndj71BFj9fMqxbN7Mtf7qm6AJ2IQeD2XISXEYCtCYeOLTSHAsUH03ZXU8GJltV7KWbXiaJKP4Mvj3Q/0?wx_fmt=png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center 0;
  ">
  <foreignObject x="0%" y="0%" width="750" height="320">
    <img      src="https://mmbiz.qpic.cn/mmbiz_png/UK8IkQ76Wndj71BFj9fMqxbN7Mtf7qm60kKUDotl83m1nM14AGyLGSZRqIZ67NXpX5kGzCWqoYLUUZWCShzHLg/0?wx_fmt=png"
      style="width:100%;height:100%;opacity:0;" />
  </foreignObject>
</svg>
```

##  3.图片切换

**描述：图片的单次或多次点击切换（点击一次只能切换一次)**

### 3.1 实现方式一

- svg嵌套

#### 3.1.1  只切换一次

- 要显示的图片在顶层；[示例](./example/3.1.1-图片切换-top.html)

```ejs
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
  viewBox="0 0 750 320" style="
    background-image: url(https://mmbiz.qpic.cn/mmbiz_png/UK8IkQ76Wndj71BFj9fMqxbN7Mtf7qm6AJ2IQeD2XISXEYCtCYeOLTSHAsUH03ZXU8GJltV7KWbXiaJKP4Mvj3Q/0?wx_fmt=png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center 0;
  ">
  <foreignObject x="0%" y="0%" width="750" height="320">
      <!-- 要显示的图片 -->
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
      viewBox="0 0 750 320" style="
        background-image: url(https://mmbiz.qpic.cn/mmbiz_png/UK8IkQ76Wndj71BFj9fMqxbN7Mtf7qm60kKUDotl83m1nM14AGyLGSZRqIZ67NXpX5kGzCWqoYLUUZWCShzHLg/0?wx_fmt=png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center 0;
      " opacity="0">
      <animate attributeName="opacity" begin="click" dur="1000s" values="0;1;1" keyTimes="0;0.001;1" restart="never"
        fill="freeze"></animate>
  </foreignObject>
</svg>
```

- 要显示的图非顶层；[示例](./example/3.1.1-图片切换-bottom.html)

```ejs
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
  viewBox="0 0 750 320" style="
    background-image: url(https://mmbiz.qpic.cn/mmbiz_png/UK8IkQ76Wndj71BFj9fMqxbN7Mtf7qm60kKUDotl83m1nM14AGyLGSZRqIZ67NXpX5kGzCWqoYLUUZWCShzHLg/0?wx_fmt=png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center 0;
  ">
  <foreignObject x="0%" y="0%" width="750" height="320">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
      viewBox="0 0 750 320" style="
        background-image: url(https://mmbiz.qpic.cn/mmbiz_png/UK8IkQ76Wndj71BFj9fMqxbN7Mtf7qm6AJ2IQeD2XISXEYCtCYeOLTSHAsUH03ZXU8GJltV7KWbXiaJKP4Mvj3Q/0?wx_fmt=png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center 0;
      ">
      <animate attributeName="opacity" begin="click" dur="1000s" values="1;0;0" keyTimes="0;0.001;1" restart="never"
        fill="freeze"></animate>
    </svg>
  </foreignObject>
</svg>
```

#### 3.1.2 多次切换

- svg嵌套，通过set第一个子元素的height为0，使下一个元素被“推动”到可视位置，完成一次切换；
- 无动画  [示例](./example/3.1.2-图片切换-多次切换-硬切.html)

```ejs
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
  height="375" style="background:red;">
  <foreignObject x="0%" y="0%" width="100%" height="375">
    <sectino style="line-height: 0;height: 375px;overflow:hidden;pointer-events:none;"><svg version="1.1"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="375"
        style="background:orange;pointer-events: painted;display: block;">
        <set attributeType="XML" attributeName="height" from="375" to="0" begin="click+0s"></set><text x="200" y="240"
          fill="white" font-size="28" cursor="pointer">1</text>
      </svg> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        width="100%" height="375" style="background:yellow;pointer-events: painted;display: block;">
        <set attributeType="CSS" attributeName="height" to="0" begin="click+0s"></set><text x="200" y="240" fill="white"
          font-size="28" cursor="pointer">2</text>
      </svg> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        width="100%" height="375" style="background:green;pointer-events: painted;display: block;">
        <set attributeType="CSS" attributeName="height" to="0" begin="click+0s"></set><text x="200" y="240" fill="white"
          font-size="28" cursor="pointer">3</text>
      </svg> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        width="100%" height="375" style="background:blue;pointer-events: painted;display: block;">
        <set attributeType="CSS" attributeName="height" to="0" begin="click+0s"></set><text x="200" y="240" fill="white"
          font-size="28" cursor="pointer">4</text>
      </svg> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        width="100%" height="375" style="background:cyan;pointer-events: painted;display: block;">
        <set attributeType="CSS" attributeName="height" to="0" begin="click+0s"></set><text x="200" y="240" fill="white"
          font-size="28" cursor="pointer">5</text>
      </svg> <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        width="100%" height="375" style="background:purple;pointer-events: painted;display: block;"><text x="20" y="240"
          fill="white" font-size="28" cursor="pointer">6;最后一个了</text></svg></sectino>
  </foreignObject>
</svg>
```

- 渐隐渐现 [示例](./example/3.1.2-图片切换-多次切换-渐隐渐显.html)

```ejs
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
  height="375" style="background:red;pointer-events: none;">
  <animate attributeType="CSS" attributeName="opacity" dur="2000s" keyTimes="0;0.001;0.002;1" values="1;0;1;1"
    calcMode="linear" restart="always" fill="freeze" begin="click+0s"></animate>
  <foreignObject x="0%" y="0%" width="100%" height="375">
    <section style="line-height: 0;height: 375px;overflow:hidden;pointer-events:none;">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
        height="375" style="background:orange;pointer-events: painted;display: block;">
        <set attributeType="CSS" attributeName="pointer-events" from="painted" to="none" begin="click+1s"></set>
        <set attributeType="CSS" attributeName="height" from="375" to="0" begin="click+2s"></set>
        <text x="200" y="240" fill="white" font-size="28" cursor="pointer">1</text>
      </svg>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
        height="375" style="background:yellow;pointer-events: painted;display: block;">
        <set attributeType="CSS" attributeName="pointer-events" from="painted" to="none" begin="click+1s"></set>
        <set attributeType="CSS" attributeName="height" from="375" to="0" begin="click+2s"></set>
        <text x="200" y="240" fill="white" font-size="28" cursor="pointer">2</text>
      </svg>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
        height="375" style="background:green;pointer-events: painted;display: block;">
        <set attributeType="CSS" attributeName="pointer-events" from="painted" to="none" begin="click+1s"></set>
        <set attributeType="CSS" attributeName="height" from="375" to="0" begin="click+2s"></set>
        <text x="200" y="240" fill="white" font-size="28" cursor="pointer">3</text>
      </svg>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
        height="375" style="background:blue;pointer-events: painted;display: block;">
        <set attributeType="CSS" attributeName="pointer-events" from="painted" to="none" begin="click+1s"></set>
        <set attributeType="CSS" attributeName="height" from="375" to="0" begin="click+2s"></set>
        <text x="200" y="240" fill="white" font-size="28" cursor="pointer">4</text>
      </svg>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
        height="375" style="background:cyan;pointer-events: painted;display: block;">
        <set attributeType="CSS" attributeName="pointer-events" from="painted" to="none" begin="click+1s"></set>
        <set attributeType="CSS" attributeName="height" from="375" to="0" begin="click+2s"></set>
        <text x="200" y="240" fill="white" font-size="28" cursor="pointer">5</text>
      </svg>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
        height="375" style="background:purple;pointer-events: none;display: block;">
        <text x="200" y="240" fill="white" font-size="28" cursor="pointer">6;最后一张了</text>
      </svg>
    </section>
  </foreignObject>
</svg>
```

## 4. 长按

**描述：长按触发图片切换**

### 4.1 实现方式一

- touchstart,touchend
- [示例](./example/4.1-长按切换图片.html)

```ejs
<section style="line-height: 0;height: 0;">
  <section style="
    background-size:contain;
    background-repeat:no-repeat;
    background-image:url(https://mmbiz.qpic.cn/mmbiz_jpg/bkhDiciajVtd30niczOYCaCFkA1soGqxNibqdic5h1hOC9GVfT8B47kclKl7ibtDNK1CzWeYvOQtTdMKQcswzpibozzJg/0?wx_fmt=jpeg);
    height:0;
    padding-top:178%;">
  </section>
</section>
<svg version="1.1" id="图层_3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
  y="0px" viewBox="0 0 1080 1920" enable-background="new 0 0 1080 1920" xml:space="preserve" width=‘100%>
  <g>
    <animate attributename="opacity" begin="touchstart" dur="3s" values="1;1;0" keytimes="0;.3;1" end="touchend"
      fill="freeze"></animate>
    <rect x="0" y="0" fill="#FFFFFF" stroke="#FFFFFF" stroke-miterlimit="10" width="1080" height="1920"></rect>
    <text transform="matrix(1 0 0 1 244.7744 766.1875)" font-family="'AdobeSongStd-Light-GBpc-EUC-H'"
      font-size="60px">长按收获一个小可爱！</text>
  </g>
```

## 5.图文拉长

**描述：点击触发图文拉长**

### 5.1 实现方式一

- animate  height

#### 5.1.1 单次点击

- [示例](./example/5.1-点击图文增长.html)

```ejs
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
  width="100%" height="375" style="background:red;">
  <animate attributeType="CSS" attributeName="height" to="1000" dur="3s" begin="click+0s" restart="never" fill="freeze">
  </animate>
</svg>
```

#### 5.1.2 多次点击

- [示例](./example/5.1.2-多次点击-增长.html)

```ejs
<section style="height:0;line-height: 0;">
  <!-- 主要内容 -->
  <section
    style="line-height: 0;height:4000px;background:linear-gradient(deepskyblue,red,orange,yellow,green,blue,cyan,purple,deeppink);">
  </section>
</section>
<section style="line-height: 0;height:4000px;"></section>
<!-- 想在距离顶部3000的地方显示，当前距离顶部4000，所以margin-top: -1*（4000 - 3000）= -1000 -->
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
  height="200" style="display: block;margin-top:-1000px;">
  <set attributeName="visibility" from="visible" to="hidden" begin="click+1s"></set>
  <animate attributeType="CSS" attributeName="height" to="1000" dur="1s" begin="click+0s" restart="never" fill="freeze">
  </animate>
  <text x="30" y="60" fill="white" font-size="28" cursor="pointer">top:3000</text>
</svg>
<!-- 想在距离顶部2000的地方显示，但是当前节点的上一个兄弟节点在距离主容器3000的位置，所以当前节点现在是在距离主容器顶部3200的位置，所以margin-top: -1*（3200 - 2000） = -1200 -->
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
  height="200" style="display: block;margin-top:-1200px;">
  <set attributeName="visibility" from="visible" to="hidden" begin="click+1s"></set>
  <animate attributeType="CSS" attributeName="height" to="1200" dur="1s" begin="click+0s" restart="never" fill="freeze">
  </animate>
  <text x="30" y="60" fill="white" font-size="28" cursor="pointer">top:2000</text>
</svg>
<!-- 想在距离顶部0的地方显示，但是当前节点的上一个兄弟节点在距离主容器2000的位置，所以当前节点现在是在距离主容器顶部2200的位置，所以margin-top: -1*（2200 - 0） = -2200 -->
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%"
  height="200" style="display: block;margin-top:-2200px;">
  <set attributeName="visibility" from="visible" to="hidden" begin="click+1s"></set>
  <animate attributeType="CSS" attributeName="height" to="2200" dur="1s" begin="click+0s" restart="never" fill="freeze">
  </animate>
  <text x="30" y="60" fill="white" font-size="28" cursor="pointer">top:0</text>
</svg>
```

## 6.  小瓶子

**描述：连续点击小瓶子，连续发生变化**，动画叠加

### 6.1 实现一

- 图片叠加  [示例](https://mp.weixin.qq.com/s/guFqQEJQa2NLXIL7ojY_-g)



## 7. 夹层滑动

**描述：在顶层遮罩上下、左右滑动配合底层背景做出效果**

## 8. 倾斜滑动

**描述：倾斜角度滑动**

## 9.遮罩视频

**描述：给视频添加遮罩或者装饰元素**

