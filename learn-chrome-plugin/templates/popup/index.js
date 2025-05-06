const openValidatePanelBtn = document.querySelector(".open-validate-panel");
const openSettingSidePanelBtn = document.querySelector(
  ".open-setting-side-panel"
);

openValidatePanelBtn.onclick = () => {
  let screenWidth = screen.width,
    screenHeight = screen.height;
  let width = 800,
    height = 740;
  // 计算新窗口的位置
  let left = (screenWidth - width) / 2,
    top = (screenHeight - height) / 2;
  window.open(
    "../sub-pages/validate/index.html",
    "",
    `width=${width},height=${height},left=${left},top=${top}`
  );
  window.close();
};

openSettingSidePanelBtn.onclick = () => {
  chrome.runtime.sendMessage({ action: "openSide" });
  window.close();
};
