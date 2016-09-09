document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('button1').addEventListener('click',click);
	document.getElementById('button2').addEventListener('click',click2);
});
function click(){
	url=document.getElementById('text2').value;
	text=document.getElementById('text1').value;
	email=document.getElementById('text3').value;
	start=1;
	chrome.runtime.sendMessage({cmd: "init",url:url,id:text,email:email,start:start}, function(response) {  console.log(response); });
	chrome.tabs.query({
		url: 'http://store.steampowered.com/*',
		status: 'complete'
	}, function(tabs) {
		console.log(tabs)
		chrome.tabs.reload(tabs.id);
	})
}
function click2(){
	chrome.runtime.sendMessage({cmd: "stop"}, function(response) {  console.log(response); });
}
console.log(typeof(localStorage["url"]));
if(localStorage["url"]!="undefined"){
document.getElementById('text2').value=chrome.extension.getBackgroundPage().localStorage["url"];
document.getElementById('text3').value=chrome.extension.getBackgroundPage().localStorage["email"];
document.getElementById('text1').value=chrome.extension.getBackgroundPage().localStorage["id"];
}