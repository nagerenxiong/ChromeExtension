var currentUrl=window.location.href;
var index=currentUrl.indexOf("/",10);
var url=currentUrl.substring(0,index);
chrome.runtime.sendMessage({currentUrl: url});



