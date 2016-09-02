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
}
function click2(){
	chrome.runtime.sendMessage({cmd: "stop"}, function(response) {  console.log(response); });
}