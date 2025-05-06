const cleanCacheBtn = document.querySelector(".clean-cache");

cleanCacheBtn.onclick = function () {
  chrome.storage.sync.set(
    {
      state: 0,
    },
    () => {}
  );
};
