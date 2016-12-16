var flag = false;
var post1;

chrome.extension.onConnect.addListener(function(port) {
	post1=port;
	port.postMessage({flag:flag});
});
chrome.contextMenus.create({
		title: "关闭",
		onclick: function(g,g1) {
			console.log(g)
			console.log(g1)
			if (flag){
				flag = false;
				chrome.contextMenus.update(g.menuItemId,{title:"关闭"})
			}
			else{
				flag = true;
				chrome.contextMenus.update(g.menuItemId,{title:"启用"})
			}
			post1.postMessage({flag:flag});
		}
	})