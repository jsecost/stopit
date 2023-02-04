var toggle = true;
var blockedSites = ["youtube.com"];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the URL of the current tab matches any of the URLs in the list
  if (changeInfo.status === "complete") {
    for (let i = 0; i < blockedSites.length; i++) {
      if (tab.url.includes(blockedSites[i])) {
        // If a match is found, do something (e.g. send a message to the content script)
        if (tab.url.indexOf(blockedSites[i]) > -1) {
          chrome.tabs.create({ url: "stopit.html" });
          break;
        }
      }
    }
  }
});





chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "addSite") {
      blockedSites.push(request.site);
      chrome.storage.local.set({ "blockedSites": blockedSites }, function() {
        console.log("Blocked sites updated:", blockedSites);
      });
    }
  }
);
