//插件被安装
chrome.runtime.onInstalled.addListener(() => {
  console.log("插件被安装");
});

//需要manifest.json.action存在 且 不设置action.default_popup
// chrome.action.onClicked.addListener(function () {
//   chrome.tabs.create({
//     url: chrome.runtime.getURL("templates/side-panel/index.html"),
//   });
// });

// chrome.action.onClicked.addListener(function (tab) {
//   chrome.sidePanel.open({
//     windowId: tab.windowId,
//   });
// });

// 添加监听器，接收来自 content.js 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "createNotification") {
    // 接收到消息后，创建通知
    chrome.notifications.create(null, {
      type: "basic",
      iconUrl: "../icons/a-hua10.png",
      title: "喝水小助手",
      message: request.data || "看到此消息的人可以和我一起来喝一杯水",
    });
  } else if (request.action === "openSide") {
    //打开侧边栏
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0) {
        const windowId = tabs[0].windowId;
        chrome.sidePanel.open({
          windowId: windowId,
        });
      }
    });
  }
});

//右键菜单
chrome.contextMenus.create(
  {
    type: "radio", // 可以是 【normal、checkbox、radio】，默认是normal
    title: "只有图片生效1",
    id: "myMenu1Id1",
    contexts: ["image"], // 只有是图片时，菜显示
  },
  function () {}
);

chrome.contextMenus.create(
  {
    type: "radio", // 可以是 【normal、checkbox、radio】，默认是normal
    title: "只有图片生效2",
    id: "myMenu1Id2",
    contexts: ["image"], // 只有是图片时，菜显示
  },
  function () {}
);

chrome.contextMenus.create({
  type: "checkbox",
  id: "baidusearch1",
  title: "使用百度搜索：%s",
  contexts: ["selection"], //选择页面上的文字
});

chrome.contextMenus.create(
  {
    type: "normal", // 可以是 【normal、checkbox、radio】，默认是normal
    title: "任何类型都生效",
    id: "myMenu222Id",
    contexts: ["all"], //所有类型都显示
  },
  function () {}
);
