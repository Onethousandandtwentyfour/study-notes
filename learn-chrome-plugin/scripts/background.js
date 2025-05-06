//插件被安装
chrome.runtime.onInstalled.addListener(() => {
  console.log("插件被安装");
  setInterval(intervalTask, 1 * 60 * 1000);
});

//检测喝水助手是否正常工作
async function intervalTask() {
  const lastCancelDateTime = await new Promise((resolve) => {
    chrome.storage.sync.get("state", (result) => {
      const t = parseInt(result.state);
      resolve(isNaN(t) ? 0 : t);
    });
  });

  //10分钟内不显示
  if (lastCancelDateTime && Date.now() - lastCancelDateTime <= 10 * 60 * 1000)
    return console.log("10分钟内不展示");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      // 检查当前标签页的 URL 是否为 chrome:// 开头
      if (tabs[0].url && tabs[0].url.startsWith("chrome://")) {
        console.log("无法在 chrome:// 页面上注入内容脚本");
        return;
      }

      function registerHandler() {
        if (chrome.scripting) {
          chrome.scripting
            .executeScript({
              target: { tabId: tabId },
              function: () => {
                return true;
              },
            })
            .then(() => {
              chrome.tabs.sendMessage(tabId, {
                action: "content-launch",
                data: "",
              });
            })
            .catch((error) => {
              console.error("Content script 未加载:", error);
            });
        } else {
          chrome.tabs.executeScript(tabId, { code: "true" }, () => {
            if (chrome.runtime.lastError) {
              console.error("Content script 未加载:", chrome.runtime.lastError);
            } else {
              chrome.tabs.sendMessage(tabId, { action: "launch", data: "" });
            }
          });
        }
      }

      // 检查是否有权限访问当前标签页的 URL
      chrome.permissions.contains(
        {
          origins: [tabs[0].url],
        },
        function (result) {
          if (result) {
            // 如果有权限，继续执行脚本注入
            registerHandler();
          } else {
            // 如果没有权限，请求权限
            chrome.permissions.request(
              {
                origins: [tabs[0].url],
              },
              function (granted) {
                if (granted) {
                  console.log("权限已授予，重新尝试注入内容脚本");
                  // 重新尝试注入内容脚本
                  registerHandler();
                } else {
                  console.error("权限被拒绝，无法注入内容脚本");
                }
              }
            );
          }
        }
      );
    }
  });
}

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
  } else if (request.action === "tab-created") {
    //页面被加载 、 刷新
    intervalTask();
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
    contexts: ["image"], // 只有是图片时，才显示
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
