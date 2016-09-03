chrome.browserAction.onClicked.addListener(function(tab) {
 var url ="http://www.next.co.uk/shoppingbag";
    chrome.tabs.create({url:url,selected:true})
});

