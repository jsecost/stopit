document.getElementById("addSite").addEventListener("click", function() {
  var site = document.getElementById("site").value;
  if (site) {
    chrome.runtime.sendMessage({ action: "addSite", site: site });
  }
});
