console.log("===content.js===");
let newDiv = document.createElement("div");
let interval = 0;

newDiv.innerHTML = `<div id="wrapper">
   <div id="rain-bg" class="_rain-bg">
      <div class="_eye _l"></div>
      <div class="_eye _r"></div>
      <div class="_mouth"></div>
      <h3 class="_main-title">今天也是元气满满的一天啊<br/>喝点水吧</h3>
      <h5 id="work-time">已工作 ... 秒</h5>
   </div>
    <div class="_btn-box">
      <button id="cancel">去喝水</button>
      <button id="reject" >不喝</button>
    </div>
</div>`;
newDiv.id = "newDiv";
document.body.appendChild(newDiv);
const cancelBtn = document.querySelector("#cancel");
const rejectBtn = document.querySelector("#reject");
const workTimeDom = document.querySelector("#work-time");
const rainBg = document.querySelector("#rain-bg");

// 添加鼠标拖拽功能
let isDragging = false;
let offsetX, offsetY;

newDiv.addEventListener("mousedown", function (e) {
  isDragging = true;
  offsetX = e.clientX - newDiv.getBoundingClientRect().left;
  offsetY = e.clientY - newDiv.getBoundingClientRect().top;
});

document.addEventListener("mousemove", function (e) {
  if (isDragging) {
    newDiv.style.transform = `translate(${e.clientX - offsetX}px, ${
      e.clientY - offsetY
    }px)`;
  }
});

document.addEventListener("mouseup", function () {
  isDragging = false;
});

cancelBtn.onclick = function () {
  clearInterval(interval);
  document.body.removeChild(newDiv);
  // chrome.storage.sync.set({ state: "cancel" }, (data) => {});
  sendMessageToBackground("喝水提醒");
};

//重新分配位置
let screenWidth = document.documentElement.clientWidth || window.innerWidth;
let screenHeight = document.documentElement.clientHeight || window.innerHeight;
window.addEventListener("resize", function () {
  screenWidth = document.documentElement.clientWidth || window.innerWidth;
  screenHeight = document.documentElement.clientHeight || window.innerHeight;
});

let boxW = 0;
let boxH = 0;
rejectBtn.onclick = function () {
  if (!boxW || !boxH) {
    boxW = newDiv.offsetWidth;
    boxH = newDiv.offsetHeight;
  }

  // 添加随机位置功能
  newDiv.style.transform = `translate(${
    Math.random() * (screenWidth - boxW) + 10 + "px"
  },${Math.random() * (screenHeight - boxH) + 10 + "px"})`;
};

//更新已工作时间
interval = setInterval(() => {
  const { workTime, overTime, workStatus } = getWorkTime();
  const hours = parseInt((workTime / 60 / 60) % 24);
  const minutes = parseInt((workTime / 60) % 60);
  const seconds = parseInt(workTime % 60);

  let innerHTML = `【${workStatus}】<br/>已工作${String(hours).padStart(
    2,
    0
  )}小时${String(minutes).padStart(2, 0)}分${String(seconds).padStart(2, 0)}秒`;
  if (overTime > 0) {
    const overHours = parseInt((overTime / 60 / 60) % 24);
    const overMinutes = parseInt((overTime / 60) % 60);
    const overSeconds = parseInt(overTime % 60);
    innerHTML += `<br/>已加班${String(overHours).padStart(2, 0)}时${String(
      overMinutes
    ).padStart(2, 0)}分${String(overSeconds).padStart(2, 0)}秒`;
  }
  workTimeDom.innerHTML = innerHTML;

  // 更新rainBg的自定义CSS属性
  const randomX = Math.random() * 12 - 6; // 生成-6px到6px之间的随机值
  const randomY = Math.random() * 12 - 6; // 生成-6px到6px之间的随机值
  rainBg.style.setProperty("--eye-transform-x", `${randomX}px`);
  rainBg.style.setProperty("--eye-transform-y", `${randomY}px`);
}, 1000);

// 添加工具函数，用于向 background.js 发送消息
function sendMessageToBackground(message) {
  chrome.runtime.sendMessage({ action: "createNotification", data: message });
}

function setHours(...p) {
  const date = new Date();
  date.setHours(...p);
  return date;
}

//获取已工作时间 & 加班时间
function getWorkTime() {
  //当日已工作时间 => 单位s
  let workTime = 0;
  //当日加班时间，>18:00开始算加班时间
  let overTime = 0;
  //工作状态
  let workStatus = "";

  //获取当日9点时间戳
  const nineDateTime = setHours(9, 0, 0, 0).getTime();
  //获取当日12点时间戳
  const twelveDateTime = setHours(12, 0, 0, 0).getTime();
  //获取当日13:30点时间戳
  const thirteenDateTime = setHours(13, 30, 0, 0).getTime();
  //获取当日18点时间戳
  const eighteenDateTime = setHours(18, 0, 0, 0).getTime();

  //获取此时
  let nowDateTime = new Date().getTime();

  //如果当前时间处于每天的9点到12点，13:30到6点，则计算已工作时间，其他时间则不计入
  if (nowDateTime < nineDateTime) {
    //9点前=0
    workTime = 0;
    workStatus = "上午准备上班";
  } else if (nowDateTime > twelveDateTime && nowDateTime <= thirteenDateTime) {
    //12点到13:30 = 12 - 9;
    workTime = 3 * 60 * 60 * 1000;
    workStatus = "午休中";
  } else if (nowDateTime > eighteenDateTime) {
    //18:00 => 24:00 加班时间
    workTime = 7.5 * 60 * 60 * 1000;
    overTime = nowDateTime - eighteenDateTime;
    workStatus = "加班中";
  } else {
    //工作时间
    let noonTime = 0;
    if (nowDateTime > thirteenDateTime) {
      //当日午休12:00-13:30
      noonTime = 1.5 * 60 * 60 * 1000;
    }
    workStatus = "工作中";
    workTime = nowDateTime - nineDateTime - noonTime;
  }

  workTime = Math.floor(workTime / 1000);
  overTime = Math.floor(overTime / 1000);
  return { workTime, overTime, workStatus };
}
