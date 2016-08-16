function getDomainFromUrl(url){
     var host = "null";
     if(typeof url == "undefined" || null == url)
          url = window.location.href;
     var regex = /.*\:\/\/([^\/]*).*/;
     var match = url.match(regex);
     if(typeof match != "undefined" && null != match)
          host = match[1];
     return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
     if(getDomainFromUrl(tab.url).toLowerCase()=="www.cnblogs.com"){
          //chrome.pageAction.show(tabId);
     }
          chrome.pageAction.show(tabId);
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);
var account_list = '';
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
  console.log(request);
  $.ajax({
    method:'get',
    url:'http://localhost/relo/',
    data: 'client_site='+request.client_site,
    success:function(data){
         account_list = data;
    }
  });

})

