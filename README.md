# wechat-dev
wechat tips
## < 1 注意点
<< 在微信小程序的components中使用canvas，wx.createCanvasContext函数还需要再传入this，这在page中是默认的
<<  canvas在执行完draw方法后层级最高无法遮挡，可以将其父级设置width:0rpx;height:0rpx;overflow:hidden实现隐藏
